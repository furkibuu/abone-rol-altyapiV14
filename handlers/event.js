const fs = require('fs');
const path = require("path")
var AsciiTable = require('ascii-table')
var table = new AsciiTable()
table.setHeading('Etkinlik', 'Durumu').setBorder('|', '=', "0", "0")

module.exports = (client) => {
    fs.readdirSync('./events/').filter((file) => file.endsWith('.js')).forEach((event) => {
      	require(`../events/${event}`);
	table.addRow(event.split('.js')[0], '👀')
    })
	
	console.log(table.toString())
};