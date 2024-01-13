const { ActivityType } = require('discord.js');
const client = require('../index');
//fu-w github :)


client.on("ready", () => {

    var activities = [ `Sevgilerim size`, `I love you ❤`, `❤ furkibu and you!` ], i = 0;
   client.user.setStatus( "idle"),
    setInterval(() => client.user.setActivity({name : `${activities[i++ % activities.length]}` , type: ActivityType.Listening, url:"https://www.twitch.tv/sanctusfurki"}), 22000);
  console.log(`${client.user.username} Başarıyla giriş yaptı!`)
});
