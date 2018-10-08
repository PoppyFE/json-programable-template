let util = {
    /**
     *
     * @param value (输出类型，输出值)
     * @param originalValue
     * @private
     */
    testDisabled(value,originalValue){
        let _value = null;
        _value = value[1];
        if(value[0] === "number"){
            _value = Number(value[1]);
        }
        return _value;
    }
};

module.exports = util;