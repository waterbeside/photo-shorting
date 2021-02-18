const { get } = require('http');

/** 轮询监听 vite 启动 */
function waitOn(arg0) {
  return new Promise((resolve) => {
    const { port, interval = 149 } = arg0;
    let counter = 0;
    const timer = setInterval(() => {
      get(`http://localhost:${port}`, (res) => {
        console.log(port);
        clearInterval(timer);
        // console.log('[waitOn]', res.statusCode, res.statusMessage);
        resolve(res.statusCode);
      }).on('error', (err) => {
        console.log(err);
        console.log('[waitOn]', `counter:${counter++}`);
      });
    }, interval);
  });
}

module.exports = {
  waitOn
};
