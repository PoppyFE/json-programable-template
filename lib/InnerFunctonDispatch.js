'use strict';
const UtilSingleton = require('./UtilSingleton');
const {loadedModules} = require('./data/staticData');
let index = null;

/**
 * 遍历文件并分发到指定方法
 * @param funcName
 * @param args
 * @param originValue
 */

let innerFuncDeclare = (funcName, args, originValue) => {

    index = require('./index/functionIndex');
    let filename = index[funcName];
    let module = null;
    //如果没有加载文件
    if(
        loadedModules[filename] === undefined
    ){
        //加载文件
        module = UtilSingleton.getInstance().loadfuncFileByName(filename);
        loadedModules[filename] = module;
        return module[funcName](args,originValue);
    }
    //如果已经加载
    else{
        module = loadedModules[filename];
        return module[funcName](args,originValue);
    }
};

module.exports = innerFuncDeclare;