'use strict';

// https://www.npmjs.com/package/commander
const program = require('commander');
const packageInfo = require('../../package.json');


program
  .version(packageInfo.version)

program
  .command('vue')
  .description('success')
  .action(() => {
    require('../cmd/vue')();
  });

program
  .command('react')
  .description('success')
  .action(() => {
    require('../cmd/react')();
  });

program.parse(process.argv);

if(!program.args.length){
  program.help()
}
