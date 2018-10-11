let symbol = {
    /**
     * 用于分割管道
     * @type {string}
     */
    recursion:"=>",
    /**
     * 用于分割方法名和传入的参数
     * @type {string}
     */
    func:"@",
    /**
     * 用于分割传入方法的参数
     * @type {string}
     */
    funcParam:",",
    /**
     * 定义递归开始时的初始值
     * @type {string}
     */
    defaultOriginValue:"",
    /**
     * 取之前的值
     * @type {string}
     */
    prev: "~",
};
module.exports = {
    symbol
};