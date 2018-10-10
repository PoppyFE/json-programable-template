let math = {
    /**
     *  数字相加
     */
    sum(value){
        let sum = 0;

        //分割参数值
        for(let i = 0,length = value.length;i<length;i++){
            sum += value[i];
        }

        return sum;
    },
    /**
     * 数字相乘
     */
    multiply(value){
        let sum = 1;
        //分割参数值
        for(let i = 0,length = value.length;i<length;i++){
            sum *= Number(value[i]);
        }
        return sum;
    },
};
module.exports = math;

