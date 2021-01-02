const Discord = require('discord.js')
const client = new Discord.Client()
const axios = require('axios')
const ms = require("ms");
const JSONdb = require('simple-json-db')
const { TOKEN } = require('./config.json')

client.on('ready', () => {
console.log('Online')
client.user.setActivity(`tickets in ${client.guilds.cache.size} servers | -help`, { type: 'WATCHING' });
})

client.on('guildCreate', guild => {
  fs.writeFile(`./Servers/${guild.id}.sqlite`, "", (err) => {})


  setTimeout(() => {
    const db = new JSONdb(`./Servers/${guild.id}.sqlite`)
    db.set('prefix', `-`)
    db.set('dmclose', 'disabled')
    
  })
})



client.on('message', async message => {
	if(message.author.bot) return;
	if(message.author.webhook) return;
  const db = new JSONdb(`./Servers/${message.guild.id}.sqlite`)
const prefix = db.get('prefix')

  if (message.channel.type === 'dm') {
    message.author.send('Please use -ticket create in your bot commands channel, I cannot offer you support from here')
  }
	const args = message.content.split(" ").slice(1);
	if(message.content.toLowerCase() === prefix + "credits"){
	const creditembed = new Discord.MessageEmbed()
	.addField('Developer', `Scorprian#2161\n(scorprian@mcfacts.xyz)`)
	message.channel.send(creditembed)
}
if(message.content.toLowerCase().startsWith(`${prefix}prefix`)){
	const db = new JSONdb(`./Servers/${guild.id}.sqlite`)

	  const prefix = push.get(`prefix`)
	 const currentprefix = new Discord.MessageEmbed()
  .setTitle('Ticket Bot')
  .setDescription(`This servers prefix is **${prefix}**`)
.setFooter(`Use ${prefix}prefix <prefix> to change the prefix`, 'https://rendernetwork.co/vetriloxlogo.png')
.setColor('WHITE')
if(!args[0]) return message.channel.send(currentprefix);
if(args[0]) {
	if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('You cannot set the server prefix')
	db.set(`prefix`, args[0])

 const newprefix = new Discord.MessageEmbed()
 .setDescription('✅|This servers prefix has been changed to ' + args[0])
 .setColor('GREEN')
  message.channel.send(newprefix)
}
}
	else if(message.content.toLowerCase() === prefix + "help"){
		const helpembed = new Discord.MessageEmbed()
		.setTitle('Ticket Commands')
		.addField('help', `Displays this menu`)
		.addField('invite', `Displays invite link`)
		.addField('Credits', `Displays the Credits`)
		.addField('__**Tickets**__', `**ticket new**\nCreates a ticket\n**ticket close**\nCloses the ticket\n**AddUser**\nAdds a user to the ticket\n**RemoveUser**\nRemoves a user from the ticket`)
		.addField('__**Configuration**__', `**setlogschannel**\nSets the logs channel\n**prefix**\nDisplays and sets the prefix\n**dmonclose**\nEnables or disables the DM on ticket close\n**setsupportrole**\nSets the role that has access to the tickets\n**reset**\nResets the servers' configuration to default settings`)
		.setFooter('Ticket Bot')
		message.channel.send(helpembed).catch(err => message.channel.send('I cannot send the Help Embed without the \`\`EMBED_LINKS\`\` permission'));
	}

	else if(message.content.toLowerCase() === prefix + "invite"){
		const invite = new Discord.MessageEmbed()
		.setDescription('Invite link: https://discord.com/oauth2/authorize?client_id=738929565484712049&scope=bot&permissions=27728 \nWebsite: https://mcfacts.xyz/Subsidiaries/TicketBot')
		message.channel.send(invite)
	}
else if (message.content.toLowerCase() === prefix + "ticket new" || message.content.toLowerCase() === prefix + "t new"){
	const ticketmessage = new Discord.MessageEmbed()
.setTitle('New Ticket')
.setDescription('Please explain your issue while you wait for support')
.setFooter('Use -ticket close to close this ticket')

if(client.channels.cache.find(c => c.topic === message.author.id)){
 return message.channel.send('You already have a ticket open')
}

const ticketcreate = new Discord.MessageEmbed()
.setDescription('Ticket has been opened by ' + message.author.tag)
const db = new JSONdb(`./Servers/${message.guild.id}.sqlite`)
	const logschannel = db.get('logchannel')
  const supportrole = db.get('supportrole')
  if(supportrole === undefined) {
    const failed = false
message.guild.channels.create(message.author.tag, {
	type: 'text',
	permissionOverwrites: [
		{
			id: message.guild.id,
			deny: ['VIEW_CHANNEL'],
		},
		{
			id: message.author.id,
			allow: ['VIEW_CHANNEL'],
		},
		{
			id: client.user.id,
			allow: ['VIEW_CHANNEL', 'EMBED_LINKS'],

		}



	]
})
.then(channel => {
  channel.setTopic(message.author.id)
channel.send(ticketmessage)
  message.channel.send(new Discord.MessageEmbed()
.setDescription(`Ticket has been opened in <#${channel.id}>`))
}).catch(err => {
	message.channel.send('Please make sure I have the \`\`MANAGE_CHANNELS\`\` permission otherwise I cannot create a ticket')
	const failed = true
})


if(failed === true) return;
if(logschannel !== undefined) {
client.guilds.cache.get(message.guild.id).channels.cache.get(logschannel).send(ticketcreate)
}
return;
} else {
	  const failed = false
message.guild.channels.create(message.author.tag, {
	type: 'text',
	permissionOverwrites: [
		{
			id: message.guild.id,
			deny: ['VIEW_CHANNEL'],
		},
		{
			id: message.author.id,
			allow: ['VIEW_CHANNEL'],
		},
		{
			id: client.user.id,
			allow: ['VIEW_CHANNEL', 'EMBED_LINKS'],

		},
    {
			id: supportrole,
			allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'],

		}



	]
})
.then(channel => {
  channel.setTopic(message.author.id)
channel.send(ticketmessage)
message.channel.send(ticketopen)
  message.channel.send(new Discord.MessageEmbed()
.setDescription(`Ticket has been opened in <#${channel.id}>`))
}).catch(err => {
	message.channel.send('Please make sure I have the \`\`MANAGE_CHANNELS\`\` permission otherwise I cannot create a ticket')
	const failed = true
})

if(failed === true) return;
if(logschannel !== undefined) {
client.guilds.cache.get(message.guild.id).channels.cache.get(logschannel).send(ticketcreate)

}
}
return;

} else if(message.content.toLowerCase().startsWith(prefix + "ticket close") || message.content.toLowerCase().startsWith(prefix + "t close")){

  const db = new JSONdb(`./Servers/${message.guild.id}.sqlite`)
  const supportrole = db.get(message.guild.id)
  const dmclose = db.get(message.guild.id)
  const logchannel = db.get(message.guild.id)
if(/([0-9])/g.test(message.channel.topic)) {
  if(!args[1]){
    message.channel.send('Closing...')
    setTimeout(() => {
    return message.channel.delete().catch(err => {
      return message.channel.send('Cannot close ticket; Missing \`\`\`MANAGE_CHANNELS\`\`\` permission')
    }, 2000)

  })
  }else if(args[1].endsWith('s') || args[1].endsWith('m') || args[1].endsWith('h')){
    message.channel.send(`Closing in ${args[1]}`)
    setTimeout(() => {
      message.channel.send('Closing...')
    }, ms(args[1]) - 1000)

    setTimeout(() => {
      message.channel.delete()
    }, ms(args[1]))
  }

  if(logchannel !== undefined){
    const ticketcreate = new Discord.MessageEmbed()
.setDescription(`Ticket for ${message.channel.name} has been closed by ${message.author.tag}`)
    client.guilds.cache.get(message.guild.id).channels.cache.get(logschannel).send(ticketcreate)

  }


if(dmclose === enabled){
  message.guild.members.cache.get(message.channel.topic).send(`Your ticket in ${message.guild.name} was just closed`).catch(err => {
    return;
  })
}









  


} else {
  const ticketnotclose = new Discord.MessageEmbed()
  .setDescription('You cannot use this command in non-ticket channels!')
  message.channel.send(ticketnotclose)
}

}else if(message.content.toLowerCase().startsWith(prefix + 'setlogschannel')){
  const supportformat = new Discord.MessageEmbed()
  .setAuthor('Usage: -setlogschannel <channel mention>')
	if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('You cannot set the logs channel')
	const channel = message.mentions.channels.first();
	if(!channel) return message.channel.send(supportformat)
	const JSONdb = require('simple-json-db')
	const logsdatabase = new JSONdb(`./Servers/${message.guild.id}.sqlite`)
	logsdatabase.set('logchannel', channel.id)
	message.channel.send(`Logs will now be sent to ${channel}`)
}else if(message.content.toLowerCase().startsWith(prefix + "dmonclose")){
  if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('You cannot toggle DMonClose')
  const JSONdb = require('simple-json-db')
	const dmdatabase = new JSONdb(`./Servers/${message.guild.id}.sqlite`)
  const currentdmclose = dmdatabase.get(message.guild.id)
  const dmoncloseformat = new Discord.MessageEmbed()
  .setAuthor('Usage: -dmonclose <disable(d)|enable(e)>\n----------\nDMonClose is currently ' + currentdmclose)
	if(!args[0]) return message.channel.send(dmoncloseformat)

			const dmclose = dmdatabase.get(message.guild.it)
if(args[0] === "enable" | args[0] === "e"){
	dmdatabase.set(message.guild.id, "enabled")
	message.channel.send('DM on Close has been enabled')
}
	else if(args[0] === "disable" | args[0] === "d"){
	dmdatabase.set(message.guild.id, 'disabled')
	message.channel.send('DM on Close has been disabled')
}}else if(message.content.toLowerCase().startsWith(prefix + 'setsupportrole')){
  const supportformat = new Discord.MessageEmbed()
  .setAuthor('Usage: -setsupportrole <role mention>')
  if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('You cannot set the support role')
  const supportrole = message.mentions.roles.first()
  if(!supportrole) return message.channel.send(supportformat)
  	const JSONdb = require('simple-json-db')
    const roledatabase = new JSONdb(`./Servers/${message.guild.id}.sqlite`)
    roledatabase.set('supportrole', supportrole)
    message.channel.send(`${supportrole} has been set as the support role`)
}else if(message.content.toLowerCase() === '-info'){
  const infoembed = new Discord.MessageEmbed()
  .setTitle('Ticket Bot Info')
  .addField('Name', `Ticket Bot`, true)
  .addField('Node Version', process.version, true)
  .addField('Library', `Discord.js`, true)
  .addField('Guilds', client.guilds.cache.size, true)
  .addField('Users', client.users.cache.size, true)
  .addField('Channels', client.channels.cache.size, true)
  .addField('Stats', `Tickets Created: `)
message.channel.send(infoembed)
}else if(message.content.toLowerCase() === prefix + 'config'){
  const JSONdb = require('simple-json-db')
	const dmdatabase = new JSONdb(`./Servers/${message.guild.id}.sqlite`)
  const currentdmclose = dmdatabase.get(message.guild.id)

  const config = new Discord.MessageEmbed()
  .setTitle(`${message.guild.name}'s Configuration`)
  .addField('Dm on Close', currentdmclose)
  const roledatabase = new JSONdb('./Servers/role.sqlite')
  const supportrole = roledatabase.get(message.guild.id)
  if(supportrole === undefined) {
    config.addField('Support Role', 'Not Set')
  } else {
    const roledatabase = new JSONdb('./Servers/role.sqlite')
    const supportrole = roledatabase.get(message.guild.id)
    config.addField('Support Role', supportrole.name)
  }
  const logsdatabase = new JSONdb('./Servers/logschannel.sqlite')
  const logschannel = logsdatabase.get(message.guild.id)
  if(logschannel == undefined){
  config.addField('Logs Channel', `Not Set`)
  } else {
      config.addField('Logs channel', `<#${logschannel}>`)
  }
config.setFooter('Ticket Bot', `https://mcfacts.xyz/Subsidiaries/TicketBot/logo.png`)
message.channel.send(config)
}else if(message.content.toLowerCase() === prefix + "reset"){
  if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('You cannot use this command')
  const Resetting = new Discord.MessageEmbed()
  .setAuthor(`Resetting your servers configuration`, `https://mcfacts.xyz/Images/emojis/loading.gif`)
  const sentMessage = await message.channel.send(Resetting)
  setTimeout(function () {
    const resettinglogchannel = new Discord.MessageEmbed()
    .setAuthor(`Resetting your Log Channel`, `https://mcfacts.xyz/Images/emojis/loading.gif`)
    sentMessage.edit(resettinglogchannel)
    const JSONdb = require('simple-json-db')
    const logsdatabase = new JSONdb('./Servers/logschannel.sqlite')
    logsdatabase.delete(message.guild.id)
  }, 4000)
  setTimeout(function () {
    const resettingdmonclose = new Discord.MessageEmbed()
    .setAuthor(`Resetting your DmonClose`, `https://mcfacts.xyz/Images/emojis/loading.gif`)
    sentMessage.edit(resettingdmonclose)
    const JSONdb = require('simple-json-db')
    const dmdatabase = new JSONdb(`./Servers/${message.guild.id}.sqlite`)
    dmdatabase.set(message.guild.id, 'disabled')
  }, 8000)
  setTimeout(function () {
    const JSONdb = require('simple-json-db')
    const roledatabase = new JSONdb('./Servers/role.sqlite')
    const supportrole = roledatabase.get(message.guild.id)
    const resettingsupportrole = new Discord.MessageEmbed()
    .setAuthor(`Resetting your Support Role`, `https://mcfacts.xyz/Images/emojis/loading.gif`)
    sentMessage.edit(resettingsupportrole)
    roledatabase.delete(message.guild.id)
  }, 12000)
  setTimeout(function () {
    const resettingsupportrole = new Discord.MessageEmbed()
    .setAuthor('Successfully reset configuration')
    sentMessage.edit(resettingsupportrole)
  }, 16000)
}else if(message.content.toLowerCase().startsWith(prefix + "adduser")){
  const JSONdb = require('simple-json-db')
  const roledatabase = new JSONdb('./Servers/role.sqlite')
  const supportrole = roledatabase.get(message.guild.id)
  if(message.member.hasPermission('ADMINISTRATOR') || message.member.roles.cache.has(supportrole.id)){
  if(message.channel.name !== message.channel.topic) return message.channel.send('You cannot add users to this channel')
  const noargs = new Discord.MessageEmbed()
  .setAuthor(`Usage: ${prefix}adduser (user id)`)
  if(!args[0]) return message.channel.send(noargs)
    message.channel.updateOverwrite(args[0], { VIEW_CHANNEL: true });
    message.channel.send('User has been added to the ticket')
} else {
  message.channel.send('You cannot use this command')
}

}else if(message.content.toLowerCase().startsWith(prefix + "removeuser")){
  const JSONdb = require('simple-json-db')
  const roledatabase = new JSONdb('./Servers/role.sqlite')
  const supportrole = roledatabase.get(message.guild.id)
  const dmdatabase = new JSONdb(`./Servers/${message.guild.id}.sqlite`)
  const dmclose = dmdatabase.get(message.guild.id)
    if(message.member.hasPermission('ADMINISTRATOR') || message.member.roles.cache.has(supportrole.id)){
  if(message.channel.name !== message.channel.topic) return message.channel.send('You cannot add users to this channel')
  const noargs = new Discord.MessageEmbed()
  .setAuthor(`Usage: ${prefix}removeuser (user id)`)
  if(!args[0]) return message.channel.send(noargs)
  message.channel.permissionOverwrites.get(args[0]).delete();
  message.channel.send('User has been removed from the ticket')
} else {
  message.channel.send('You cannot use this command')
}
}

})

client.login(TOKEN)
