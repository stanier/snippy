/*
 *  IMPORTANT!
 *
 *  Do NOT touch the environment variables unless you are absolutely sure you
 *  know what you are doing!  Only change the variables AFTER the Or operator
 */

module.exports = {
	irc: {
		network : process.env.IRC_NETWORK  || "chat.freenode.net",
		nick    : process.env.IRC_NICK     || "",
		name    : process.env.IRC_NAME     || "",
		password: process.env.IRC_PASSWORD || "",
		rooms   : process.env.IRC_ROOMS    || "#screeps",
		trusted : process.env.IRC_TRUSTED  || "",
	},
	twitter: {
		enabled       : !!(process.env.TWITTER_ENABLED      || false ),
		consumerKey   : process.env.TWITTER_CONSUMER_KEY    || "",
		consumerSecret: process.env.TWITTER_CONSUMER_SECRET || "",
		accessToken   : process.env.TWITTER_ACCESS_TOKEN    || "",
		accessSecret  : process.env.TWITTER_ACCESS_SECRET   || "",
	},
	screeps: {
		enabled : !!(process.env.SCREEPS_ENABLED || true),
		email   : process.env.SCREEPS_EMAIL      || "",
		password: process.env.SCREEPS_PASSWORD   || ""
	}
};
