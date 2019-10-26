const { Command } = require('discord.js-commando');

module.exports = class HoyeahCommand extends Command {
    constructor(client) {
        super(client, {
            name:'hoyeah',
            group:'test',
            memberName:'hoyeah',
            description: 'Can I get a Hoooooooooyeaaaah?!?',
            throttling:{
                usages:3,
                duration:60,
            },
        });
    }

    run(message) {
        const voiceChannel = message.member.voiceChannel;
        if(!voiceChannel) {
            return message.say('You must be in a voice channel to get a hooooooyeaaaah!');
        }
        voiceChannel.join()
        .then(async connection=> {
            // await new Promise(res=>setTimeout(res(), 500));
            const dispatcher = connection.playFile('C:/test/hoyeah_loud.mp3');
            if(!dispatcher) {
                return message.say(`Sorry, ${message.author}, I cannot give you a hooooooyeaaah!`);
            }
            dispatcher.on('end', ()=>{
                voiceChannel.leave();
            });
        })
        .catch(error=>console.error(error));
    }
};