let money = {
    yuan_to_fen(value,originalValue){
        let float = parseFloat(originalValue).toFixed(2);

        // if(isNaN(float)){
        //     throw new Error("The input value is not float or number")
        // }
        return Math.round(float * 100);
    }
};

module.exports = money;