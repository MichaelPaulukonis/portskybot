'use strict';

var Tagspewer = require('tagspewer'),
    lexicon = require('./neuromancer.json'),
    spewer = new Tagspewer(lexicon),
    cleaner = require('./node_modules/tagspewer/lib/cleaner');

var template = 'DT NN IN DT NN VBD DT NN IN NN , VBN TO DT JJ NN .';

var outs = [],
    maxtime = 0;

for (var i = 0; i < 10; i++) {
  var port = spewer.spew(template, undefined, false).replace(/`/g, '');
  outs.push(port);
}

var text = cleaner(outs.join('/n'));//.replace(/`/g, '');

console.log(text);

// require('fs').writeFileSync('port.sample.txt', text, 'utf8');
