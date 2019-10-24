const { Command } = require('discord.js-commando');

module.exports = class PrayCommand extends Command {
    constructor(client) {
        super(client, {
            name:'pray',
            aliases: ['prayer'],
            group:'test',
            memberName:'pray',
            description:'Appeases the God of lightning',
        });
    }

    run(message) {
        return message.say(`${message.author}, I hear your prayer and I am pleased.`);
    }
};
