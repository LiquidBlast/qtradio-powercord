const Plugin  = require('powercord/Plugin');
const { get } = require('powercord/http');

module.exports = class qtradio extends Plugin {
  start() {
    powercord
      .pluginManager
      .get('pc-commands')
      .register(
        'toggle',
        'Toggle qtradio.moe playback',
        'toggle',
        async () => {
          return await get('http://127.0.0.1:3939/togglePlayback');
        }
      )

    powercord
      .pluginManager
      .get('pc-commands')
      .register(
        'np',
        'Gives you currently playing qtradio song',
        'np',
        async () => {
          const np = await get('https://qtradio.moe/stats');
          let data                     = np.body.icestats.source[0];
          if (data === undefined) data = np.body.icestats.source;
          return {
            send: false,
            result: data.artist + ' - ' + data.title
          };
        }
      )
  }
};
