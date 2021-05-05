'use strict';

const Homey = require('homey');

class HeatitControlsApp extends Homey.App {
  async onInit() {
    this.log(`${Homey.manifest.id} has been initialized`);
  }
}

module.exports = HeatitControlsApp;