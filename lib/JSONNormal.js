'use strict';

const UtilSingleton = require('./UtilSingleton.js');
const JSONParserSingleton = require('../lib/JSONParserSingleton.js');
let {staticJsonModel} = require('./data/staticData');
/**
 * 类的入口文件
 */
class JSONNormal{

    /**
     * 实例化
     */
    constructor(undefined){
        this.util = UtilSingleton.getInstance();
        this.util.isUndefined(undefined);
    }

    /**
     * 传入JSON导出Model
     * @param json:
     * @param cb: 用户传入的自定义外部方法
     * @param jsonModel: 部分需求不能使用动态值，需要根据变量动态引入值
     * @returns Object
     */

    parseJson(json = UtilSingleton.getInstance().required(), cb, jsonModel){
        this.util.isCorrectJson(json);

        json = json.rules;
        const _keys = Object.keys(json);

        staticJsonModel.push(jsonModel);
        const jsonParser = JSONParserSingleton.getInstance(cb);
        let _value = null;
        let _model = {};

        //遍历传入JSON的所有value
        for(let i = 0,length = _keys.length; i<length; i++){
            _value = json[_keys[i]];
            //解析遍历到的value
            _model[_keys[i]] = jsonParser.parsePipe(_value);
        }
        return _model;
    }

    /**
     * 建立内部方法的索引
     */
    buildIndex(){
        const modules = this.util.getFolderInnerFunction();
        let keys = null;
        let module = null;
        let funcNames = null;
        let index = {};

        for(let i = 0,length = modules.length; i < length; i++){
            module = modules[i];
            funcNames = module.funcName;
            keys = Object.keys(funcNames);

            for(let j = 0,length = keys.length; j < length; j++){
                index[keys[j]] = module.filename;
            }
        }

        const fileName = "index";
        let writeIndex = "const " + fileName + " = ";
        writeIndex += JSON.stringify(index);
        writeIndex += ";\n";
        writeIndex += "module.exports = " + fileName + ";";
        this.util.writeIndex(writeIndex);
    }
}

module.exports = JSONNormal;