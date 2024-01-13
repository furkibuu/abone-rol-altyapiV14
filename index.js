const { GatewayIntentBits , Client , Collection} = require("discord.js");
const fs = require('fs');
const { Token } = require("./config");
const IncludedIntents = Object.entries(GatewayIntentBits).reduce((t, [, V]) => t | V, 0);

const client = new Client({ intents: IncludedIntents});


client.login(Token).then(console.log("Token Doğru")).catch(()=> {console.log("Token Hatalı")})

client.commands = new Collection()
client.aliases = new Collection()

module.exports = client;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
fs.readdirSync('./handlers').forEach((handler) => {
    require(`./handlers/${handler}`)(client)
  });

  process.on("unhandledRejection", (err) => {
    console.log(err); 
      });
  process.on("uncaughtException", (err) => {
  console.log(err)
  });

  //fu-w github :)