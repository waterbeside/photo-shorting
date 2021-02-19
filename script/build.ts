import { join } from 'path';
import { watch, rollup, OutputOptions } from 'rollup';
import minimist from 'minimist';
import chalk from 'chalk';
import ora from 'ora';
import waitOn from 'wait-on';
import dotenv from 'dotenv';
import options from './rollup.config';

import { server } from 'electron-connect';
const elServer = server.create({ stopOnClose: true });

dotenv.config({ path: join(__dirname, '../.env') });

const argv = minimist(process.argv.slice(2));
const opt = options(argv.env);
const TAG = '[script/build.ts]';
const spinner = ora(`${TAG} Electron build...`);

const watchFunc = function () {
  // once here, all resources are available
  const watcher = watch(opt);
  watcher.on('change', (filename) => {
    const log = chalk.green(`change -- ${filename}`);
    console.log(TAG, log);
  });
  watcher.on('event', (ev) => {
    if (ev.code === 'END') {
      // init-未启动、started-第一次启动、restarted-重新启动
      elServer.electronState === 'init' ? elServer.start() : elServer.restart();
    } else if (ev.code === 'ERROR') {
      console.log(ev.error);
    }
  });
};

const resource = `http://localhost:${process.env.PORT}/index.html`;

if (argv.watch) {
  waitOn(
    {
      resources: [resource],
      timeout: 5000
    },
    (err) => {
      if (err) {
        console.log(err);
        process.exit(1);
      }
      watchFunc();
    }
  );
} else {
  spinner.start();
  rollup(opt)
    .then((build) => {
      spinner.stop();
      console.log(TAG, chalk.green('Electron build successed.'));
      build.write(opt.output as OutputOptions);
    })
    .catch((error) => {
      spinner.stop();
      console.log(`\n${TAG} ${chalk.red('构建报错')}\n`, error, '\n');
    });
}
