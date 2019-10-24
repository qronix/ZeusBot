const { Command } = require('discord.js-commando');

module.exports = class AidsCommand extends Command {
    constructor(client) {
        super(client, {
            name:'aids',
            group:'test',
            memberName:'aids',
            description:'Zeus spreads knowledge about AIDS',
        });
    }
    run(message) {
        return message.channel.send(`${message.author}, I told you to leave those monkeys alone!`, { files:['C:/test/test.jpg'] });
        // return message.say(`${message.author}, I told you to leave those monkeys alone!`);
    }
};
