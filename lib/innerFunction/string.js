let string = {
    stringappend(strArray){
        let str = "";

        for(let i = 0,length = strArray.length; i < length; i++){
            str += strArray[i];
        }
        return  str;
    }
};

module.exports = string;