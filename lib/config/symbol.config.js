/**
 * 用于分割管道
 * @type {string}
 */
const recursionSymbol = "=>";

/**
 * 用于分割方法名和传入的参数
 * @type {string}
 */

const funcSymbol = "@";
/**
 * 用于分割传入方法的参数
 * @type {string}
 */

const funcParamSymbol = ",";

/**
 * 定义递归开始时的初始值
 * @type {string}
 */
const defaultOriginValue = "";

/**
 * 索引文件的名字
 * @type {string}
 */
const functionIndexName = "functionIndex.js";

module.exports = {
    funcSymbol,
    recursionSymbol,
    funcParamSymbol,
    defaultOriginValue,
    functionIndexName
};