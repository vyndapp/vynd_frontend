/* eslint global-require: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 * @flow
 */
import { app, BrowserWindow, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import fs from 'fs-extra';
import { PythonShell } from 'python-shell';

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload))
  ).catch(console.log);
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  mainWindow = new BrowserWindow({
    show: false,
    width: 930,
    height: 600,
    minWidth: 750,
    minHeight: 400,
    titleBarStyle: 'hidden'
  });

  mainWindow.loadURL(`file://${__dirname}/app.html`);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.focus();

      retrieveVideos();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
});

var path = require('path');
const videosDirectoryPath = path.join(__dirname, 'videos')

function copyVideoFiles(videoPath) {
  try {
    if (!fs.existsSync(/*'path/foldername'*/)){
      fs.mkdirSync(/*'path/foldername'*/)
    }
  } catch (err) {
    console.error(err)
  }
  
  var copyFile = (file, dir2)=>{

      //gets file name and adds it to dir2
      var f = path.basename(file);
      var source = fs.createReadStream(file);
      var dest = fs.createWriteStream(path.resolve(dir2, f));
    
      source.pipe(dest);
      source.on('end', function() { console.log('Succesfully copied'); });
      source.on('error', function(err) { console.log(err); });
  };

  copyFile(videoPath, videosDirectoryPath);
}

ipcMain.on('videos:added', (event, videos) => {

  var videoArray = [];
  videos.forEach(function(video) {
    copyVideoFiles(video.path)
    videoArray.push(video.name)
  });

  retrieveVideos();

  videoArray.forEach(function(video) {
    extractFramesFromVideo(video)
  });

});

function extractFramesFromVideo(file) {
  
  const scriptPath = path.join(__dirname, 'scripts');
  const videoPath = path.join(__dirname, `videos/${file}`)
  const framesPath = path.join(__dirname, `frames/${file}`)

  let options = {
    mode: 'text',
    pythonPath: '/Library/Frameworks/Python.framework/Versions/3.6/bin/Python3',
    pythonOptions: ['-u'], // get print results in real-time
    scriptPath: scriptPath,
    args: [videoPath, framesPath]
  };

  // Grab files from videos directory, and execute Python script
  PythonShell.run('process.py', options, function (err, results) {
    if (err) throw err;
    // results is an array consisting of messages collected during execution
    console.log('results: %j', results);
  });
}

function retrieveVideos() {

  // passing directoryPath and callback function
  fs.readdir(videosDirectoryPath, function (err, videos) {
        
    //handling error
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }

    const framesPath = path.join(__dirname, 'frames');

    mainWindow.webContents.send('frames:path', framesPath);
    mainWindow.webContents.send('videos:path', videosDirectoryPath);
    mainWindow.webContents.send('videos:retrieved', videos);
  });

}