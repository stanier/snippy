var Twitter = require('twitter');

module.exports = {
    handle: 'twitter',
    enabled: process.env.TWITTER_ENABLED || true,
    onStartup: function() {
        global.twitter = new Twitter({
            consumer_key       : process.env.TWITTER_CONSUMER_KEY,
            consumer_secret    : process.env.TWITTER_CONSUMER_SECRET,
            access_token_key   : process.env.ACCESS_TOKEN_KEY,
            access_token_secret: process.env.ACCESS_TOKEN_SECRET
        });

        twitter.stream('statuses/filter', { follow: '2838070617' }, function(stream) {
            stream.on('data', function(tweet) {
                if (tweet.user.screen_name === 'ScreepsGame')
                    irc.say("#screeps", "New tweet from @ScreepsGame : \"" + tweet.text + "\"");
            });
            stream.on('error', function(error) {
                console.error(error);
            });
        });
    },
    commands: [
        {
            command: 'tweet',
            description: 'Shows the last tweet from @ScreepsGame',
            script: function(from, args, to, next) {
                if (!!twitter) {
                    twitter.get('statuses/user_timeline', { screen_name: 'ScreepsGame', count: 1 }, function(error, tweets) {
                        irc.say(to, '"' + tweets[0].text + '"' + ' at ' + tweets[0].created_at);
                    });
                } else {
                    irc.say(to, 'Not yet authenticated with Twitter.  Please retry shortly');
                }
            }
        }
    ]
};
