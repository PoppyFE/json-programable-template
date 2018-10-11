'use strict';

const {symbol} = require('./config/symbol.config.js');
const innerFuncDispatch = require('./InnerFunctonDispatch.js');

/**
 * 内部方法和外部方法分发
 */
class InnerFunc {
    /**
     * 构造函数
     * @param func 传入得外部自定义方法
     * @param jsonModel传入的值
     */
    constructor(func, jsonModel){
        this.func = func;
        this.jsonModel = jsonModel;
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
            _value = value.split(symbol.funcParam);

            //查看用户是否传入变量参数
            if(
                this.jsonModel.length > 0
            ){
                //遍历单个方法下，即将传入的参数
                for(let i = 0,length = _value.length; i < length; i++){
                    if(
                        _value[i].startsWith('"')
                        &&_value[i].endsWith('"')
                    ){
                        const _temp = _value[i].replace(/"/g,"");
                        const _jsonValue = this.jsonModel[_temp];
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
                if(val === symbol.prev){
                    return originalValue;
                }else{
                    return val;
                }
            });
        }

        if( // 分发到外部函数
            this.func!== null
            && this.func[funcName] !== undefined
        ){
            if(
                this.jsonModel === undefined
                ||this.jsonModel === null
            ){
                return this.func[funcName](..._value);
            }
            else{
                return this.func[funcName](..._value, this.jsonModel);
            }
        } else {
            // 分发到内部函数
            let _funcName = funcName.toLowerCase();
            return innerFuncDispatch(_funcName,_value);
        }
    }
}

module.exports = InnerFunc;