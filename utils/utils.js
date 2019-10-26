// const isVoiceChannel = (messageData) => {
//     console.log('Message data: ', messageData);
// };

const getPureTargetId = target => {
    //patch to remove any non numerical chars
    const ALLOWED_CHARS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const targetChars = target.split('');
    const pureId = targetChars.filter(char=>ALLOWED_CHARS.includes(char)).join('');
    // const noFront = target.split('<@');
    // const pure = noFront[1].split('>');
    // return pure[0];
    // console.log('pureId: ', pureId);
    return pureId;
};

const getUserInfo = (client, targetId) => {
    if(!isIdPure(targetId)) {
        targetId = getPureTargetId(targetId);
    }
    return client.users.get(targetId);
};

const isOnline = (client, targetId)=> {
    if(!isIdPure(targetId)) {
        targetId = getPureTargetId(targetId);
    }
    console.log('target id', targetId);
    console.log('client users target', client.users.get(targetId));
    return client.users.get(targetId).presence.status === 'online';
};

const getUserVoiceChannelId = (client, targetId) => {
    if(!isIdPure(targetId)) {
        targetId = getPureTargetId(targetId);
    }
    const userInfo = getUserInfo(client, targetId);
    if(userInfo.lastMessage === null) {
        return null;
    }
    const { lastMessage:{ member } } = userInfo;
    return member.voiceChannelID;
};

const getUserChannelById = (client, channelId)=>{
    return client.channels.get(channelId);
};

const isValidTarget = targetId => {
    const NOT_VALID = [
        '@everyone',
        '@here',
    ];
    return !NOT_VALID.some(id=>targetId === id);
};

const isExempt = targetId => {
    if(!isIdPure(targetId)) {
        targetId = getPureTargetId(targetId);
    }
    const EXEMPT = [
        '438917041202790408',
        '636260414795153428',
        '249385830466977792',
    ];

    return EXEMPT.some(id=>id === targetId);
};

const isBotOwner = targetId => {
    if(!isIdPure(targetId)) {
        targetId = getPureTargetId(targetId);
    }
    const OWNER_ID = '438917041202790408';
    return targetId === OWNER_ID;
};

const isIdPure = targetId => {
    return !targetId.startsWith('<@');
}

const isZeus = targetId => {
    if(!isIdPure(targetId)) {
        targetId = getPureTargetId(targetId);
    }
    const ZEUS_ID = '636260414795153428';
    return targetId === ZEUS_ID;
};

module.exports = {
    getPureTargetId,
    isOnline,
    getUserInfo,
    getUserVoiceChannelId,
    isValidTarget,
    getUserChannelById,
    isExempt,
    isBotOwner,
    isZeus,
};
