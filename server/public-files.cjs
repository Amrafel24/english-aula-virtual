'use strict';
// Explicit allowlist shared by Node, the Worker and the packaging step.
module.exports = [
  'index.html','styles.css','script.js','english-data.js','english-mascot.png','sw.js',
  'english-game.html','english-game.css','english-game-engine.js','english-game.js',
  'match-pairs.js','match-pairs.css','aula.js','aula.css','aula-video.js',
  'dictionary.js','dictionary.css','dictionary-index.js','dictionary-license.txt',
  'verb-tenses-data.js','verb-tenses.js','verb-tenses.css',
  'passive-voice-data.js','passive-voice.js',
  'auxiliary-verbs-data.js','auxiliary-verbs.js',
  'full-verbs-data.js','full-verbs.js',
  'state-dynamic-verbs-data.js','state-dynamic-verbs.js',
  'prepositional-phrases-data.js','prepositional-phrases.js',
  'compound-sentences-data.js','compound-sentences.js',
  'transition-words-phrases-data.js','transition-words-phrases.js',
  ...Array.from('0123456789abcdef', key => `dictionary-pack-${key}.js`)
];
