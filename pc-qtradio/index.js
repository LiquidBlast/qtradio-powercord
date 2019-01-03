const Plugin   = require('powercord/Plugin');
const { get }  = require('powercord/http');

module.exports = class qtradio extends Plugin {
  start () {
    powercord
      .pluginManager
      .get('pc-commands')
      .register(
        'qttoggle',
        'Toggles qtradio.moe playback',
        'qttoggle',
        async () => {
          return await get('http://127.0.0.1:3939/togglePlayback');
        }
      );
  }
};
