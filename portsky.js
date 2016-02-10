'use strict';


// derived from db-based sequencer used in adventurebot, etc.
// kept the same format, because maybe using promises is a good idea?
// or maybe it's just too complicated...

var _ = require('underscore');
_.mixin(require('underscore.deferred'));

var sequencer = function(config) {

  var logger = function(msg) {
    if(!config.log) return;

    for (var i = 0; i < arguments.length; i++) {
      console.log(arguments[i]);
    }
  };


  // TODO: if don't know if the db exists
  // try creating it, initializing the first record
  // and remembering all of this.
  this.next = function() {
    var dfd = _.Deferred(),
        p = dfd.promise(),
        Tagspewer = require('tagspewer').tagspewer,
        lexicon = require('./neuromancer.json'),
        spewer = new Tagspewer(lexicon),
        cleaner = require('tagspewer').cleaner,
        template = 'DT NN IN DT NN VBD DT NN IN NN , VBN TO DT JJ NN .',
        opts = { template: template, lexicon: lexicon, clean: false },
        text = spewer.spew(opts).replace(/`/g, '');

    // cleaner removes line-breaks.
    text = cleaner(text);

    dfd.resolve(text);

    return dfd.promise();

  };

};

module.exports = sequencer;
