module.exports = {
    handle: 'ping',
    commands: [
        {
            command: 'ping',
            description: 'Pong!',
            script: function(from, args, to, text) {
                irc.say(to, 'pong!');
            }
        }
    ]
};
