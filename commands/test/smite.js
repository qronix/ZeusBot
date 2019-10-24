const { Command } = require('discord.js-commando');
const {
        getPureTargetId,
        isOnline,
        getUserVoiceChannelId,
        isValidTarget,
        getUserChannelById,
        isExempt,
        isZeus,
} = require('../../utils/utils');

module.exports = class SmiteCommand extends Command {
    constructor(client) {
        super(client, {
            name:'smite',
            aliases:['punish'],
            group:'test',
            memberName:'smite',
            description:'Command Zeus to punish a wicked mortal',
            throttling:{
                usages:1,
                duration:100,
            },
            args:[{
                key:'target',
                prompt:'Who deserves the wrath of Zeus?',
                type:'string',
            }],
        });
    }

    run(message, { target }) {
        if(!isValidTarget(target)) {
            return message.say('Zeus blinks in confusion.');
        }
        // get raw target id
        const targetId = getPureTargetId(target);
        // is user online?
        if(!isOnline(this.client, targetId)) {
            return message.say(`Zeus cannot find ${target}`);
        }
        // is target Zeus?
        if(isZeus(target)) {
            return message.say(`${message.author}, you DARE command harm unto me?!?`);
        }
        // is user exempt?
        if(isExempt(target)) {
            return message.say(`${target}, is unphased by the power of Zeus`);
        }

        const channelID = getUserVoiceChannelId(this.client, targetId);
        if(!channelID) {
            return message.say(`${target} is currently in the ether and cannot be reached by Zeus.`);
        }
        // console.log('user channel: ', getUserVoiceChannel(this.client, targetId));
        // message.say(`${target}! BEHOLD THE POWER OF ZEUS!`);
        // const voiceChannel = message.member.voiceChannel;
        // const voiceChannel = this.client.channels.get(channelID);
        const voiceChannel = getUserChannelById(this.client, channelID);
        // const voiceChannel = channelID;
        // console.log('Voice Channel: ', voiceChannel);
        voiceChannel.join()
        .then(async connection=>{
            await new Promise(res=>{setTimeout(res(), 1000);});
            const dispatcher = connection.playFile('C:/test/beholdSmite.mp3');
            if(!dispatcher) {
                console.log('Could not find file');
            }
            dispatcher.on('end', () => {
                voiceChannel.leave();
            });
        })
        .catch(error=>console.log(error));
    }
};