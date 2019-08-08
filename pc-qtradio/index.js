const { get }    = require('powercord/http');
const { Plugin } = require('powercord/entities');

module.exports = class qtradio extends Plugin {
    startPlugin() {
      this.registerCommand(
          'toggle',
		  [],
          'Toggle qtradio.moe playback',
          '{c}',
          async () => await get('http://127.0.0.1:3939/togglePlayback')
        )

      powercord
        this.registerCommand(
          'qvolume', //needs to be changes as "volume" command is already used by spotify modal.
		  [],
          'Change qtradio.moe volume',
          '{c} <number between 1-100>',
          async (args) => await get(`http://127.0.0.1:3939/changeVolume?input=${args}`)
        )

      powercord
        this.registerCommand(
          'np',
		  [],
          'Gives you currently playing qtradio.moe song',
          '{c}',
          async () => {
            const np = await get('https://qtradio.moe/stats');
            let data = np.body.icestats.source[0];
            if (data === undefined) data = np.body.icestats.source;
            return {
              send: false,
              result: data.artist + ' - ' + data.title
            };
          }
        )
    }
};