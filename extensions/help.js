module.exports = {
    handle: 'help',
    commands: [
        {
            command: 'help',
            description: 'Helps you',
            script: function(from, args, to, text) {
                var response = 'Here is a list of my installed commands:\n';

                for (var name in Bot.commands) {
                    if (Bot.commands.hasOwnProperty(name)) {
                        var command = Bot.commands[name];

                        var line = '!' + name + ' - ' + command.description + '\n';

                        response = response.concat(line);
                    }
                }

                irc.notice(from, response);
            }
        }
    ]
};
