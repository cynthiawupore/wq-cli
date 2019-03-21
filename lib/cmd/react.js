'use strict'
// 操作命令行
const exec = require('child_process').exec;
const co = require('co');
const ora = require('ora');
const prompt = require('co-prompt');

const tip = require('../tip');

const spinner = ora('正在生成...');

const execRm = (err, projectName) => {
  spinner.stop();

  if (err) {
    console.log(err);
    tip.fail('请重新运行!');
    process.exit();
  }

  tip.suc('初始化完成！');
  tip.info(`cd ${projectName} && npm install`);
  process.exit();
};

const download = (err, projectName) => {
  if (err) {
    console.log(err);
    tip.fail('请重新运行!');
    process.exit();
  }
  // 删除 git 文件
  exec('cd ' + projectName + ' && rm -rf .git', (err, out) => {
    execRm(err, projectName);
  });
}

const resolve = (result) => {
  const { gitUrl, branch, projectName, } = result;
  // git命令，远程拉取项目并自定义项目名
  const cmdStr = `git clone ${gitUrl} ${projectName} && cd ${projectName} && git checkout ${branch}`;

  spinner.start();

  exec(cmdStr, (err) => {
    download(err, projectName);
  });
};

module.exports = () => {
  co(function *() {
    const gitUrl = 'https://github.com/cynthiawupore/wq-react.git';
    const branch = 'master';
    const projectName = yield prompt('projectName: ');
    const description = yield prompt('description:');

    return new Promise((resolve, reject) => {
      resolve({
        projectName,
        gitUrl,
        branch,
        description,
      });
    });
  }).then(resolve);
}
