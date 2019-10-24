const Commando = require('discord.js-commando');
const path = require('path');
const sqlite = require('sqlite');

const { TOKEN } = require('./auth');

const client = new Commando.Client({
    owner:'438917041202790408',
    commandPrefix:'?',
});

client.registry
.registerDefaultTypes()
.registerGroups([
    ['test', 'Test commands'],
])
.registerDefaultGroups()
.registerDefaultCommands()
.registerCommandsIn(path.join(__dirname, 'commands'));

client.setProvider(
    sqlite.open(path.join(__dirname ,'settings.sqlite3')).then(db=>new Commando.SQLiteProvider(db))
    .catch(err=>console.log(err))
);

client.once('ready', ()=>{
    console.log('A God burst forth from marvelous lightning!');
    client.user.setActivity('the realm', { type:'WATCHING' });
});

client.login(TOKEN);