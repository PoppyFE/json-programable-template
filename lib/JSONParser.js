'use strict';

const InnerFunc = require('./InnerFunc.js');
const {funcSymbol,recursionSymbol,defaultOriginValue} = require('./config/symbol.config.js');

/**
 * 此类用于解析传入的 Json 的 value,
 */
class JSONParser {

    /**
     * func: 用户传入的外部方法
     */
    constructor(func,jsonModel) {
        this.func = func;
        this.jsonModel = jsonModel;
    }

    /**
     * 根据管道符号对value进行分割
     *
     * @param value JSON格式的值
     * @returns {*}
     */
    parsePipe(value){
        let _arr = value.split(recursionSymbol);
        return this._recursionPipesSplit(_arr, 0, _arr.length - 1, defaultOriginValue);
    }

    /**
     * 递归通道
     * @param arr 被管道符号分割出的数组
     * @param currDepth 当前深度，初始0
     * @param maxDepth 递归的最大深度，默认arr的长度
     * @param returnValue 递归传递和返回的值
     * @returns {*}
     * @private
     */
    _recursionPipesSplit(arr, currDepth, maxDepth,returnValue){
        if(currDepth > maxDepth){
            return returnValue;
        }

        let _expValue = arr[currDepth].trim();
        returnValue = this._funcSplit(returnValue,_expValue);
        currDepth++;
        return this._recursionPipesSplit(arr,currDepth,maxDepth,returnValue);
    }

    /**
     * 分割管道内传递方法的方法名和值
     * @param originalValue 经过方法处理之后，返回的参数
     * @param arrValue 传入的方法名和参数
     * @returns {*} 处理过的originalValue
     * @private
     */
    _funcSplit(originalValue, arrValue){
        let arr = arrValue.split(funcSymbol);
        if(
            arr.length === 2
            || arr.length === 1){
            originalValue = new InnerFunc(this.func,this.jsonModel).getResult(originalValue,arr[0],arr[1]);
        }else if(arr.length > 2){
            throw new Error("function Split ERROR");
        }
        return originalValue;
    }
}

module.exports = JSONParser;
