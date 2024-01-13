const client = require("..");
const { EmbedBuilder, Collection, PermissionsBitField, ButtonBuilder, ActionRowBuilder } = require('discord.js')
const { AboneYetkilisi, AboneRol, AboneRolKanalİsim} = require('../config');

client.on('messageCreate', async (message) => {

    if (message.author.bot || !message.attachments.size) return;
    if (message.channel.name !== AboneRolKanalİsim) return;
    const attachment = message.attachments.first()
if (!attachment || !attachment.contentType.startsWith('image')) return;

const mesajAtan = message.author;


const button1 = new ButtonBuilder()
.setCustomId("kabulEt")
.setLabel("Abone Rol Ver")
.setStyle(3)

const button2 = new ButtonBuilder()
    .setCustomId('reddet')
    .setLabel('Reddet')
    .setStyle(4);


    const row = new ActionRowBuilder().addComponents(button1, button2);

    const sentMessage = await message.reply({content: `Yetkili birazdan gelecektir ve işlemi tamalayacaktır. (<@&${AboneYetkilisi}>) \n (furkibu_ yapımıdır)`, components: [row]})


    const collector = sentMessage.createMessageComponentCollector({
        filter: (i) => i.isButton(),
        time: 300000, 
      });

      collector.on('collect', async (interaction) => {
        
        const kabulYetkilisiRol = AboneYetkilisi;
        const reddetYetkilisiRol = AboneYetkilisi;
    
        if (kabulYetkilisiRol && interaction.customId === 'kabulEt' && interaction.member.roles.cache.has(kabulYetkilisiRol)) {
          
          const aboneRol = AboneRol
          if (aboneRol) {
            const member = message.guild.members.cache.get(mesajAtan.id);
            await member.roles.add(aboneRol);
            sentMessage.edit({content:"> **Abone rolü verildi.**", components: []})
          } else {
            interaction.reply('Abone rolü bulunamadı. Lütfen sunucu sahibi ile iletişime geçin.');
          }
        } else if (reddetYetkilisiRol && interaction.customId === 'reddet' && interaction.member.roles.cache.has(reddetYetkilisiRol)) {
          sentMessage.edit({content:"> **Abone Rol İsteği Reddedildi.**", components: []})
        } else if (interaction.customId === 'uyar') {
          interaction.reply({content: '**İsteğiniz değerlendirilecek.**', ephemeral:true});
        } else {
          interaction.reply({content: '**Bu işlemi gerçekleştirmek için gerekli yetkilere sahip değilsiniz.**', ephemeral:true});
        }
      });
    
      collector.on('end', (collected, reason) => {
        
        sentMessage.edit({ content: `**Üzgünüz Yetkililer Geri Donüş Yapmadı!**`,components: [] }); 
      });


})

//fu-w github :)