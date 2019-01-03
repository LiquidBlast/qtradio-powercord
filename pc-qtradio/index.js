const Plugin  = require('powercord/Plugin');
const { get } = require('powercord/http');

module.exports = class qtradio extends Plugin {
  start() {
    powercord
      .pluginManager
      .get('pc-commands')
      .register(
        'toggle',
        'Toggles qtradio.moe playback',
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
          const np = await get('http://127.0.0.1:3939/nowPlaying');
          return {
            send: false,
            result: np.body.artist + ' - ' + np.body.title
          };
        }
      )
  }
};
