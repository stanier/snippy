module.exports = {
    handle: 'say',
    commands: [
        {
            command: 'say',
            description: 'Administrator command to make the bot say things to a specified channel',
            script: function(from, args, to, text) {
                if (Bot.approved.indexOf(from) > -1) {
                    var re = /!say\s+(#+\w+)\s+(.+)/gi;

                    var result = re.exec(text);

                    irc.say(result[1], result[2]);
                }
            }
        }
    ]
};
