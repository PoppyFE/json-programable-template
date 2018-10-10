const fs = require('fs');
const path = require('path');
const {functionIndexName} = require('./config/symbol.config');

const util = {
    /**
     * 防止undefined被覆盖
     * @param variable
     */
    isUndefined(variable) {
        if(variable !== undefined){
            throw new Error("Cannot over write undefined");
        }
    },
    /**
     * 必传参数
     */
    required(){
        throw new Error("Missing parameter");
    },

    /**
     * 检测传入的JSON是否符合规范
     * @param json
     */
    isCorrectJson(json){
        if(typeof json !== 'object' ){
            throw new Error("Please pass Json Object in the first param");
        }

        if(json.rules === undefined){
            throw new Error("JSON must have rules child. For exmaple: {\n" +
                "        rules:\n" +
                "            {\n" +
                "            }\n" +
                "    }");
        }
    },
    /**
     * 加载InnerFunction目录下的文件
     *
     * @type {Array}
     */
    getFolderInnerFunction(){
        const innerFuncPath = path.join(__dirname,'./innerFunction');
        const modules = [];
        fs.readdirSync(innerFuncPath)
            .filter(filename => {
                if (filename.startsWith('disabled')){
                    return false;
                }
                return true;
            })
            .forEach(filename => {
                const funcName = require(innerFuncPath + '/' + filename);

                modules.push({funcName,filename});
            });
        return modules;
    },

    loadfuncFileByName(filename){
        const innerFuncPath = path.join(__dirname,'./innerFunction');
        const module = require(innerFuncPath + '/' + filename);
        return module;
    },

    writeIndex(data){
        const filePath = path.join(__dirname,'./index/' + functionIndexName);
        fs.writeFile(filePath,data,function(err){
            if(err)
                return console.error(err);

            console.log('Index File has been created');
        });
    },

    isIndexExist(){
        return new Promise((resolve,reject)=>{
            const filePath = path.join(__dirname,'./index/' + functionIndexName);
            fs.exists(filePath,
                function (exists) {
                    resolve(exists);
                });
        });
    }
};


module.exports = util;