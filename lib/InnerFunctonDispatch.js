'use strict';
const util = require('./util');
const funcIndex = require('./index/functionIndex.js');

/**
 * 遍历文件并分发到指定方法
 * @param funcName
 * @param args
 * @param originValue
 */
let innerFuncDeclare = (funcName, args) => {

    if(funcIndex[funcName] === undefined){
        throw new Error("Function "  + funcName + " is not found in function index page");
    }
    //加载文件
    let module = funcIndex[funcName];
    return module(args);

};

module.exports = innerFuncDeclare;