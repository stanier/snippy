var Twitter = require('twitter');

module.exports = {
	handle: 'twitter',
	enabled: Config.twitter.enabled || true,
	onStartup: function() {
		global.twitter = new Twitter({
			consumer_key       : Config.twitter.consumerKey,
			consumer_secret    : Config.twitter.consumerSecret,
			access_token_key   : Config.twitter.accessKey,
			access_token_secret: Config.twitter.accessSecret
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
