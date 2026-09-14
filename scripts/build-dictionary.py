"""Convert the pinned FreeDict/WikDict TEI source to lazily loaded browser data.

Usage: python scripts/build-dictionary.py /path/to/freedict-eng-spa-2025.11.23.src.tar.xz
The resulting dictionary data is CC BY-SA 3.0; application code is separate.
"""
from pathlib import Path
import collections
import hashlib
import html
import json
import re
import sys
import tarfile
import unicodedata
import xml.etree.ElementTree as ET

VERSION = '2025.11.23'
CHECKSUM = '622e8fec6c4178cb4c21e4577701c5325670f825331b07a185b4c6b810603c337e80429738a97581f68f668667910e7ad36f27332eaee2828f1f906537852fe3'
SOURCE = f'https://download.freedict.org/dictionaries/eng-spa/{VERSION}/freedict-eng-spa-{VERSION}.src.tar.xz'
NS = {'t': 'http://www.tei-c.org/ns/1.0'}
ROOT = Path(__file__).resolve().parent.parent


def clean(value):
    text = ''.join(value.itertext()) if isinstance(value, ET.Element) else value or ''
    text = html.unescape(text)
    text = re.sub(r'\[\[([^\[\]]+)\]\]', lambda m: m[1].split('|')[-1], text)
    text = re.sub(r"'{2,3}", '', text)
    return unicodedata.normalize('NFC', ' '.join(text.split()))


def unique(values):
    return list(dict.fromkeys(filter(None, values)))


def write_js(path, assignment, value):
    content = json.dumps(value, ensure_ascii=False, separators=(',', ':'))
    content = content.replace('\u2028', '\\u2028').replace('\u2029', '\\u2029')
    path.write_text('// FreeDict / WikDict / Wiktionary · CC BY-SA 3.0. See dictionary-license.txt.\n' + assignment + content + ';\n', encoding='utf-8')


def main():
    archive = Path(sys.argv[1])
    if hashlib.sha512(archive.read_bytes()).hexdigest() != CHECKSUM:
        raise ValueError('The archive does not match the pinned FreeDict release.')
    with tarfile.open(archive, 'r:xz') as source:
        root = ET.parse(source.extractfile('eng-spa/eng-spa.tei')).getroot()
        license_text = source.extractfile('eng-spa/COPYING').read().decode('utf-8')
    entries = root.findall('.//t:entry', NS)
    words = collections.defaultdict(list)
    for entry in entries:
        word = clean(entry.find('t:form/t:orth', NS))
        if not word:
            continue
        senses = []
        for sense in entry.findall('t:sense', NS):
            translations = unique(clean(q) for q in sense.findall('t:cit[@type="trans"]/t:quote', NS))
            definitions = unique(clean(d) for d in sense.findall('.//t:def', NS))
            if translations:
                senses.append({'t': translations, 'd': definitions})
        if senses:
            # Common senses precede senses explicitly marked historical/obsolete.
            senses.sort(key=lambda s: all(re.search(r'^\([^)]*(?:obsolete|archaic|historical|rare)', d) for d in s['d']) if s['d'] else False)
            words[word].append({'p': entry.findtext('t:gramGrp/t:pos', '', NS),
                                'i': unique(clean(p) for p in entry.findall('t:form/t:pron', NS)), 's': senses})
    rows = []
    packs = {key: {} for key in '0123456789abcdef'}
    ids = set()
    for word in sorted(words, key=lambda s: (s.casefold(), s)):
        key = hashlib.sha256(word.encode('utf-8')).hexdigest()[:16]
        if key in ids:
            raise ValueError('Duplicate dictionary ID')
        ids.add(key)
        groups = words[word]
        translations = unique(t for g in groups for s in g['s'] for t in s['t'])
        rows.append([key, word, translations, unique(g['p'] for g in groups)])
        packs[key[0]][key] = groups
    destination = ROOT / 'dist'
    write_js(destination / 'dictionary-index.js', 'globalThis.ENGLISH_DICTIONARY_INDEX=',
             {'version': VERSION, 'sourceEntries': len(entries), 'count': len(rows), 'rows': rows})
    for key, pack in packs.items():
        write_js(destination / f'dictionary-pack-{key}.js',
                 f'(globalThis.ENGLISH_DICTIONARY_PACKS||={{}})["{key}"]=', pack)
    attribution = (f'English–Spanish dictionary data\n\nSource: FreeDict / WikDict {VERSION}\n'
                   f'Maintainer: Karl Bartel\nOriginal data: Wiktionary contributors via DBnary.\n'
                   f'https://freedict.org/\nhttps://www.wikdict.com/\nhttps://www.wiktionary.org/\n'
                   f'Source archive: {SOURCE}\nSHA-512: {CHECKSUM}\n\n'
                   'License: Creative Commons Attribution-ShareAlike 3.0 Unported\n'
                   'https://creativecommons.org/licenses/by-sa/3.0/\n\n'
                   'Adaptation for English: converted TEI XML to JSON in JavaScript files; '
                   'grouped headwords and grammatical senses, normalized whitespace and wiki markup, '
                   'reordered marked rare/historical senses, and split data into search index and chunks. '
                   'The adapted dictionary data retains CC BY-SA 3.0. '
                   'This license notice concerns the dictionary data, not the separate application code.\n\n')
    (destination / 'dictionary-license.txt').write_text(attribution + license_text, encoding='utf-8')
    print(json.dumps({'source_entries': len(entries), 'headwords': len(rows),
                      'index_bytes': (destination / 'dictionary-index.js').stat().st_size,
                      'pack_bytes': sum((destination / f'dictionary-pack-{k}.js').stat().st_size for k in packs)}))


if __name__ == '__main__':
    main()
