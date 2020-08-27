const imageDownloader = require('image-downloader');
const fs = require('fs');
const fsPromises = fs.promises;
const request = require('request');
let downloadPath = './downloads/';

const saveFile = async (url) => {
    let res = '';
    if (/jpe?g|png|gif|webp/.test(url)) {
        res = await saveImage(url);
    } else {
        res = await saveVideo(url);
    }

    return new Promise(function (resolve, reject) {
        resolve(res);
    });
};

const saveVideo = async (url) => {
    let fileName = url.match(/\/([0-9a-zA-Z_\.]+)\?/)[1];
    let dest = `${downloadPath}${fileName}`;

    try {
        if (fs.existsSync(downloadPath) != true) {
            await fsPromises.mkdir(downloadPath, { recursive: true });
        }
        if (fs.existsSync(dest) == true) {
            console.log(`[LOG] Video Already Exists`);
            return new Promise(function (resolve, reject) {
                resolve(dest);
            });
        }
        let res = await downloadVideo(url, dest);
        return new Promise(function (resolve, reject) {
            resolve(res);
        });
    } catch (err) {
        console.log("[ERROR]: ", err);
    }
};

const saveImage = async (url) => {
    let fileName = url.match(/\/([0-9a-zA-Z_\.]+)[\?|:]/)[1];
    console.log(fileName);
    let dest = `${downloadPath}${fileName}`;

    try {
        if (fs.existsSync(downloadPath) != true) {
            await fsPromises.mkdir(downloadPath, { recursive: true });
        }
        if (fs.existsSync(dest) == true) {
            console.log(`[LOG] Image Already Exists`);
            return new Promise(function (resolve, reject) {
                resolve(dest);
            });
        }
        let res = await downloadImg(url, dest);
        return new Promise(function (resolve, reject) {
            resolve(res);
        });
    } catch (err) {
        console.log("[ERROR]: ", err);
    }
};

const downloadImg = async (url, filepath) => {
    try {
        const options = {
            url: url,
            dest: filepath
        };
        await imageDownloader.image(options);
        return new Promise(function (resolve, reject) {
            resolve(filepath);
        });
    } catch (e) {
        console.error(e);
    }
};

const downloadVideo = async (url, filepath) => {
    try {
        return new Promise((resolve, reject) => {
            const file = fs.createWriteStream(filepath);
            const sendReq = request.get(url);

            sendReq.on('response', (response) => {
                if (response.statusCode !== 200) {
                    reject(`Response status was ${response.statusCode}`);
                }

                sendReq.pipe(file);
            });

            file.on('finish', () => {
                resolve(filepath);
            });

            sendReq.on('error', (err) => {
                fs.unlink(dest);
                reject(err.message);
            });

            file.on('error', (err) => {
                fs.unlink(dest);
                reject(err.message);
            });
        });
    } catch (e) {
        console.error(e);
    }
};

module.exports = {
    saveFile: saveFile
};