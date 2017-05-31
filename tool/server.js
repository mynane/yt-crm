/**
 * @file server.js
 * @author denglingbo
 */

var path = require('path');
var LocalServer = require('freed-spa/tool/server');

var ROOT_PATH = path.resolve(__dirname);

const __TEST__ = process.env.NODE_ENV === 'test';

var host = '0.0.0.0';

// http://172.30.40.222:8080/fc-web/sys/user/sysLogin.htm?login=admin&password=123456

var rules = [];

// 联调环境
if (__TEST__) {
    rules = [{
        pattern: /https?:\/\/[\w\.]*(?::\d+)?\/(.+).htm(.+)/,
        responder: 'http://172.30.40.222:8080/$1.htm$2'
    }];
} else {
    rules = [{
        pattern: /https?:\/\/[\w\.]*(?::\d+)?\/.+\/(.+)/,
        responder: path.join(ROOT_PATH, '../mock/') + '$1.json'
    }];
}

var proxyConfig = {
    port: 9999,
    rules: rules
};

var devConfig = {
    host: host,
    port: 8899,
    proxy: {
        '/api': `http://${host}:${proxyConfig.port}`,
        '/fc-web': `http://${host}:${proxyConfig.port}`,
    }
};

LocalServer({
    proxyConfig: proxyConfig,
    devConfig: devConfig,
});