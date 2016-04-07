'use strict';

(function() {

  // ### Libraries
  var config = require('./config.js'),
      Twit = require('twit'),
      T = new Twit(config),
      sequencer = new (require('./portsky.js'))(config),
      _ = require('underscore');

  _.mixin(require('underscore.deferred'));


  // ### Utility Functions
  var logger = function(msg) { //eslint-disable-line no-unused-vars
    if (config.log) console.log(msg);
  };

  var tweeter = function() {

    var that = this;

    _.when(
      sequencer.next()
    ) .then(function() {

      var sentence =_.flatten(arguments);
      if (sentence[0]) sentence = sentence[0];

      logger(sentence);

      if (sentence.length === 0 || sentence.length > 140) {
        tweeter();
      } else {
        if (config.tweet_on) {
          T.post('statuses/update', { status: sentence }, function(err, reply) {
            if (err) {
              console.log('error:', err, reply);
            }
            else {
              // nothing on success unless we wanna get crazy with logging replies
              // logger(reply);
            }
          });
        }
      }

    });

  }();

}());
