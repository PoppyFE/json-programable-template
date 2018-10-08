let math = {
    /**
     *  数字相加
     */
    sum(value, originalValue){
        if(originalValue === ""){
            originalValue = 0;
        }
        let sum = 0;

        //分割参数值
        for(let i = 0,length = value.length;i<length;i++){
            sum += Number(value[i]);
        }

        return originalValue + sum;
    },
    /**
     * 数字相乘
     */
    multiply(value, originalValue){
        if(originalValue === ""){
            originalValue = 0;
        }
        let sum = 1;
        //分割参数值
        for(let i = 0,length = value.length;i<length;i++){
            sum *= Number(value[i]);
        }
        return originalValue + sum;
    },
}
module.exports = math;

