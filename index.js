////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////[ LES CONSTANTES ]////////////////////////////////////////////////

const http = require('http');
const https = require('https');
const express = require('express');
const app = express();
/*
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html');

})

app.listen(process.env.PORT);
setInterval(() => {
https.get(`https://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 200000);
*/

const Discord = require("discord.js");
const client = new Discord.Client({autoReconnect: true, max_message_cache: 0});
const token = require('./settings.json').token;
const yt = require("./youtube_plugin"),

youtube_plugin = new yt(),
weather = require("weather-js"),
functionHelper = require('./functionHelpers.js'),
ffmpeg = require("ffmpeg"),
search = require('youtube-search'),
con = console.log,
mention = "<@376027515640348682>";

const fs = require("fs")
const AuthDetails = require("./config.json");
const music = require('./music.js');
const util = require("./util.js");
const cmds = require('./commands.js');
const ytdl = require('ytdl-core');
const tool = require('./tool.js');
const config = require("./config.json");
const chalk = require('chalk');
const rp = require('request-promise');
const ms = require('ms');
const bot = new Discord.Client();
const owner = "323147880548270081";
var moment = require("moment");
var randnum = 0;

const os = require('os');
const opts = {
  maxResults: 3,
  key: AuthDetails.youtube_api_key
  
};

////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////[ TOKEN CONFIG ]//////////////////////////////////////////////////

client.login(token)

////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////[ CONFIGURATION ]/////////////////////////////////////////////////

client.on('message', msg => {
  if (msg.author.client || msg.channel.type != 'text')
      return; // Ne répondez pas aux messages des robots ou des messages qui ne proviennent pas des guildes.

  if (!msg.content.startsWith(config.prefix))
      return; //Pas une commande.

  let cmd = msg.content.split(/\s+/)[0].slice(config.prefix.length).toLowerCase();
  getCmdFunction(cmd)(msg);
  client.login(token)
});

////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////[ NOUVEAU MEMBRE MESSAGE ]////////////////////////////////////////


client.on('guildMemberAdd', member => {
  const welcomechannel = member.guild.channels.find('name', 'general')
  
  var embed = new Discord.RichEmbed()
  .setColor('#76D880')
  .setTimestamp()
  .addField(`:arrow_right: **${member.user.username}**`,':inbox_tray: Bienvenue a toi !! ')
  return welcomechannel.send({embed})

});

////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////[ QUITTE MEMBRE MESSAGE ]/////////////////////////////////////////

client.on('guildMemberRemove', member => {
  const welcomechannel = member.guild.channels.find('name', 'general')
  
  var embed = new Discord.RichEmbed()
  .setColor('#DE5454')
  .setTimestamp()
  .addField(`:outbox_tray: **${member.user.username}**`, "A quitté le serveur !!")
  return welcomechannel.send(embed)
  
});


////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////[ READY CMD ]/////////////////////////////////////////////////////

client.on('ready',() => {
 client.user.setPresence({ game: { name: `Open = [ ${prefix}aide ]`, type: 0 } });
 var memberCount = client.users.size;
 var servercount = client.guilds.size;
 var memberNumber = client.users.size;
 var serverNumber = client.guilds.size;
 var servers = client.guilds.array().map(g => g.name).join(',');

console.log("--------------------------------------");
console.log('--> Bot By YELENA \n--> Connecter avec succès  \n--> Le préfix actuelle:  ' + prefix + " \n--> Nombre d'utilisateurs: " + ` ${client.users.size} ` + " \n--> Nombre salon: " + ` ${client.channels.size} ` + " \n--> Nombre de serveurs: " + ` ${client.guilds.size} `);
console.log("--------------------------------------");
console.log(chalk.green('√' + ' Bot chargé'));
console.log('______________________________________');
  

});

////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////[ CONFIGURATION ]/////////////////////////////////////////////////

const prefix = require ("./config.json").prefix;
client.on('message', message => {
  var guild = message.guild;
  let args = message.content.split (' ').slice(1);
  var argresult = args.join(' ');

  if (!message.content.startsWith(prefix)) return;
  if (message.author.bot) return;
  
////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////[ COMMANDE RESTART ]//////////////////////////////////////////////
  
if (message.content.startsWith(config.prefix + 'restart')) {
    if(message.author.id !== owner ) return;
       message.delete().then(() => process.exit(1))
}
  
////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////[ COMMANDE GAME BOT ]/////////////////////////////////////////////
  
  if (message.content.startsWith(config.prefix + 'setgame')) {
    if(message.author.id !== owner ) return;
      client.user.setGame(argresult); return message.reply('Mon **jeu** a était **modifié** avec **succés** !!')
  } else

////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////[ COMMANDE STATUT BOT ]///////////////////////////////////////////
    
  if (message.content.startsWith(config.prefix + 'setstatut')) {
    if(message.author.id !== owner ) return;
      client.user.setStatus(argresult); //return message.reply('Mon **status** a était **modifié** avec **succés** !!')
      // idle = absent | dnd = offline  | invisible = invisible  | online = online //
    } else 
      
////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////[ COMMANDE WARN ]/////////////////////////////////////////////////
  
    if(message.content.startsWith(config.prefix + `warn`)) {
      if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.sendMessage("Vous n'avez pas la permission **WARN** !!");
      let reason = args.slice(1).join(' ');
      let user = message.mentions.users.first(); 
      if (reason.length < 1) return message.reply('Vous devez fournir une raison pour l\'avertissement');
      if (message.mentions.users.size < 1) return message.reply('Vous devez mentionner un utilisateur').catch(console.error);
      var embed = new Discord.RichEmbed()
      .setColor(0x00AE86)
      .setTimestamp()
      .addField('Action:', 'Warning')
      .addField('Utilisateur:', `${user.username}`)
      .addField('Raison:', `${reason}`)
      .addField('-------------------------', `WARN effectué par :`)
      .setThumbnail(`${message.guild.iconURL}`)
      .addField('Administrateur:', `${message.author.username}`);
      //return client.channels.get(modlog.id).sendEmbed(embed);
      message.channel.sendEmbed(embed);
      
      console.log(`${message.author.username} sur ${message.guild.name} salon ${message.channel.name} : ${(chalk.green('\u2713'))} A ouvert la fonction [ WARN ]\n--------------------------------------`);
    } else
      
////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////[ COMMANDE KICK ]/////////////////////////////////////////////////
      
    if(message.content.startsWith(config.prefix + `kick`)) {
      if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.sendMessage("Vous n'avez pas la permission **KICK** !!");
      let reason = args.slice(1).join(' ');
      let user = message.mentions.users.first();
      if (reason.length < 1) return message.reply('Vous devez fournir une raison pour **kick**');
      if (message.mentions.users.size < 1) return message.reply('Vous devez mentionner un utilisateur').catch(console.error);
      if (!message.guild.member(user).kickable) return message.reply('Je ne peux pas **KICK** ce membre');
      message.guild.member(user).kick();
      const embed = new Discord.RichEmbed()
      .setColor(0x00AE86)
      .setTimestamp()
      .addField('Action:', 'Kick')
      .addField('Utilisateur:', `${user.username}`)
      .addField('Raison:', `${reason}`)
      .addField('-------------------------', `KICK effectué par :`)
      .setThumbnail(`${message.guild.iconURL}`)
      .addField('Administrateur:', `${message.author.username}`);
      message.channel.sendEmbed(embed);
      
      console.log(`${message.author.username} sur ${message.guild.name} salon ${message.channel.name} : ${(chalk.green('\u2713'))} A ouvert la fonction [ KICK ]\n--------------------------------------`);
      
    } else
      
////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////[ COMMANDE BAN ]//////////////////////////////////////////////////
      
    if(message.content.startsWith(config.prefix + `ban`)) {
      if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.sendMessage("Vous n'avez pas la permission **BAN** !!");
      let reason = args.slice(1).join(' ');
      let user = message.mentions.users.first();
      if (reason.length < 1) return message.reply('Vous devez fournir une raison pour **ban**');
      if (message.mentions.users.size < 1) return message.reply('Vous devez mentionner un utilisateur').catch(console.error);
      if (!message.guild.member(user).bannable) return message.reply('Je ne peux pas **BAN** ce membre');
      message.guild.ban(user, 2);
      const embed = new Discord.RichEmbed()
      .setColor(0x00AE86)
      .setTimestamp()
      .addField('Action:', 'ban')
      .addField('Utilisateur:', `${user.username} Id: ${user.id}`)
      .addField('Raison:', `${reason}`)
      .addField('-------------------------', `BAN effectué par :`)
      .setThumbnail(`${message.guild.iconURL}`)
      .addField('Administrateur:', `${message.author.username}`);
      message.channel.sendEmbed(embed);
      
      console.log(`${message.author.username} sur ${message.guild.name} salon ${message.channel.name} : ${(chalk.green('\u2713'))} A ouvert la fonction [ BAN ]\n--------------------------------------`);
    } else
      
////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////[ COMMANDE LOCK-CHANNEL ]/////////////////////////////////////////
      
    if(message.content.startsWith(config.prefix + `lock`)) {
      message.delete().catch(O_o=>{}); 
      //if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.sendMessage("Vous n'avez pas la permission **LOCK** !!");
      if (!client.lockit) client.lockit = [];
      let time = args.join(' ');
      let validUnlocks = ['release', 'unlock'];
      if (!time) return message.reply('Vous devez définir une durée pour le verrouillage; en heures, minutes ou secondes');
    
      if (validUnlocks.includes(time)) {
        message.channel.overwritePermissions(message.guild.id, {
          SEND_MESSAGES: null
        }).then(() => {
          message.channel.sendMessage('Verrouillage terminé');  '\u2713' + ' Bot chargé'
          clearTimeout(client.lockit[message.channel.id]);
          delete client.lockit[message.channel.id];
        }).catch(error => {
          console.log(error);
        });
      } else {
        message.channel.overwritePermissions(message.guild.id, {
          SEND_MESSAGES: false
        }).then(() => {
          message.channel.sendMessage(`Canal verrouillé pour ${ms(ms(time), { long:true })}`).then(() => {
    
            client.lockit[message.channel] = setTimeout(() => {
              message.channel.overwritePermissions(message.guild.id, {
                SEND_MESSAGES: null
              }).then(message.channel.sendMessage('Verrouillage terminé')).catch(console.error);
              delete client.lockit[message.channel.id];    
            }, ms(time));
    
          }).catch(error => {
            console.log(error);
          });
        });
      }
      console.log(`${message.author.username} sur ${message.guild.name} salon ${message.channel.name} : ${(chalk.green('\u2713'))} A ouvert la fonction [ LOCK ]\n--------------------------------------`);
    
    }

 });
    
////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////[ CONFIGURATION ]/////////////////////////////////////////////////

     client.on('message', message => {
      if (message.author.bot) return;
      if (!message.content.startsWith(config.prefix)) return;
    
      let command = message.content.split(" ")[0];
      command = command.slice(config.prefix.length);
    
      var args = message.content.split(" ").slice(1);
      var msgauthor = message.author.id;
    
      if(message.author.bot)return;
    
    
 
       
////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////[ COMMANDE ADDITION ]/////////////////////////////////////////////
       
      if (command === "add") {
        
          let numArray = args.map(n=> parseInt(n));
          let total = numArray.reduce( (p, c) => p+c);
    
          message.channel.sendMessage(total);
          
      console.log(`${message.author.username} sur ${message.guild.name} salon ${message.channel.name} : ${(chalk.green('\u2713'))} A ouvert la fonction [ ADD ]\n--------------------------------------`);    
      }
       
////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////[ COMMANDE SAY ]//////////////////////////////////////////////////
       
      if(command === "say") {
        const sayMessage = args.join(" ");
        message.delete().catch(O_o=>{}); 
    
        message.channel.send(sayMessage);      
        
      }
       
    
////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////[ COMMANDE MESS-EMBED ]///////////////////////////////////////////
       
      if(command === "") {
      const sayMessage = args.join(" ");
        message.delete().catch(O_o=>{});
        var help_embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .addField(`${message.author.username}`,`${sayMessage}`)
        .setThumbnail(`${message.author.avatarURL}`)
        message.channel.sendEmbed(help_embed);
    console.log(`${message.author.username} sur ${message.guild.name} salon ${message.channel.name} : ${(chalk.green('\u2713'))} A ouvert la fonction [ MESS EMBED ]\n--------------------------------------`);
      }
    
////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////[ COMMANDE EVALUATION ]///////////////////////////////////////////
       
      if(message.content.startsWith(prefix + "eval")) {
        message.channel.startTyping();
    message.channel.stopTyping();
         message.delete().catch(O_o=>{}); 
          if(message.author.id !== owner ) return;
          try {
              var code = args.join(" ");
              var evaled = eval(code);
    
              if (typeof evaled !== "string")
                  evaled = require("util").inspect(evaled);
            
            const embed = new Discord.RichEmbed()
            .addField('Code:', ` \`\`\`js\n${code}\n\`\`\``)
            .addBlankField(true)
            .addField('Résultat:', ` \`\`\`js\n${clean(evaled)}\n\`\`\``)
            message.channel.sendEmbed(embed);
            
          } catch(err) {
              message.channel.send(`\`ERREUR\` \`\`\`diff\n- ⚠ ${clean(err)} ⚠\n\`\`\``);  
          }
console.log(`${(chalk.green(`${message.author.username}`))}` +' sur '+ (chalk.magenta(`${message.guild.name}`)) + ' salon ' + (chalk.magenta(`${message.channel.name}`))+' : ' + ' A ouvert la fonction [' + (chalk.cyan(` EVAL `))+ ']\n--------------------------------------')    
      }
    })



////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////[ COMMANDE CARACTERES ]///////////////////////////////////////////

    client.on('message', message => {   
      
     if (message.content === `${prefix}caracteres`){
      var help_embed = new Discord.RichEmbed()
       .setColor('#FF0000')
       .addField(":trident: [ CARACTERES SPECIAUX ] :trident:","۩ ๑ ۞ ♥ ஐ • @ ღ ● ₪ √ ™ № ╬ ~ ξ € ﺕ ≈ ॐ ♪ ® ♂ ♀ û â î ♣ ♠ ◊ εїз ^ + * & % # ¨ o 0 »-> ø ¤ ? ¿ © † ♡ <-« ๏ ย ร ø ж ° ■ஹ ஸ ఋ ఊ ௌ ொ இ ౖ ௲ ூ ஃ ஊ ஏ ஐ ஒ ஓ ஔ ஜ ஞ ి ಔ ృ ూ ప ௯ ௮ ி ஞ ஜ ಋ ౡౠ ౖ ಱ ಯ ಮ ಭ ಬ ￼↔ ↕ ﻬ ҳ̸Ҳ̸ҳ ± Ψ۝ ╦ ╩ § ▲♦ ¶ ∩ $ ¼ ½ ¾ x » « ╚> <╝❤♫ ♬ ♪ ♩ ♭ ♪☀ ஐღ♂♀♥♡☜☞☎☏♠♣▣▤▥▦▩♬♪♩♭♪の☆→あⓛⓞⓥⓔ｡°º¤•εïз╬㊈㊉㊊㊋㊌㊍㊎㊏㊐㊑㊒㊓㊔㊕㊖㊗⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳㊀㊁㊂㊃㊄㊅㊆㊇㊈㊉㊊のஐღ♂ ♀ ♥ ♠ ♣ ♪ の ☆→ あⓛⓞⓥⓔ ｡°º¤•εïз ╬㊈㊉㊊㊋㊌㊍㊎㊏ ㊐㊑㊒㊓㊔㊕㊖ ◊① ② ③ ④ ⑤ ⑥ ⑦ ⑧ ⑨ ⑩ ™ ╬ ღ ♂ ♀ ♥ ↔ ↕ → ← ▪ ๑ ▄ █ ▌ ✄ © ® ⁂ ░ ▒ ▒ ▓ ◊ ◦ ♠ ♣ ♪ の → ° ■ ♀ Ψ № ← ∑ ξ ζ ω ∏ √ ∩ ¤ ∞ ≡ ▄ ≠ ^_^ ─ = » « ﺴ ۩ ๑ ๑ ۩ ۞ ۩ ๑ ▲ γ ō ◊♥╠═╝▫■□۩۞๑»«ஐҳ̸Ҳ̸ҳ©†εïз♪ღ♣♠•±җ۝°•  ോ ൌ ് ൗ ൠ ാ ി ീ ു ൂ ൃ ಂ ಃ ಅ ಆ ಇ ಈ ಉ ಊ ಋ ಌ ಎ ಏ ಐ ಒ ಓ ಔ ಕ ಖ ಗ ಘ ಙ ಚ ಛ ೠ ೡ ೦ ೧ ೨ ೩ ೪ ೫ ೬ ೭ ೮ ೯ ௩ ௪ ௫ ௬ ௭ ௮ ௯ ௰ ௱ ௲ ભ મ ય ર લ ળ વ શ ४ ५ ६ ७ ८ ९॑ ॒ ॓ ॔ क़ ख़ ग़ ज़ ड़ ढ़ फ़ य़ ॠ ॡ ॢ ॣ ")
       message.channel.sendEmbed(help_embed);
    
       var help_embed = new Discord.RichEmbed()
       .setColor('#FF0000')
       .addField("Page 2 ","। ॥ ० १ा ि ी ु ू ृ ँ ं ः ॄ ॅ ॆ े ै ॉ ॊ ो ौ ् ़ॐ २ ڧ ڨ ை३ ஹ ஸ ್ರ ಳ್௮ ಆ ಕ್ಷ್ ఋ ன ಠ್ ಳ್ ப ம உ ஊ ఊ ௌ ொ இ ౖ ௲ ூ ஃ ஊ ஏ ஐ ஒ ஓ ஔ ஜ ஞ ి ಔ ృ ూ ప ௯ ௮ ி ஞ ஜ ಋ ౡౠౖ ಱ ಯ ಮ ಭ ಬ ￼ ҈ لّـّـّّا ® © җ ♥ ♂ ♀ ♥ ↔ ↕ ▪ ๑ ಕ▄ █ °¹²³∙ ▒ ◊ ◦ ♠ ♣ ♪ の →°■♀ Ψ №← ∑ ξ ζ ω ∏ √ ∩¤ ∞≡ ▄ ≠ ^_^ ─ = ≈≌ ﺴ۩๑ ๑۩۞۩๑ ▓ ▲ γ ō ╦ ╩ ε ┘ ┌ ╬ ω § Θ I ™ ۣ۞ ۝ ù ν ώ x ч ž ۩₪۩ﺴ۩๑ ೪.೫ ๑۩۞۩๑ »»--><--«« ๑۩۞۩๑๑۩ﺴ≈۩₪۩ ∂ † ‡ ‼ ﻙ ფ ﻍ ﻪა ბ გ დ ხ ჯ ჰ ჱ ე ป ผ ฝ พ ฟ ภ ม ย ร ฤ ล ฦ ว ศ ษ ส •.:.•ോ سيف ભ મ ય ર લ ળ વ શ ષ સ હ ઼ ઽ ા િ ી ુ ૂ ૃ ૄ ૅ ે ૈ ૉ ો ૌ ્ড ঢ ণ ত থ দ ধ ন প ফ ব ভ ম য র ল শ ষ স ঁ ং ঃ অ আ ই ঈ উ ঊ ঋ ঌ এ ঐ ও ঔ ক খ গহ ಐ ಓ ಔ ಕ ಖ ಗ ಘ ಙ ಝ ಞ ಲ ಶ ಹ ೀ ಾ ಿ ಧಿ ೈ ೋ ೌ ೬ ೂ ೄ .:｡✿*ﾟ‘ﾟ･✿.｡.:* *.:｡✿*ﾟ’ﾟ･✿.｡.:* *.:｡✿*ﾟ¨ﾟ✎･ ✿.｡.:* *.:｡✿*ﾟ¨ﾟ✎･✿.｡.:*【】√ ¤ ∞ ㊝ ≡ ✖ ™ 乀 の♈ ◖◗♋ 灬 ≈ ◈Ш ǎ ☃ ☎ ☏ ☺ ☻ ▧ ▨ ♨ ◐ ค ๒ ς ๔ є Ŧ ﻮ ђ เ ן к l ๓ ภ ๏ ק ợ г ร t ย ש ฬ ץ א z α в c ∂ ε ғ g н ι נ к ℓ м η σ ρ q я s т υ v ω x ү z ά в ς đ έ ғģ ħ ί ј ķ Ļ м ή ό ρ q ŕ ş ţ ù ν ώ x ч ž ")
       message.channel.sendEmbed(help_embed);
    
       console.log(`${message.author.username} sur ${message.guild.name} salon ${message.channel.name} : ${(chalk.green('\u2713'))} A ouvert la fonction [ CARACTERES ]\n--------------------------------------`);  
    
    
////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////[ COMMANDE PING ]/////////////////////////////////////////////////
       
    }  if (message.content === (`${prefix}ping`)){
      message.channel.send(`${message.author.username}` + ' Voici les resultats !!').then((msg) => {
        msg.edit()
        var help_embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .addField(":trident: [ PING ] :trident:",':hourglass: Le **BOT** a mis: ' + `[ **${msg.createdTimestamp - message.createdTimestamp}**`+ ' **Ms** ] pour repondre.\n:stopwatch: Et l\'**API** a mis: ' + `[ **${Math.round(client.ping)}**`+ ' **Ms** ] pour repondre')
        message.channel.sendEmbed(help_embed);
            console.log(`${message.author.username} sur ${message.guild.name} salon ${message.channel.name} : ${(chalk.green('\u2713'))} A ouvert la fonction [ PING ]\n--------------------------------------`);     
                 });

   
////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////[ COMMANDE PING ]/////////////////////////////////////////////////
      
  }  if (message.content === (`${prefix}Ping`)){
      message.channel.send(`${message.author.username}` + ' Voici les resultats !!').then((msg) => {
        msg.edit()
        var help_embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .addField(":trident: [ PING ] :trident:",':hourglass: Le **BOT** a mis: ' + `[ **${msg.createdTimestamp - message.createdTimestamp}**`+ ' **Ms** ] pour repondre.\n:stopwatch: Et l\'**API** a mis: ' + `[ **${Math.round(client.ping)}**`+ ' **Ms** ] pour repondre')
        message.channel.sendEmbed(help_embed);
                 console.log(`${message.author.username} sur ${message.guild.name} salon ${message.channel.name} : ${(chalk.green('\u2713'))} A ouvert la fonction [ PING ]\n--------------------------------------`);
                 });
  
////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////[ COMMANDE GTA ]//////////////////////////////////////////////////
    
    } if (message.content === `${prefix}gta`){
      var help_embed = new Discord.RichEmbed()
       .setColor('#00FFAF')
       .addField(":trident: [ UPDATE GTA ] :trident:",`https://mega.nz/#!AXhh1a4Z!XzulCkeccj7Yl_pJfzLa8LtY32KhKQNmTyPlNanXuXo`)
       .setThumbnail("https://img15.hostingpics.net/pics/445492Sanstitre1.png")
       .setImage("https://img15.hostingpics.net/pics/954921Sanstitre2.jpg")
       .setFooter("© By LarchitecT")
       message.channel.sendEmbed(help_embed);
      message.delete().catch(O_o=>{}); 
    
      console.log(`${message.author.username} sur ${message.guild.name} salon ${message.channel.name} : ${(chalk.green('\u2713'))} A ouvert la fonction [ GTA ]\n--------------------------------------`); 
      
////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////[ COMMANDE AIDE]//////////////////////////////////////////////////
      
    } if (message.content === `${prefix}aide`){
     var help_embed = new Discord.RichEmbed()
      .setColor('#FFFFFF') 
      .addField(":shield:  [ ->MENU D'AIDE ] :shield: ","----------------------------------------------------------------")
      .addField("Bienvenue sur le menu d'aide ! ","----------------------------------------------------------------")
      .addField(`:large_blue_diamond: MUSIC`, `:red_circle: **${prefix}music play [Titre musique / url]** ---*Pour mettre votre musique en playlist*\n:red_circle: **${prefix}music start** ---*Pour que le bot rejoigne votre salon*\n:red_circle: **${prefix}music next** ---*Passer à la musique suivante*\n:red_circle: **${prefix}music pause** ---*Met la musique en pause*\n:red_circle: **${prefix}music reprendre** ---*Reprendre la musique*\n:red_circle: **${prefix}music queue** ---*Met la musique en file d'attente*\n:red_circle: **${prefix}music purge** ---*Purge la file d'attente*\n:red_circle: **{prefix}music np** ---*Affiche la musique en cours*\n:red_circle: **${prefix}music vol [ entre 0 et 100 ]** ---*Monte et baisse le volume*\n:red_circle: **${prefix}music quitte** ---*Pour que le bot quitte votre salon*`)
      .addField(`:large_orange_diamond:  ${prefix}afk`, `:large_blue_circle: ${prefix}afk [Message] ---*Pour vous mettre AFK*`) 
      .addField(`:large_orange_diamond:  ${prefix}info`, `:large_blue_circle: ${prefix}info [Mention] ---*Pour voir les informations d un utilisateur*`)
      .addField(`:large_orange_diamond:  ${prefix}stats`, `:large_blue_circle: ${prefix}stats ---*Pour voir les stats du Bot*`)
      .addField(`:large_orange_diamond:  ${prefix}id`, `:large_blue_circle: ${prefix}id ---*Pour voir l'id d'un utilisateur*`)
      .addField(`:large_orange_diamond:  ${prefix}troll`, `:large_blue_circle: ${prefix}troll ---*Pour afficher une image TROLL*`)
      .addField(`:large_orange_diamond:  ${prefix}form`, `:large_blue_circle: ${prefix}form ---*Affiche une aide à la mise en forme de texte*`)
      .addField(`:large_orange_diamond:  ${prefix}caracteres`, `:large_blue_circle: ${prefix}caracteres ---*Affiche une liste de caracteres speciaux*`)
      .addField(`:large_orange_diamond:  ${prefix}codbox`, `:large_blue_circle: ${prefix}codbox ---*Affiche une aide à la mise en forme de codbox*`)
      .addField(`:large_orange_diamond:  ${prefix}server`, `:large_blue_circle: ${prefix}server ---*Pour voir les infos du serveur actuel*`)
      .addField(`:large_orange_diamond:  ${prefix}debug`, `:large_blue_circle: ${prefix}debug ---*Pour voir les informations sur l'hebergeur du Bot*`)
      .addField(`:large_orange_diamond:  ${prefix}track`, `:large_blue_circle: ${prefix}track ---*Vous affiche toute les adresses IP d'un site internet*`)
      .addField(`:large_orange_diamond:  ${prefix}avatar`, `:large_blue_circle: ${prefix}avatar ---*Vous affiche L'avatar de l'utilisateur mentionné*`)
      .addField(`:large_orange_diamond:  ${prefix}gta`, `:large_blue_circle: ${prefix}gta ---*PKG GTA5 [ Update 99% No Freeze ]*`)
      .addField(`:large_orange_diamond:  ${prefix}Ping`, `:large_blue_circle:  ${prefix}ping ---*Vous donne le temps en miliseconde de la reception du pong*`)
      .addField(`:large_orange_diamond:  ${prefix}spacebot`, `:large_blue_circle:  ${prefix}spacebot ---*Le Bot vous envoi une invitation*`)
      .addField(":diamonds: PANEL MODERATION", `:scream:  ${prefix}admin ---*Pour ouvrir le panel de modération*`)
      message.channel.sendEmbed(help_embed);
      
      console.log(`${message.author.username} sur ${message.guild.name} salon ${message.channel.name} :  A ouvert la fonction ${(chalk.green('[ AIDE ]'))}\n--------------------------------------`); 
     
////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////[ COMMANDE AIDE-EMBED ]///////////////////////////////////////////
      
      } if (message.content === `${prefix}aide embed`){
     var help_embed = new Discord.RichEmbed()
      .setColor('#FFFFFF')
      .addField(":trident: [ AIDE EMBED] :trident:","--------------------------------")
      .addField(`Pour afficher une aide veuillez taper [ ${prefix}aide ]`, `Ou **${prefix}aide** [command] *Exemple de commandes* : || [music] || [ban] || [kick] || [supr]\n\n--------------------------------`)
      .addField(`:white_large_square: ${prefix} [Message]`, `:black_small_square: ${prefix} [Message] ---*Pour afficher vos messages dans un Embed*`)
      .addField(`:white_large_square: ${prefix}| [Message]`, `:black_small_square: ${prefix}| [Message] ---*Lancer un vote*`)
      .addField(`:white_large_square: ${prefix}/ [Message]`, `:black_small_square: ${prefix}/ [Message] ---*Lancer un vote ANONYME*`)
      message.channel.sendEmbed(help_embed);
      
      console.log(`${message.author.username} sur ${message.guild.name} salon ${message.channel.name} :  A ouvert la fonction ${(chalk.green('[ AIDE-EMBED ]'))}\n--------------------------------------`); 
      
    
////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////[ COMMANDE AIDE-MUSIC ]///////////////////////////////////////////
        
  } if (message.content === `${prefix}aide music`){
    var help_embed = new Discord.RichEmbed()
     .setColor('#FFFFFF')
     .addField(":trident: [ AIDE MUSIC ] :trident:","--------------------------------")
     .addField(`:white_large_square: Les commandes [ ${prefix}music ]`, `:black_small_square: **${prefix}music play [Titre musique / url]** ---*Pour mettre votre musique en playlist*\n:black_small_square: **${prefix}music start** ---*Pour que le bot rejoigne votre salon*\n:black_small_square: **${prefix}music next** ---*Passer à la musique suivante*\n:black_small_square: **${prefix}music pause** ---*Met la musique en pause*\n:black_small_square: **${prefix}music reprendre** ---*Reprendre la musique*\n:black_small_square: **${prefix}music queue** ---*Affiche la file d'attente*\n:black_small_square: **${prefix}music purge** ---*Purge la file d'attente*\n:black_small_square: **${prefix}music np** ---*Affiche la musique en cours*\n:black_small_square: **${prefix}music vol [ entre 0 et 100 ]** ---*Monte et baisse le volume*\n:black_small_square: **${prefix}music quitte** ---*Pour que le bot quitte votre salon*`)
     message.channel.sendEmbed(help_embed);
     
     console.log(`${message.author.username} sur ${message.guild.name} salon ${message.channel.name} :  A ouvert la fonction ${(chalk.green('[ AIDE-MUSIC ]'))}\n--------------------------------------`); 
     
   
////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////[ COMMANDE ADMIN ]////////////////////////////////////////////
    
    } if (message.content === `${prefix}admin`){
      if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.sendMessage("Vous n'avez pas la permission **ADMIN** !!");
      var help_embed = new Discord.RichEmbed()
       .setColor('#FF0000')
       .addField(":trident: [ AIDE ADMINISTRATION ] :trident:","--------------------------------")
       .addField(`Pour afficher une aide veuillez taper [ ${prefix}aide ]`, `Ou **${prefix}aide** [command] *Exemple de commandes* : || [music] || [ban] || [kick] || [supr]\n\n--------------------------------`)
       .addField(":wrench: changelog :wrench: ", `:white_small_square: ${prefix}changelog ---*Pour voir les dernieres mises a jour*\n----------------------`)
       .addField(":diamonds: warn", `:small_orange_diamond: ${prefix}warn [Mention] [Raison] ---*Pour [ Warn ] des utilisateurs*\n----------------------`)
       .addField(":diamonds: lock", `:small_orange_diamond: ${prefix}lock [s/m/h] ---*Pour [ Vérrouiller ] un salon*\n----------------------`)
       .addField(":diamonds: supr", `:small_orange_diamond: ${prefix}supr [Nombre] ---*Pour supprimer les derniers messages selon le nombre*\n----------------------`)
       .addField(":diamonds: kick", `:small_orange_diamond: ${prefix}kick [Mention] [Raison] ---*Pour kick un membre du serveur*\n----------------------`)
       .addField(":diamonds: ban", `:small_orange_diamond: ${prefix}ban [Mention] ---*Pour bannir un membre du serveur*\n----------------------`)
       //.addField(":diamonds: mute", `:small_orange_diamond: !mute [Mention] [durée en minutes] [raison] ---*Pour mute un membre*")
       message.channel.sendEmbed(help_embed);
       
       
       console.log(`${message.author.username} sur ${message.guild.name} salon ${message.channel.name} : A ouvert la fonction ${(chalk.green('[ Admin aide ]'))}\n--------------------------------------`);
         
////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////[ COMMANDE AIDE-BAN ]///////////////////////////////////////////// 
      
    } if (message.content === `${prefix}aide ban`){
      if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.sendMessage("Vous n'avez pas la permission **BAN** !!");
      var help_embed = new Discord.RichEmbed()
       .setColor('#FF0000')
       .addField(":trident: [ AIDE BAN ] :trident: ","--------------------------------")
       .addField(":diamonds: Ban commande", `:small_orange_diamond: ${prefix}ban [Mention] [Raison] ---*Pour bannir un membre du serveur*`)
       message.channel.sendEmbed(help_embed);
       
       
       console.log(`${message.author.username} sur ${message.guild.name} salon ${message.channel.name} : A ouvert la fonction ${(chalk.green('[ AIDE-BAN]'))}\n--------------------------------------`);
     
    
////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////[ COMMANDE AIDE-KICK ]////////////////////////////////////////////
      
    } if (message.content === `${prefix}aide kick`){
      if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.sendMessage("Vous n'avez pas la permission **KICK** !!");
      var help_embed = new Discord.RichEmbed()
       .setColor('#FF0000')
       .addField(":globe_with_meridians:->[ AIDE KICK ]<-:globe_with_meridians: ","--------------------------------")
       .addField(":diamonds: Kick commande", `:small_orange_diamond: ${prefix}kick [Mention] [Raison] ---*Pour kick un membre du serveur*`)
       .setFooter("© By LarchitecT","https://s2.postimg.org/uyxeqnfrd/crew.png")
       message.channel.sendEmbed(help_embed);
       
       
       console.log(`${message.author.username} sur ${message.guild.name} salon ${message.channel.name} : A ouvert la fonction ${(chalk.green('[ AIDE-KICK ]'))}\n--------------------------------------`);
     
    
////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////[ COMMANDE AIDE-SUPR ]////////////////////////////////////////////
      
    } if (message.content === `${prefix}aide supr`){
      if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.sendMessage("Vous n'avez pas la permission **MANAGE_MESSAGES** !!");
      var help_embed = new Discord.RichEmbed()
       .setColor('#FF0000')
       .addField(":globe_with_meridians:->[ AIDE SUPR ]<-:globe_with_meridians: ","--------------------------------")
       .addField(":diamonds: Supr commande", `:small_orange_diamond: ${prefix}supr [Nombre] <500 Max> ---*Pour supr des messages*`)
       .setFooter("© By LarchitecT","https://s2.postimg.org/uyxeqnfrd/crew.png")
       message.channel.sendEmbed(help_embed);
       
       
       console.log(`${message.author.username} sur ${message.guild.name} salon ${message.channel.name} : A ouvert la fonction ${(chalk.green('[ AIDE-SUPR ]'))}\n--------------------------------------`);
     
    
////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////[ COMMANDE CHANGELOG ]////////////////////////////////////////////
      
    } if (message.content === `${prefix}changelog`){
      var help_embed = new Discord.RichEmbed()
       .setColor('#4fbcd7')
       .addField(`:trident: [ CHANGELOG ] :trident:`,`Effectuer le 13/01/2018\n\n--------------------------------`)
       .addField(`Pour afficher une aide veuillez taper [ ${prefix}aide ]`, `Ou **${prefix}aide** [command] *Exemple de commandes* : || [music] || [ban] || [kick] || [supr]\n\n--------------------------------`)
       .addField(`:large_orange_diamond: ${prefix} [Message]`, `:small_blue_diamond: ${prefix} [Message] ---*Pour afficher vos messages dans un Embed*`)
       .addField(`:large_orange_diamond: ${prefix}${prefix} [Message]`, `:small_blue_diamond: ${prefix}${prefix} [Message] ---*Lancer un vote*`)
       .addField(`:large_orange_diamond: ${prefix}/ [Message]`, `:small_blue_diamond: ${prefix}/ [Message] ---*Lancer un vote ANONYME*`)
       .addField(`:large_orange_diamond: ${prefix}xp`, `:small_blue_diamond: ${prefix}xp ---*Pour afficher votre score d'utilisation de NANO-BOT*`)
       .addField(`:large_orange_diamond: ${prefix}form`, `:small_blue_diamond: ${prefix}form ---*Affiche une aide à la mise en forme de texte*`)
       .addField(`:large_orange_diamond: ${prefix}codbox`, `:small_blue_diamond: ${prefix}codbox ---*Affiche une aide à la mise en forme de codbox*`)
       .addField(`:large_orange_diamond: ${prefix}gol`, `:small_blue_diamond: ${prefix}gol ---*Envoyer un IP Logger*`)
       .addField(`:large_orange_diamond: ${prefix}cod`, `:small_blue_diamond: ${prefix}cod ---*Le code d'acces a votre IP Logger*`)
       .addField(`:large_orange_diamond: ${prefix}track`, `:small_blue_diamond: ${prefix}track ---*Vous afficher toute les adresses IP d'un site internet*`)
       .addField(`:large_orange_diamond: ${prefix}color`, `:small_blue_diamond: ${prefix}color ---*Un selecteur de couleurs HTML*`)
       .addField(`:large_orange_diamond: ${prefix}warn`, `:small_blue_diamond: ${prefix}warn ---*WARN un utilisateur*`)
       .addField(`:large_orange_diamond: ${prefix}lock`, `:small_blue_diamond: ${prefix}lock ---*VERROUILLER un salon*`)
       message.channel.sendEmbed(help_embed);
       
       
       console.log(`${message.author.username} sur ${message.guild.name} salon ${message.channel.name} : A ouvert la fonction ${(chalk.green('[ CHANGELOG ]'))}\n--------------------------------------`);  
     
////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////[ COMMANDE FORM-TEXT ]////////////////////////////////////////////
      
    } if (message.content === `${prefix}form`){
      var help_embed = new Discord.RichEmbed()
       .setColor('#0026FF')
       .addField(":trident: [ TEXTE FORM ] :trident:", "----------------------------------")
       .addField("`*italique*`","Ex : *italique*\n-----------------------")
       .addField("`**gras**`", "Ex : **gras**\n-----------------------")
       .addField("`***italique gras***`", "Ex : ***italique gras***\n-----------------------")
       .addField("`~~barre~~`", "Ex : ~~barre~~\n-----------------------")
       .addField("`__souligne__`", "Ex : __souligne__\n-----------------------")
       .addField("`__*italique souligne*__`", "Ex : __*italique souligne*__\n-----------------------")
       .addField("`__**gras souligne**__`", "Ex : __**gras souligne**__\n-----------------------")
       .addField("`__***italique gras souligne***__`", "Ex : __***italique gras souligne***__\n-----------------------")
       message.channel.sendEmbed(help_embed);
       console.log(`${message.author.username} sur ${message.guild.name} salon ${message.channel.name} : A ouvert la fonction ${(chalk.green('[ Form ]'))}\n--------------------------------------`);
      
////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////[ COMMANDE CODBOX ]///////////////////////////////////////////////
      
    } if (message.content === `${prefix}codbox`){
       var help_embed = new Discord.RichEmbed()
       .setColor('#5B74FF')
       .addField(":trident: [ COD-BOX ] :trident:","--------------------------------")
       .addField("[ ↵ ]  Signifie un retour à la ligne", "--------------------------------")
       .addField("` ` 00 TEST [ENVELOPPE DE BASE] ` `", "`# 00 TEST [ENVELOPPE DE BASE]`\n--------------------------------")
       .addField("` ```Markdown [ ↵ ] # 01 TEST [MARKDOWN] [ ↵ ]``` `", "```Markdown\n# 01 TEST [MARKDOWN]\n{Inserer un # pour afficher le bleu}\n```\n--------------------------------")
       .addField("` ```css [ ↵ ] # 02 TEST [CSS] [ ↵ ]``` `", "```css\n# 02 TEST [CSS]\n{Entre accolades & Deriere 2 points = jaune:}\n```\n--------------------------------")
       .addField("` ```js [ ↵ ] # 03 TEST [JS] [ ↵ ]``` `", "```js\n# 03 TEST [JS]\n{Le JS affiche les nombres 03 & les balises if en vert}\n```\n--------------------------------")
       .setFooter("© Aides Form & Box By LarchitecT","https://s2.postimg.org/uyxeqnfrd/crew.png")
       message.channel.sendEmbed(help_embed);
       
       console.log(`${message.author.username} sur ${message.guild.name} salon ${message.channel.name} : A ouvert la fonction ${(chalk.green('[ CodBox ]'))}\n--------------------------------------`);  
       
     
////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////[ COMMANDE IMAGE TROLL ]//////////////////////////////////////////
      
    } if (message.content === `${prefix}troll`){
      message.delete().catch(O_o=>{}); 
      var help_embed = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setImage("https://i.imgur.com/gjv5CaH.gif")
      .setFooter(`© By ${message.author.username}`,`${message.author.avatarURL}`)
      message.channel.sendEmbed(help_embed);
      
      console.log(`${message.author.username} sur ${message.guild.name} salon ${message.channel.name} : A ouvert la fonction ${(chalk.green('[ TROLL ]'))}\n--------------------------------------`);  
      
    
////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////[ COMMANDE INFO-SERVER ]//////////////////////////////////////////
    
    } if (message.content === `${prefix}server`){
      const data = client.channels.get(message.channel.id);
      var help_embed = new Discord.RichEmbed()
       .setColor('#DA0007')
       .addField(`:trident: [ SERVER STATS ] :trident:`, "----------------------------------")
       .addField("Nom du server:", `${data.guild}`, true)
       .addField("Nom du channel:", `${data.name}`, true)
       .addField("Nombre de membre:", `${message.guild.memberCount}`, true)
       .addField("Nombre de channel:", `${message.guild.channels.size}`, true)  
       .addField("Server id:", `${message.guild.id}`, true)
       .addField("Channel id:", `${data.id}`, true)
       .addField("Roles:", `${message.guild.roles.size}`, true)
       .setThumbnail(`${message.guild.iconURL}`)
       message.channel.sendEmbed(help_embed);
       
       console.log(`${message.author.username} sur ${message.guild.name} salon ${message.channel.name} : A ouvert la fonction ${(chalk.green('[ InfoServer ]'))}\n--------------------------------------`);  
    } 
      
////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////[ COMMANDE STATS BOT ]////////////////////////////////////////////
      
     if (message.content === (`${prefix}stats`)){
        var help_embed = new Discord.RichEmbed()
        .setColor('#DA0007')
        .addField(":grin:  [ STATS ] :grin: ", "--------------------------")
        .addField("Developpeuse","|-> YELENA<-|", true)
        .addField("Le préfix actuelle est:", `${prefix}`, true )
        .addField("Nombre d'utilisateurs:", + `${client.users.size} `, true )
        .addField("Nombre de servers:", + `${client.guilds.size} `, true )
        .addField("Nombre de salon:", + `${client.channels.size} `, true )
        .addField("Lien d'invitation Bot:", "https://discordapp.com/oauth2/authorize?client_id=449897791955927040&scope=bot&permissions=2146958591", true )
        message.channel.sendEmbed(help_embed);
        
        
        console.log(`${message.author.username} sur ${message.guild.name} salon ${message.channel.name} : ${(chalk.green('\u2713'))} A ouvert la fonction [ Stats ]\n--------------------------------------`);  

////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////[ COMMANDE INVATATION BOT ]///////////////////////////////////////
       
    } if (message.content === (`${prefix}spacebot`)){
      var help_embed = new Discord.RichEmbed()
      .setColor('RANDOM')
      .addField("Si tu veux de moi dans ton Discord" , "Lien: https://discordapp.com/oauth2/authorize?client_id=449897791955927040&scope=bot&permissions=2146958591")
      message.channel.sendEmbed(help_embed);
      
      
      console.log(`${message.author.username} sur ${message.guild.name} salon ${message.channel.name} : ${(chalk.green('\u2713'))} A ouvert la fonction [ Invite Bot ]\n--------------------------------------`); 
  
////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////[ COMMANDE INVATATION BOT ]///////////////////////////////////////
      
    } if (message.content === (`${prefix}Spacebot`)){
      var help_embed = new Discord.RichEmbed()
      .setColor('RANDOM')
      .addField("Si tu veux de moi dans ton Discord" , "Lien: https://discordapp.com/oauth2/authorize?client_id=376118001579196421&scope=bot&permissions=2146958591")
      message.channel.sendEmbed(help_embed);
      
////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////[ COMMANDE INVATATION BOT ]///////////////////////////////////////
         
    } if(message.content.startsWith(config.prefix + `titre`)) {
      
let args = message.content.split ('/').slice(1);
      
const A = args[0];
const B = args[1];
const C = args[2];
const D = args[3];
const E = args[4];
const F = args[5];

      
message.guild.setName(`${A||"Bit"}`)
.then(msg => {
setTimeout(function() {
message.guild.setName(`${B||"Bitc"}`)
.then(msg => {
setTimeout(function() {
message.guild.setName(`${C||"Bitch"}`) 
.then(msg => {
setTimeout(function() {
message.guild.setName(`${D||"Bitch-"}`)
.then(msg => {
setTimeout(function() {
message.guild.setName(`${E||"Bitch-B"}`)
.then(msg => {
setTimeout(function() {
message.guild.setName(`${F||"Bitch-BO"}`)
.then(msg => {
setTimeout(function() {
message.guild.setName("Bitch-BOT") 
.then(msg => {
setTimeout(function() {
message.guild.setName("Bitch-BOT D")
.then(msg => {
setTimeout(function() {
message.guild.setName("Bitch-BOT Di")
.then(msg => {
setTimeout(function() {
message.guild.setName("Bitch-BOT Dis") 
.then(msg => {
setTimeout(function() {
message.guild.setName("Bitch-BOT Disc")
.then(msg => {
setTimeout(function() {
message.guild.setName("Bitch-BOT Disco")
.then(msg => {
setTimeout(function() {
message.guild.setName("Bitch-BOT Discor") 
.then(msg => {
setTimeout(function() {
message.guild.setName("Bitch-BOT Discord")
.then(msg => {
setTimeout(function() {
message.guild.setName("Bitch-BOT Discord O")
.then(msg => {
setTimeout(function() {
message.guild.setName("Bitch-BOT Discord OF")
.then(msg => {
setTimeout(function() {
message.guild.setName("Bitch-BOT Discord OFF") 
.then(msg => {
setTimeout(function() {
message.guild.setName("Bitch-BOT Discord OFFI")
.then(msg => {
setTimeout(function() {
message.guild.setName("Bitch-BOT Discord OFFIC")
.then(msg => {
setTimeout(function() {
message.guild.setName("Bitch-BOT Discord OFFICI")
.then(msg => {
setTimeout(function() {
message.guild.setName("Bitch-BOT Discord OFFICIE")
.then(msg => {
setTimeout(function() {
message.guild.setName("Bitch-BOT Discord OFFICIEL")
.then(msg => {
setTimeout(function() {

                                       
}, 1000);
});
}, 1000);
});
}, 1000);
})
}, 1000);
});
}, 1000);
});
}, 1000);
})
}, 1000);
});
}, 1000);
});
}, 1000);
});
}, 1000);
});
}, 1000);
});
}, 1000);
});
}, 1000);
})
}, 1000);
});
}, 1000);
});
}, 1000);
})
}, 1000);
});
}, 1000);
});
}, 1000);
});
}, 1000);
});
}, 1000);
});
}, 1000);
})
        .catch(console.error);
  //message.delete().catch(O_o=>{}); 
 
};
			//message.guild.setName("TEST "+ i + " TIMES");
      
        
	

 ///////////////////////////////////////////////////////////////////////////////////////////   
//////////////////////////[ COMMANDE INFO-USER ]////////////////////////////////////////////   
    
        if(message.content.startsWith(`${prefix}info`)) {
          var memberavatar = message.author.avatarURL
          var membername = message.author.username
             var mentionned = message.mentions.users.first();
            var getvalueof;
            if(mentionned){
                var getvalueof = mentionned;
            } else {
                var getvalueof = message.author;
            }
      
            if(getvalueof.bot == true){
                var checkbot = "L'utilisateur est un bot";
            } else {
                var checkbot = "N'est pas un bot";
            }
            if(getvalueof.presence.status == 'online'){
              var status = "En ligne"; 
            }else {
              var status = "Hors ligne";
            }
      
          message.channel.sendMessage({
              embed: {
                type: 'rich',
                description: '',
                fields: [{
                  name: ':bust_in_silhouette: Pseudo',
                  value: getvalueof.username,
                  inline: true
                }, {
                  name: ':shield: Id utilisateur',
                  value: getvalueof.id,
                  inline: true
                },{
                  name: ':biohazard: Discriminateur',
                  value: getvalueof.discriminator,
                  inline: true
      },{
                  name: ':globe_with_meridians: Status',
                  value: status,
                  inline: true
      },{
                  name: ':gear: Bot',
                  value: checkbot,
                  inline: true
      }],
              image: {
            url: getvalueof.avatarURL
              },
                color: 0xE46525,
                footer: {
                  text: 'By LarchitecT',
                  proxy_icon_url: ' '
                },
      
                author: {
                  name: membername,
                  icon_url: memberavatar,
                  proxy_icon_url: ' '
                }
              }
      });
    
    }  if(message.content.startsWith(`${prefix}avatar`)) {
          var memberavatar = message.author.avatarURL
          var membername = message.author.username
             var mentionned = message.mentions.users.first();
            var getvalueof;
            if(mentionned){
                var getvalueof = mentionned;
            } else {
                var getvalueof = message.author;
            }
      
            if(getvalueof.presence.status == 'online'){
              var status = "En ligne"; 
            }else {
              var status = "Hors ligne";
            }
      
          message.channel.sendMessage({
              embed: {
                type: 'rich',
                description: '',
                fields: [{
                  name: ':bust_in_silhouette: Pseudo',
                  value: getvalueof.username,
                  inline: true
                }, {
                  name: ':globe_with_meridians: Status',
                  value: status,
                  inline: true
      }],
              image: {
            url: getvalueof.avatarURL
              },
                color: 0xE46525,

      
                author: {
                  name: membername,
                  icon_url: memberavatar,
                  proxy_icon_url: ' '
                }
              }
      });
    console.log(`${message.author.username} sur ${message.guild.name} salon ${message.channel.name} : ${(chalk.green('\u2713'))} A ouvert la fonction [ AVATAR ]\n--------------------------------------`);
	
/////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////[ COMMANDE ID-USER ]///////////////////////////////////////////
      
    }if(message.content.startsWith(`${prefix}id`)) {
        
        var membername = message.author.username
           var mentionned = message.mentions.users.first();
          var getvalueof;
          if(mentionned){
              var getvalueof = mentionned;
          } else {
              var getvalueof = message.author;
          }
    
          if(getvalueof.bot == true){
              var checkbot = "L'utilisateur est un bot";
          } else {
              var checkbot = "N'est pas un bot";
          }
          if(getvalueof.presence.status == 'online'){
            var status = "En ligne"; 
          }else {
            var status = "Hors ligne";
          }
    
        message.channel.sendMessage({
            embed: {
              type: 'rich',
              description: '',
              fields: [{
                name: ':bust_in_silhouette: Pseudo',
                value: getvalueof.username,
                inline: true
              }, {
                name: `:shield: Id utilisateur`,
                value: getvalueof.id,
                inline: true
             
    }],
              color: 0xE46525,
              footer: {
                text: 'By LarchitecT',
                proxy_icon_url: ' '
              },
    
              author: {
                name: membername,
                icon_url: memberavatar,
                proxy_icon_url: ' '
              }
            }
    });
    
    
    console.log(`${message.author.username} sur ${message.guild.name} salon ${message.channel.name} : ${(chalk.green('\u2713'))} A ouvert la fonction [ ID ]\n--------------------------------------`);  
         
///////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////[ COMMANDE CHANGEMENT DE NOM-BOT ]///////////////////////////////     

    
    }  if(message.content.startsWith(`${prefix}botname`)){
      message.delete().catch(O_o=>{});
      if(message.author.id !== owner ) return message.channel.sendMessage("Vous n'avez pas la permission **RENAME_BOT** !!");
      client.user.setUsername(message.content.substr(9));
      
      
      
    
    }
    });
    
////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////[ UTILITAIRE EVALUATION]//////////////////////////////////////////                
    
                      function clean(text) {
                          if (typeof(text) === "string")
                              return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
                          else
                              return text;
                      }
    
    client.login(token)
    
    client.on('message', msg => {
      if (msg.author.bot || msg.channel.type != 'text')
          return; // Ne répondez pas aux messages des robots ou des messages qui ne proviennent pas des guildes.
    
      if (!msg.content.startsWith(config.prefix))
          return; //Pas une commande.
    
      let cmd = msg.content.split(/\s+/)[0].slice(config.prefix.length).toLowerCase();
      getCmdFunction(cmd)(msg);
    });
    
    client.on('error', (e) => console.error(e));
    client.on('warn', (e) => console.warn(e));
    // bot.on('debug', (e) => console.info(e));
    
    
////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////[ COMMANDE AFK ]//////////////////////////////////////////////////
    
      
       client.on('message', message => {

      
      
      const fs = require("fs");
      var msg = message;
      
      let afk = JSON.parse(fs.readFileSync("./afks.json", "utf8"));
      if (message.content.startsWith(prefix + "remafk")){
      if (afk[msg.author.id]) {
      delete afk[msg.author.id];
      if (msg.member.nickname === null) {
      msg.channel.send("```css\nJ'ai enlever votre [ AFK ] !! ```");
      }else{
      msg.channel.send("```css\nJ'ai enlever votre [ AFK ] !! ```");
      }
      fs.writeFile("./afks.json", JSON.stringify(afk), (err) => { if (err) console.error(err);});
      }else{
      msg.channel.send("```css\nErreur ! Tu es déjà AFK ```");
      }
      }
      
      
      if (msg.content.startsWith(prefix + "afk")||msg.content === prefix + "afk") {
      if (afk[msg.author.id]) {
      return message.channel.send("```css\nErreur ! Tu es déjà AFK ```");
      }else{
      let args1 = msg.content.split(" ").slice(1);
      if (args1.length === 0) {
      afk[msg.author.id] = {"reason" : true};
      msg.delete();
      msg.channel.send(`tu es désormais AFK, écrit **${prefix}remafk** pour enlever ton AFK`);
      }else{
      afk[msg.author.id] = {"reason" : args1.join(" ")};
      msg.delete();
      msg.channel.send(`tu es désormais AFK, écrit **${prefix}remafk** pour enlever ton AFK`);
      }
      fs.writeFile("./afks.json", JSON.stringify(afk), (err) => { if (err) console.error(err);});
      }
      }
          
          var mentionned = message.mentions.users.first();
      if(msg.mentions.users.size > 0) {
      if (afk[msg.mentions.users.first().id]) {
      if (afk[msg.mentions.users.first().id].reason === true) {
      message.channel.send(`**${mentionned.username}** est **AFK**: __*sans raison*__`);
      }else{
      message.channel.send(`**${mentionned.username}** est **AFK**: __*${afk[msg.mentions.users.first().id].reason}*__`);
      }
      }
      }

      });

////////////////////////////////////////////////////////////////////////////////////////////

function getCmdFunction(cmd) {
  const COMMANDS = {
      'choose': cmds.choose,
      'debug': cmds.debug,
      'supr': cmds.prune,
      'music': music.processCommand,
      'cles': cmds.cles,
      'next': cmds.next,
      'exemple_embed': cmds.exemple_embed,
      'exemple_perm': cmds.exemple_perm,

  }
  return COMMANDS[cmd] ? COMMANDS[cmd] : () => {};
}

////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////