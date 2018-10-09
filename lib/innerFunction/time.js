const moment = require('moment');

let time = {
    /**ii
     * value[0] originalValue的格式， 如果originalValue 为空或者未传值，则不使用，默认使用当前时间
     * value[1] 输出格式
     */
    time(value) {
        if (
            "now" === value[0]
        ) {
            return moment().format(value[1]);
        }
        else if (
            !isNaN(Number(value[0]))
        ) {
            if (
                value.length > 2
            ) {
                return moment(value[0], value[1]).format(value[2]);
            } else {
                return moment(value[0]).format(value[1]);
            }
        }
    }
};

module.exports = time;