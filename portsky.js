'use strict';

// derived from db-based sequencer used in adventurebot, etc.
// kept the same format, because maybe using promises is a good idea?
// or maybe it's just too complicated...

var _ = require('underscore');
_.mixin(require('underscore.deferred'));

var sequencer = function(config) {

  // keeping this around for when I think it will need to be used
  var logger = function() { //eslint-disable-line no-unused-vars
    if(!config.log) return;

    for (var i = 0; i < arguments.length; i++) {
      console.log(arguments[i]);
    }
  };

  this.next = function() {
    var dfd = _.Deferred(),
        Tagspewer = require('tagspewer').tagspewer,
        lexicon = require('./neuromancer.json'),
        spewer = new Tagspewer(lexicon),
        cleaner = require('tagspewer').cleaner,
        template = 'DT NN IN DT NN VBD DT NN IN NN , VBN TO DT JJ NN .',
        opts = { template: template, lexicon: lexicon, clean: false },
        text = spewer.spew(opts).replace(/`/g, '');

    // cleaner removes line-breaks.
    text = cleaner(text);

    logger('portsky: ', text);

    dfd.resolve(text);

    return dfd.promise();

  };

};

module.exports = sequencer;
