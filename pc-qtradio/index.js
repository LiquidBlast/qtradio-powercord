const { get }    = require('powercord/http');
const { Plugin } = require('powercord/entities');

module.exports = class qtradio extends Plugin {
    startPlugin() {
		let decodeHTML = function (html) {
			let txt = document.createElement('textarea');
			txt.innerHTML = html;
			return txt.value;
		};
		
      this.registerCommand(
          'toggle',
		  [],
          'Toggle qtradio.moe playback',
          '{c}',
          async () => await get('http://127.0.0.1:3939/togglePlayback')
        )

        this.registerCommand(
          'qvolume', //needs to be changes as "volume" command is already used by spotify modal.
		  [],
          'Change qtradio.moe volume',
          '{c} <number between 1-100>',
          async (args) => await get(`http://127.0.0.1:3939/changeVolume?input=${args}`)
        )

        this.registerCommand(
          'np',
		  [],
          'Gives you currently playing qtradio.moe song',
          '{c}',
          async (args) => {
				const np = await get('https://qtradio.moe/stats');
				let data = np.body.icestats.source[1];
				let decoded = decodeHTML(data.title)
				if (args == "send") {
					return {
						send: true,
						result: decoded
					}
				}
				else {
					return {
						send: false,
						result: `Currently playing song is: "**${decoded}**".`
					};
				}
			}
        )
    }
};