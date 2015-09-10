var fs = require('fs');

var Irc = require('irc');

global.Bot = {
    approved: process.env.IRC_TRUSTED.split(/\s/gi),
    onStartup: [],
    onConnected: [],
    onJoin: [],
    onLeave: [],
    commands: {}
};

global.irc = new Irc.Client(process.env.IRC_NETWORK, process.env.IRC_NICK, {
    userName: process.env.IRC_NAME,
    channels: process.env.IRC_ROOMS.split(/\s/gi)
});

irc.addListener('registered', function(message) {
    irc.send('/msg NickServ IDENTIFY ' + process.env.IRC_PASSWORD);

    for (var i = 0; i < Bot.onStartup.length; i++) {
        Bot.onStartup[i]();
    }
});

irc.addListener('message', function(from, to, text, message) {
    var input = parseCommand(text);

    if (!!input && !!Bot.commands[input]) {
        var args = parseInput(text);

        Bot.commands[input].script(from, args, to, text, message);
    }
});

fs.readdir('./extensions', function(err, files) {
    for (var i = 0; i < files.length; i++) {
        var extension = require('./extensions/' + files[i]);

        if (typeof extension.enabled === 'undefined' || extension.enabled) {
            if (!!extension.onStartup) Bot.onStartup.push(extension.onStartup);
            //if (!!extension.onConnected) Bot.onConnected.push(extension.onConnected);
            //if (!!extension.onJoin)      Bot.onJoin.push(extension.onJoin);
            //if (!!extension.onLeave)     Bot.onLeave.push(extension.onLeave);
            if (!!extension.onMessage) irc.addListener('message', extension.onMessage);

            if (!!extension.commands) {
                for (var j = 0; j < extension.commands.length; j++) {
                    var command = extension.commands[j];

                    Bot.commands[command.command] = {
                        description: command.description,
                        script: command.script
                    };
                }
            }
        }
    }
});

function parseInput(text) {
    var args = text.split(/\s/gi);

    args.splice(0, 1);

    return args;
}

function parseCommand(text) {
    var commandRegex = /^!(\w+)/gi;

    if ((result = commandRegex.exec(text)) !== null) return result[1];
    else return undefined;
}
