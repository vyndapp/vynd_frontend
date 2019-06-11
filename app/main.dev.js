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
// import axios from './axios';
import axios from './axios';

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

//Creating Data Folders Structure
const createDataEnvironment = () => {
  fs.mkdirSync(path.join(__dirname, '/Data'));
  fs.mkdirSync(path.join(__dirname, '/Data/Videos'));
  fs.mkdirSync(path.join(__dirname, '/Data/Persons'));
};
 
// Checking For New User
if (fs.existsSync(path.join(__dirname, '/Data')) === false) {
  createDataEnvironment();
}

const videosDirectoryPath = path.join(__dirname, '/Data/Videos')

const copyVideo = (videoPath, videoId) => {
  fs.mkdirSync(path.join(__dirname, `Data/Videos/${videoId}`));
  const videoExt = path.extname(videoPath);
  fs.copyFileSync(
    videoPath,
    path.join(__dirname, `Data/Videos/${videoId}/Video${videoExt}`)
  );

  let videoIdAndExt = [videoId, videoExt];
  return videoIdAndExt;
};

async function getVideoId(videoPath) {
  const videoExt = path.extname(videoPath);
  const response = await axios({
    method: 'post',
    url: 'api/add-new-video',
    data: {
      extension: videoExt
    }
  });

  return response.data.video_id;
}

ipcMain.on('videos:added', async (event, videos) => {
  
  let getVideoIdAndExt = async video => {
    let videoId = await getVideoId(video.path);
    let videoIdAndExt = copyVideo(video.path, videoId);

    retrieveVideo(videoIdAndExt);

    return videoIdAndExt;
  };

  let videoIdAndExtArray = await Promise.all(videos.map(async video => getVideoIdAndExt(video)));

  videoIdAndExtArray.forEach(video => {
    extractFramesFromVideo(video)
  });

});

// let b64JsonArr = []
let base64Strings = []

function extractFramesFromVideo(videoIdAndExt) {
  
  const scriptPath = path.join(__dirname, 'scripts');
  const videoPath = path.join(__dirname, `/Data/Videos/${videoIdAndExt[0]}/Video${videoIdAndExt[1]}`)
  const imagePath = path.join(__dirname, `/Data/Videos/${videoIdAndExt[0]}`)
  base64Strings = []

  let options = {
    mode: 'text',
    pythonPath: '/Users/omarkhaled/Desktop/dev/vynd_frontend/env/bin/python',
    pythonOptions: ['-u'], // get print results in real-time
    scriptPath: scriptPath,
    args: [videoPath, imagePath]
  };

  // Grab files from videos directory, and execute Python script
  PythonShell.run('process.py', options, function (err, results) {
    if (err) throw err;

    // results is an array consisting of messages collected during execution
    // results.forEach(b64 => {
    //   b64JsonArr.push(JSON.parse(b64))
    // });

    results.forEach(b64 => {
      base64Strings.push(b64)
    });

    axios({
      method: 'post',
      url: 'api/process-keyframes',
      data: {
        video_id: videoIdAndExt[0],
        base64_images: base64Strings
      }
    }).then(response => {
      mainWindow.webContents.send('videos:processed');
    });
  })
}

function retrieveVideo(videoIdAndExt) {
  mainWindow.webContents.send('videos:retrieved', videoIdAndExt);
}