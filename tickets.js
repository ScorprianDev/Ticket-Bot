const Discord = require('discord.js')
const client = new Discord.Client()
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0IjoxLCJpZCI6IjczODkyOTU2NTQ4NDcxMjA0OSIsImlhdCI6MTU5NjMzNDIzOH0.b7pzE1KwtPnGzZ14ijFbx3FwyRcpg4I-BdYgYNT1b1Y"
const axios = require('axios')
const ms = require("ms");
client.on('ready', () => {
console.log('Online')
client.user.setActivity(`tickets in ${client.guilds.cache.size} servers | -help`, { type: 'WATCHING' });

axios({
        method: 'post',
        url: 'https://discordbotlist.com/api/v1/bots/738929565484712049/stats',
        headers: {
            Authorization: `Bot ${token}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        data: JSON.stringify({
            guilds: client.guilds.cache.size,
            users: client.users.cache.size,
        }),
    }).then(function(res) {
        console.log('Statistics sent Successfully')
    }).catch(function(err) {
        console.log(err);
    });

})



client.on('message', async message => {
	if(message.author.bot) return;
	if(message.author.webhook) return;
  const JSONdb = require('simple-json-db')
  const push = new JSONdb(`./prefixes.sqlite`)

  const prefix = push.get(`${message.guild.id}`)

  if(prefix === undefined || prefix === null) {
    const serverprefix = '-'

push.set(`${message.guild.id}`, `-`)
const prefix = push.get(`${message.guild.id}`)


  }

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
	 const push = new JSONdb(`./prefixes.sqlite`)

	  const prefix = push.get(`${message.guild.id}`)
	 const currentprefix = new Discord.MessageEmbed()
  .setTitle('Ticket Bot')
  .setDescription(`This servers prefix is **${prefix}**`)
.setFooter(`Use ${prefix}prefix <prefix> to change the prefix`, 'https://rendernetwork.co/vetriloxlogo.png')
.setColor('WHITE')
if(!args[0]) return message.channel.send(currentprefix);
if(args[0]) {
	if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('You cannot set the server prefix')
	push.set(`${message.guild.id}`, args[0])

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
const ticketopen = new Discord.MessageEmbed()
.setDescription(`Ticket has been opened in ${message.author.id}`)
const ticketcreate = new Discord.MessageEmbed()
.setDescription('Ticket has been opened by ' + message.author.tag)
const JSONdb = require('simple-json-db')
const logsdatabase = new JSONdb('/root/Tickets/Database/logschannel.sqlite')
	const logschannel = logsdatabase.get(message.guild.id)
  const roledatabase = new JSONdb('/root/Tickets/Database/role.sqlite')
  const supportrole = roledatabase.get(message.guild.id)
  const nosupportrole = new Discord.MessageEmbed()
  .setAuthor('Please set your support role before continuing | -setsupportrole')
  .setFooter('Whether this be Support Team or admin')
  if(!supportrole) return message.channel.send(nosupportrole)
	  const failed = false
message.guild.channels.create(message.author.id, {
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
			id: supportrole.id,
			allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'],

		}



	]
})
.then(channel => channel.setTopic(message.author.id)
.then(channel => channel.send(ticketmessage)
.then(channel => message.channel.send(ticketopen)))).catch(err => {
	message.channel.send('Please make sure I have the \`\`MANAGE_CHANNELS\`\` permission otherwise I cannot create a ticket')
	const failed = true
})

if(failed === true) return;
if(logschannel !== undefined) {
client.guilds.cache.get(message.guild.id).channels.cache.get(logschannel).send(ticketcreate)

}

} else if(message.content.toLowerCase() === prefix + "ticket close" || message.content.toLowerCase() === prefix + "t close"){

  const JSONdb = require('simple-json-db')
  const roledatabase = new JSONdb('/root/Tickets/Database/role.sqlite')
  const supportrole = roledatabase.get(message.guild.id)
  const dmdatabase = new JSONdb('/root/Tickets/Database/dmclose.sqlite')
  const dmclose = dmdatabase.get(message.guild.id)
  const logdatabase = new JSONdb('/root/Tickets/Database/logschannel.sqlite')
  const logchannel = logdatabase.get(message.guild.id)
if(message.channel.name === message.channel.topic) {

  message.react('✅').then(() => message.react('❎'));

const filter = (reaction, user) => {
	return ['✅', '❎'].includes(reaction.emoji.name) && user.id === message.author.id;
};

message.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
	.then(collected => {
		const reaction = collected.first();

		if (reaction.emoji.name === '✅') {
      reaction.users.remove(message.author.id)
      message.channel.send('Closing in 5 seconds')
      setTimeout(function () {
        message.channel.send('Closing...')
      }, 4000)
    setTimeout(function () {
    const ticketchannel = client.channels.cache.get(message.channel.id)
    ticketchannel.delete()
    if(dmclose === "enabled") {
      const dmoncloseembed = new Discord.MessageEmbed()
      .setDescription(`Your ticket in ${message.guild.name} has been closed`)
      client.users.cache.get(message.channel.name).send(dmoncloseembed)
    }
    if(logchannel === undefined || logchannel === null){

    } else {
      const ticketclose = new Discord.MessageEmbed()
      .setDescription(`Ticket created by <@${message.channel.name}> has been closed by ${message.author.tag}`)
      const ticketchannel = client.channels.cache.get(logchannel).send(ticketclose)
}
}, 5000)
}





    if(reaction.emoji.name === '❎'){
      reaction.users.remove(message.author.id)
const ticketnotclose = new Discord.MessageEmbed()
.setDescription('Ticket will not close')
message.channel.send(ticketnotclose)
}}).catch(collected => {
    const ticketnotclose = new Discord.MessageEmbed()
    .setDescription('Ticket will not close')
    message.channel.send(ticketnotclose)
	});


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
	const logsdatabase = new JSONdb('/root/Tickets/Database/logschannel.sqlite')
	logsdatabase.set(message.guild.id, channel.id)
	message.channel.send(`Logs will now be sent to ${channel}`)
}else if(message.content.toLowerCase() === "mc?updatecountchannels"){
	client.guilds.cache.get('708474977342718005').channels.cache.get('739286198060712058').setName(`TicketBot: ${client.guilds.cache.size}`)
}else if(message.content.toLowerCase().startsWith(prefix + "dmonclose")){
  if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('You cannot toggle DMonClose')
  const JSONdb = require('simple-json-db')
	const dmdatabase = new JSONdb('/root/Tickets/Database/dmclose.sqlite')
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
    const roledatabase = new JSONdb('/root/Tickets/Database/role.sqlite')
    roledatabase.set(message.guild.id, supportrole)
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
}else if(message.content.toLowerCase().startsWith(prefix + 'suggest')){
	  if(!args[0]) return message.channel.send('What do you want to suggest?');
  const suggestion = args.join(" ");
  const suggestionembed = new Discord.MessageEmbed()
  .setTitle('New Suggestion')
  .addField('Suggestion', suggestion)
  .addField('Author | Server', `<@${message.author.id}> | ${message.guild.name}`)
.setFooter('Ticket Bot', `https://mcfacts.xyz/Subsidiaries/TicketBot/logo.png`)
  client.guilds.cache.get('708474977342718005').channels.cache.get('723490330422411287').send(suggestionembed)
  message.channel.send('Suggestion has been successfully sent to the developers')

}else if(message.content.toLowerCase() === prefix + 'config'){
  const JSONdb = require('simple-json-db')
	const dmdatabase = new JSONdb('/root/Tickets/Database/dmclose.sqlite')
  const currentdmclose = dmdatabase.get(message.guild.id)

  const config = new Discord.MessageEmbed()
  .setTitle(`${message.guild.name}'s Configuration`)
  .addField('Dm on Close', currentdmclose)
  const roledatabase = new JSONdb('/root/Tickets/Database/role.sqlite')
  const supportrole = roledatabase.get(message.guild.id)
  if(supportrole === undefined) {
    config.addField('Support Role', 'Not Set')
  } else {
    const roledatabase = new JSONdb('/root/Tickets/Database/role.sqlite')
    const supportrole = roledatabase.get(message.guild.id)
    config.addField('Support Role', supportrole.name)
  }
  const logsdatabase = new JSONdb('/root/Tickets/Database/logschannel.sqlite')
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
  .setAuthor(`Resetting your servers configuration`, `https://rendernetwork.co/vetriloxloading.gif`)
  const sentMessage = await message.channel.send(Resetting)
  setTimeout(function () {
    const resettinglogchannel = new Discord.MessageEmbed()
    .setAuthor(`Resetting your Log Channel`, `https://rendernetwork.co/vetriloxloading.gif`)
    sentMessage.edit(resettinglogchannel)
    const JSONdb = require('simple-json-db')
    const logsdatabase = new JSONdb('/root/Tickets/Database/logschannel.sqlite')
    logsdatabase.delete(message.guild.id)
  }, 4000)
  setTimeout(function () {
    const resettingdmonclose = new Discord.MessageEmbed()
    .setAuthor(`Resetting your DmonClose`, `https://rendernetwork.co/vetriloxloading.gif`)
    sentMessage.edit(resettingdmonclose)
    const JSONdb = require('simple-json-db')
    const dmdatabase = new JSONdb('/root/Tickets/Database/dmclose.sqlite')
    dmdatabase.set(message.guild.id, 'disabled')
  }, 8000)
  setTimeout(function () {
    const JSONdb = require('simple-json-db')
    const roledatabase = new JSONdb('/root/Tickets/Database/role.sqlite')
    const supportrole = roledatabase.get(message.guild.id)
    const resettingsupportrole = new Discord.MessageEmbed()
    .setAuthor(`Resetting your Support Role`, `https://rendernetwork.co/vetriloxloading.gif`)
    sentMessage.edit(resettingsupportrole)
    roledatabase.delete(message.guild.id)
  }, 12000)
  setTimeout(function () {
    const resettingsupportrole = new Discord.MessageEmbed()
    .setAuthor('Successfully reset configuration')
    sentMessage.edit(resettingsupportrole)
  }, 16000)
}else if(message.content.toLowerCase() === prefix + "updates"){
  message.delete()
  const updates = new Discord.MessageEmbed()
  .setTitle('Ticket Bot Changelog')
  .setDescription('**1.0.2**\n\n\`\`\`--> Updated fallbacks\n--> Changed Config | Changed Support Team from ID to Name\n--> Added Config Reset command\`\`\`')
.setFooter('Ticket Bot', `https://mcfacts.xyz/Subsidiaries/TicketBot/logo.png`)
message.channel.send(updates)
}else if(message.content.toLowerCase().startsWith(prefix + "adduser")){
  const JSONdb = require('simple-json-db')
  const roledatabase = new JSONdb('/root/Tickets/Database/role.sqlite')
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
  const roledatabase = new JSONdb('/root/Tickets/Database/role.sqlite')
  const supportrole = roledatabase.get(message.guild.id)
  const dmdatabase = new JSONdb('/root/Tickets/Database/dmclose.sqlite')
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
}else if(message.content.toLowerCase().startsWith(prefix + "inactive") || message.content.toLowerCase().startsWith(prefix + "inactive")){
	if(message.channel.name === message.channel.topic) {
			let Timer = args[0];

  if(!args[0]){
    return message.channel.send("Please Enter a time period e.g \`\`5s, 10m or 20h\`\`");
  }

  if(args[0] <= 0){
    return message.channel.send("Please Enter a time period e.g \`\`5s, 10m or 20h\`\`");
  }
const timerstart = new Discord.MessageEmbed()
.setDescription(`Closing ticket in ${ms(ms(Timer), {long: true})}`)
  message.channel.send(timerstart)

  setTimeout(function () {
        message.channel.send('Closing...')
      }, ms(Timer) - 1000)

  setTimeout(function(){
	   const ticketchannel = client.channels.cache.get(message.channel.id)
    ticketchannel.delete()
    const JSONdb = require('simple-json-db')
  const dmdatabase = new JSONdb('./Database/dmclose.sqlite')
  const dmclose = dmdatabase.get(message.guild.id)
    if(dmclose === "enabled") {

      const dmoncloseembed = new Discord.MessageEmbed()
      .setDescription(`Your ticket in ${message.guild.name} has been closed`)
      client.users.cache.get(message.channel.name).send(dmoncloseembed)
    }
    const logdatabase = new JSONdb('/root/Tickets/Database/logchannel.sqlite')
    const logchannel = logdatabase.get(message.guild.id)
    if(logchannel === undefined || logchannel === null){

    } else {
      const ticketclose = new Discord.MessageEmbed()
      .setDescription(`Ticket created by <@${message.channel.name}> has been closed by ${message.author.tag}`)
      const ticketchannel = client.channels.cache.get(logchannel).send(ticketclose)
}

  }, ms(Timer));
}else {
  const ticketnotclose = new Discord.MessageEmbed()
  .setDescription('You cannot use this command in non-ticket channels!')
  message.channel.send(ticketnotclose)
}
}

})

client.login('NzM4OTI5NTY1NDg0NzEyMDQ5.XyTDyQ.S1EHMiBjht5CYiE49MBXt-7lHRA')
