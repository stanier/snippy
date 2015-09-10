module.exports = {
    handle: 'dance',
    commands: [
        {
            command: 'dance',
            description: 'Returns cuteness',
            script: function(from, args, to, text) {
                irc.say(to, 'http://hestia.dance/');
            }
        }
    ]
};
