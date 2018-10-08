const moment = require('moment');

let time = {
    /**ii
     * value[0] originalValue的格式， 如果originalValue 为空或者未传值，则不使用，默认使用当前时间
     * value[1] 输出格式
     */
    time(value,start) {

        if (
            "now" === value[0]
        ) {
            return moment().format(value[1]);
        }
        else if (
            "convert" === value[0]
        ) {
            if (
                value.length > 2
            ) {
                return moment(start, value[1]).format(value[2]);
            } else {
                return moment(start).format(value[1]);
            }
        }
    }
};

module.exports = time;