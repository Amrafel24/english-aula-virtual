'use strict';
// Explicit allowlist shared by Node, the Worker and the packaging step.
module.exports = [
  'index.html','styles.css','script.js','english-data.js','english-mascot.png','sw.js',
  'english-game.html','english-game.css','english-game-engine.js','english-game.js',
  'match-pairs.js','match-pairs.css','aula.js','aula.css','aula-video.js',
  'dictionary.js','dictionary.css','dictionary-index.js','dictionary-license.txt',
  'verb-tenses-data.js','verb-tenses.js','verb-tenses.css',
  'passive-voice-data.js','passive-voice.js',
  ...Array.from('0123456789abcdef', key => `dictionary-pack-${key}.js`)
];
