const { MSICreator } = require('electron-wix-msi');
const path = require('path');

const APP_DIR = path.resolve(__dirname, './ProJet-win32-x64');
const OUT_DIR = path.resolve(__dirname, './windows_installer');

const APP_BANNER = path.resolve(__dirname, './img/banner.png');
const APP_BACKGROUND = path.resolve(__dirname, './img/background.png');

const msiCreator = new MSICreator({
  appDirectory: APP_DIR,
  outputDirectory: OUT_DIR,

  description: 'This is a demo application',
  exe: 'ProJet',
  name: 'ProJet',
  manufacturer: 'ProJet Inc.',
  version: '1.0.0',

  ui: {
    chooseDirectory: true,
    images: {
      banner: APP_BANNER,
      background: APP_BACKGROUND,
    }
  },
});

msiCreator.create().then(() => {
    msiCreator.compile();
})