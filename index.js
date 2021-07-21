const Discord = require("discord.js")
const client = new Discord.Client({disableEveryone: false})
const fs = require('fs');
const ytdl = require('ytdl-core');

function generate_code() {
  let r = Math.random().toString(36).substring(7)
  console.log("random", r)
  return r
}

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on("message", async msg => {
      if (msg.author.bot) return;
      
      if( msg.content.includes("goodnight") ||  msg.content.includes("Goodnight") ){
        msg.reply("PJ, it's gonna be a long night...")
      }

      else if( msg.content.includes("discord") ||  msg.content.includes("Discord") ){
      
        const channel = client.channels.cache.get('161649952802471936');
        await channel.send(`${msg.author} says it's time for Discord ${client.emojis.cache.find(emoji => emoji.name === 'dogcard')} @everyone`);
        return;

      }

      else if (msg.content.includes("$code") ) {
        let code = generate_code();        
        const channel = client.channels.cache.get('867257295208710155');
        channel.send(`${msg.author}, the code is ${code}.`)
        return
      }

      else if (msg.content.includes("exposed")) {
        const streamOptions = { seek: 0, volume: 1 };

        const channel = client.channels.cache.get('161649952802471937')
        channel.join().then(connection => {
            console.log("joined channel");

            const stream = ytdl('https://www.youtube.com/watch?v=TP84QdaAHZU&ab_channel=BeTheAudio', { filter : 'audioonly' });

            const dispatcher = connection.play(stream, streamOptions);
 
        }).catch(err => console.log(err));

        // Leave voice channel after 9 seconds 
        setTimeout(function(){ 
          channel.leave();},9000);
        
      }
})

client.login(process.env.TOKEN)