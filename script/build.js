const { spawn } = require('child_process');
const { watch, rollup } = require('rollup');
const chalk = require('chalk');
const ora = require('ora');
const electron = require('electron');
const dotenv = require('dotenv');
const path = require('path');

const parseArgs = require('minimist');
const { main } = require('../package.json');
const options = require('./rollup.config');
const { waitOn } = require('./utils');

dotenv.config({ path: path.join(__dirname, '../.env') });

const argv = parseArgs(process.argv.slice(2));
const opt = options(argv.env);
const TAG = '[script/build.ts]';
const spinner = ora(`${TAG} Electron build...`);

if (argv.watch) {
  waitOn({ port: process.env.PORT }).then((msg) => {
    console.log(msg);
    const watcher = watch(opt);
    let child;
    watcher.on('change', (filename) => {
      const log = chalk.green(`change -- ${filename}`);
      console.log(TAG, log);
    });
    watcher.on('event', (ev) => {
      if (ev.code === 'END') {
        if (child) child.kill();
        child = spawn(electron, [path.join(__dirname, `../${main}`)], { stdio: 'inherit' });
      } else if (ev.code === 'ERROR') {
        console.log(ev.error);
      }
    });
  });
} else {
  spinner.start();
  rollup(opt)
    .then((build) => {
      spinner.stop();
      console.log(TAG, chalk.green('Electron build successed.'));
      build.write(opt.output);
    })
    .catch((error) => {
      spinner.stop();
      console.log(`\n${TAG} ${chalk.red('构建报错')}\n`, error, '\n');
    });
}
