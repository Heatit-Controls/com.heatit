'use strict';

const { ZwaveDevice } = require('homey-zwavedriver');

class Z_Repeater extends ZwaveDevice {
  onNodeInit() {
    this.registerCapability('alarm_battery', 'BATTERY');
    this.registerCapability('measure_battery', 'BATTERY', {
      getOpts: {
        getOnStart: true,
      }
    });

    this.registerCapability('alarm_generic.power', 'NOTIFICATION', {
      get: 'NOTIFICATION_GET',
      getParser: () => ({
        'V1 Alarm Type': 0,
        'Notification Type': 'Power Management',
        Event: 3,
      }),
      report: 'NOTIFICATION_REPORT',
      reportParser: report => {
        if (!report || !report['Notification Status'] || !report['Notification Type']) return null;

        // this.log(report['Event (Parsed)']);
        if (report['Event (Parsed)'] === 'AC mains disconnected') {
          return true;
        }

        if (report['Event (Parsed)'] === 'AC mains reconnected') {
          return false;
        }
      },
      getOpts: {
        getOnStart: true,
      }
    });
  }
}

module.exports = Z_Repeater;
