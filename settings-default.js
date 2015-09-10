module.exports = {
	ircNetwork: process.env.IRC_NETWORK || "chat.freenode.net",
	ircNick: process.env.IRC_NICK || "",
	ircName: process.env.IRC_NAME || "",
	ircPassword: process.env.IRC_PASSWORD || "",
	ircRooms: process.env.IRC_ROOMS || "#screeps",
	ircTrusted: process.env.IRC_TRUSTED || "",
	twitterEnabled: !!(process.env.TWITTER_ENABLED || false),
	twitterConsumerKey: process.env.TWITTER_CONSUMER_KEY || "",
	twitterConsumerSecret: process.env.TWITTER_CONSUMER_SECRET || "",
	twitterAccessToken: process.env.TWITTER_ACCESS_TOKEN || "",
	twitterAccessSecret: process.env.TWITTER_ACCESS_SECRET || "",
	screepsEnabled: !!(process.env.SCREEPS_ENABLED || true),
	screepsEmail: process.env.SCREEPS_EMAIL || "",
	screepsPassword: process.env.SCREEPS_PASSWORD || ""
};
