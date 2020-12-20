const keep_alive = require('./keep_alive.js');
const express = require('express');
const app = express();
const port = 3000;
app.get('/', (req, res) => res.send('im alive'));

app.listen(port, () =>
	console.log('your App Is Listening At https://localhost:${port}')
);

//discord.js
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const got = require('got')
const enmap = require("enmap");
const client = new Discord.Client();

const embed = new Discord.MessageEmbed()
	embed.setTitle('Some Title')
	embed.setColor('RANDOM');
	embed.setDescription('some description')
	embed.setFooter(`
	some footer
	`);
	



client.once('ready', () => {
	console.log('Ready!');
	
client.user.setActivity('discord.js', { type: 'WATCHING' })
  .then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
  .catch(console.error);
});

client.on('message', message => {
  if (!message.content.startsWith(prefix)) return;

let args = message.content.slice(prefix.length).split(" ");
let command = args.shift().toLowerCase()

  //------ 
	if (command === 'beep') {
		message.channel.send('Boop.');
	} else if (command === 'server') {
		message.channel.send(
			`Server name: ${message.guild.name}\nTotal members: ${
				message.guild.memberCount
			}`
		);
	} else if (command === 'say') {
		var text = message.content
			.split(' ')
			.slice(1)
			.join(' ');
		if (!text) return message.reply('Tolong beri aku kata kata!!!!!!');
		message.channel.send(text);
	} else if (message.content === `${prefix}user-info`) {
		message.react('📝');
		message.channel.send(
			`Your username: ${message.author.username}\nYour ID: ${message.author.id}`
		);
	} else if (message.content === `${prefix}fruits`) {
		message.react('🍎');
		message.react('🍊');
		message.react('🍇');
		message.react('🍉');
	} else if (message.content === `${prefix}help`) {
	  message.channel.send(`me prefix: ${prefix}\ncommands:\n-beep customreaction\n-fruits customreaction\nuser-info messagenormal\nsay say(not word = message error)\nserver your server info\nmeme meme`)
	} else if (command === 'meme') {
        const embed = new Discord.MessageEmbed()
        got('https://www.reddit.com/r/memes/random/.json').then(response => {
            let content = JSON.parse(response.body);
            let permalink = content[0].data.children[0].data.permalink;
            let memeUrl = `https://reddit.com${permalink}`;
            let memeImage = content[0].data.children[0].data.url;
            let memeTitle = content[0].data.children[0].data.title;
            let memeUpvotes = content[0].data.children[0].data.ups;
            let memeDownvotes = content[0].data.children[0].data.downs;
            let memeNumComments = content[0].data.children[0].data.num_comments;
            embed.setTitle(`${memeTitle}`)
            embed.setURL(`${memeUrl}`)
            embed.setImage(memeImage)
            embed.setColor('RANDOM')
            embed.setFooter(`👍 ${memeUpvotes} 👎 ${memeDownvotes} 💬 ${memeNumComments}`)
            message.channel.send(embed);
        }) 
    } else if (command === 'testembed') {
      message.channel.send(embed)
    }
});

client.login(token);
