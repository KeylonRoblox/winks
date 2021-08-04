const Discord = require('discord.js');
require('dotenv').config();
const client = new Discord.Client();
 
const fs = require('fs');
const db = require('quick.db');
 
client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler =>{
    require(`./handlers/${handler}`)(client, Discord);
})

client.on('guildCreate', guild => {
    guild.systemChannel.send(`Hello, I'm Wink. Thanks for inviting me! use **+help** to get started with! Thanks for inviting :)`)
  });

  //--------------------------------------------------------------------------------------------------------------------\\
const distube = require('distube');
 client.distube = new distube(client, { searchSongs: false, emitNewSongOnly: true })
 client.distube
    .on('playSong', (message, queue, song) => message.channel.send(
        `Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}`,
    ))
    .on('addSong', (message, queue, song) => message.channel.send(
        `Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`,
    ))
    .on('error', (message, e) => {
		//console.error(e)
		message.channel.send(`An error encountered: ${e}`)
	});
  
client.login(process.env.DISCORD_TOKEN);