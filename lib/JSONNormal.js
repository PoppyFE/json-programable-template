'use strict';

const util = require('./util.js');
const JSONParser = require('../lib/JSONParser.js');
const {symbol} = require('./config/symbol.config');
/**
 * 类的入口文件
 */
class JSONNormal{

    /**
     * 实例化
     */
    constructor(undefined){
        util.isUndefined(undefined);
    }

    /**
     * 传入JSON导出Model
     * @param json
     * @param func: 用户传入的自定义外部方法
     * @param jsonModel: 部分需求不能使用动态值，需要根据变量动态引入值
     * @param opt:
     * @returns Object
     */
    execute(json = util.required(), func, jsonModel, opt){
        util.isCorrectJson(json);

        //rules
        const _rules = json.rules;
        const _validator = json.validator;
        const _keys = Object.keys(_rules);

        const jsonParser = new JSONParser(func,jsonModel);
        let _value = null;
        let _model = {};

        // opt
        this._opt(opt);

        // validator
        this._validator(_validator,jsonParser);

        //遍历传入JSON的所有value
        for(let i = 0,length = _keys.length; i<length; i++){
            _value = _rules[_keys[i]];
            //解析遍历到的value
            _model[_keys[i]] = jsonParser.parsePipe(_value);
        }
        return _model;
    }

    /**
     * 向下兼容
     * @param json
     * @param func
     * @param jsonModel
     * @param opt
     */
    parseJson(json = util.required(), func, jsonModel, opt){
        return this.execute(json, func, jsonModel, opt);
    }
    _opt(opt){
        if(opt){
            if(opt.symbol){
                let keys = Object.keys(opt.symbol);
                keys.map((value, key)=>{

                    if(symbol[value]){
                        symbol[value] = opt.symbol[value];
                    }
                });
            }
        }
    }

    _validator(_validator,jsonParser){
        if(_validator){
            for(let i = 0,length = _validator.length; i<length; i++){
                if(!jsonParser.parsePipe(_validator[i])){
                    return null;
                }
            }
        }
    }
}

module.exports = JSONNormal;