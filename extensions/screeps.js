var request = require('request');

module.exports = {
    handle: 'screeps',
    enabled: process.env.SCREEPS_ENABLED,
    commands: [
        {
            command: 'room',
            description: 'Returns information about room',
            script: function(from, args, to, text) {
                var rooms = [];

                for (var i = 0; i < args.length; i++) {
                    if (/(?:w|e)\d+(?:n|s)\d+/gi.test(args[i]))
                        rooms.push(args[i].toUpperCase());
                }

                if (rooms.length > 0) {
                    request.post({
                        url: "https://screeps.com/api/game/map-stats",
                        json: true,
                        auth: {
                            user: process.env.SCREEPS_USERNAME,
                            pass: process.env.SCREEPS_PASSWORD
                        },
                        body: {
                            rooms: rooms,
                            statName: 'owner0'
                        }
                    }, function (err, httpResponse, body) {
                        if (Object.keys(body.stats).length > 0) {
                            for (var name in body.stats) {
                                if (!!body.stats[name].own) {
                                    var user = body.users[body.stats[name].own.user];

                                    irc.say(to, 'Room ' + name + ' is owned by ' + user.username +
                                    ' and is at level ' + body.stats[name].own.level +
                                    '.  Link: https://screeps.com/a/#!/room/' + name);
                                } else {
                                    irc.say(to, 'Room ' + name + ' is unowned');
                                }
                            }
                        } else {
                            irc.say(to, 'No rooms found');
                        }
                    });
                } else {
                    irc.say(to, 'Please specify at least one valid room');
                }
            }
        }
    ]
};
