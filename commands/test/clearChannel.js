const { Command } = require('discord.js-commando');

module.exports = class ClearChannel extends Command {
    constructor(client) {
        super(client, {
            name:'clearchan',
            group:'test',
            memberName:'clearchan',
            description:'Clears all messages in a channel',
            // args:[{
            //     key:'channel',
            //     prompt:'Enter the name of a channel to clear',
            //     type:'string',
            // }],
        });
    }

    async run(message) {
        message.channel.bulkDelete(100);
    }
};