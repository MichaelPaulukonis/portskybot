
var tweetbot = function() {

    // ### Libraries
    var config = require('./config.js'),
        Twit = require('twit'),
        T = new Twit(config),
        sequencer = new (require('./sequencer.js'))(config),
        _ = require('underscore');

    _.mixin(require('underscore.deferred'));


    // ### Utility Functions
    this.logger = function(msg) {
        if (config.log) console.log(msg);
    };

    this.tweeter = function() {

        var that = this;

        _.when(
            sequencer.next()
        ) .then(function() {

            var sentence =_.flatten(arguments);
            if (sentence[0]) sentence = sentence[0];

            that.logger(sentence);

            if (sentence.length === 0 || sentence.length > 140) {
                that.tweeter();
            } else {
                if (config.tweet_on) {
                    T.post('statuses/update', { status: sentence }, function(err, reply) {
	                if (err) {
	                    console.log('error:', err);
	                }
	                else {
                            // nothing on success unless we wanna get crazy with logging replies
	                }
                    });
                }
            }

        });

    };

    this.tweeter();

}();
