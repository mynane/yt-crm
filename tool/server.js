/**
 * @file server.js
 * @author denglingbo
 */

var path = require('path');
var LocalServer = require('freed-spa/tool/server');

var ROOT_PATH = path.resolve(__dirname);

var host = 'localhost';

var proxyConfig = {
    port: 9999,
    rules: [
        {
            pattern: /https?:\/\/[\w\.]*(?::\d+)?\/.+\/(.+)/,
            responder: path.join(ROOT_PATH, '../mock/') + '$1.json'
        }
    ]
};

var devConfig = {
    host: host,
    port: 8899,
    proxy: {
        '/api': `http://${host}:${proxyConfig.port}`,
    }
};

LocalServer({
    proxyConfig: proxyConfig,
    devConfig: devConfig,
});