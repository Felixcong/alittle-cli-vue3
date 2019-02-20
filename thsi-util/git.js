/*
 * @Author: COCO 
 * @Date: 2018-11-08 12:18:13 
 * @Last Modified by: COCO
 * @Last Modified time: 2018-11-08 17:33:13
 * 自动git提交
 */
const shelljs = require('shelljs');
const colors = require('colors');
const application = shelljs.exec('cd ..');
application.exec('git add .');
const commitResult = application.exec('git commit -m "~ auto commit ~"');
if (commitResult.code !== 0) {
  console.log('~ 当前没有可提交的文件 ~'.red);
}
application.exec('git pull');
application.exec('git status');
// console.log(application.exec('git status'));
