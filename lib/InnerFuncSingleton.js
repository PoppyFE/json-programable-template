'use strict';

const {funcParamSymbol} = require('./config/symbol.config.js');
const innerFuncDispatch = require('./InnerFunctonDispatch.js');
const {staticJsonModel} = require('./data/staticData');
const UtilSingleton = require('./UtilSingleton.js');
let index = null;
/**
 * 内部方法和外部方法分发
 */
class InnerFuncSingleton {

    /**
     * 构造函数
     * @param cb 传入得外部自定义方法
     */
    constructor(cb){
        this.cb = cb;
        this.instance = null;
    }

    static getInstance(cb) {
        if (this.instance === undefined) {
            this.instance = new InnerFuncSingleton(cb);
        }
        return this.instance;
    }

    /**
     * 分发到内部函数或外部函数处理
     *
     * @param originalValue 当前的值
     * @param funcName 要调用的方法名
     * @param value 参数
     * @returns {*} 方法处理过的originalValue
     */
    getResult(originalValue,funcName,value){
        let _value = "";
        // 根据参数分割符对参数进行分割
        if(value !== undefined){
            _value = value.split(funcParamSymbol);

            //查看是否是json变量参数
            if(
                staticJsonModel.length > 0
            ){
                //遍历单个方法下，即将传入的参数
                for(let i = 0,length = _value.length; i < length; i++){
                    if(_value[i].startsWith('"')
                    &&_value[i].endsWith('"')){
                        const _temp = _value[i].replace(/"/g,"");
                        const _jsonValue = staticJsonModel[0][_temp];
                        if(_jsonValue === undefined){
                            throw new Error("The variable " + _jsonValue + " is undefined in modelJson" );
                        }
                        _value[i] = _jsonValue;
                    }
                }
            }
        }

        // 替换参数的'~'为前值
        if(_value instanceof Array){
            _value = _value.map((val,key)=>{
                if(val === "~"){
                    return originalValue;
                }else{
                    return val;
                }
            });
        }

        if( // 分发到外部函数
            this.cb!== null
            && this.cb[funcName] !== undefined
        ){
            if(staticJsonModel.length > 0){
                return this.cb[funcName](..._value, staticJsonModel[0]);
            }else{
                return this.cb[funcName](..._value);
            }
        } else {
            // 分发到内部函数
            let _funcName = funcName.toLowerCase();
            index = require('./index/functionIndex');
            if(index[_funcName] === undefined){
                throw new Error("Function "  + _funcName + " is not found in function index page");
            }
            return innerFuncDispatch(_funcName,_value);
        }
    }
}

module.exports = InnerFuncSingleton;