let util = {
    /**
     *
     * @param value (输出类型，输出值)
     * @param originalValue
     * @private
     */
    const(value,originalValue){
        let _value = "";
        for(let i = 0,length = value.length; i < length; i++){
            _value += value[i];
        }
        return _value;
    }
};

module.exports = util;