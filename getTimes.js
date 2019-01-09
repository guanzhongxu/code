/**
 * @param  str 传入的字符串
 * @return {}  直接输出结果没有返回值
 */
(function(window){
    function getTimes(str){
        str=str.toLowerCase();
        var obj={};
        for(var i=0 ;i<str.length ;i++){
            if(obj[str[i]]){
                obj[str[i]]++;
            }else{
                obj[str[i]] = 1;
            }
        }
        for(key in obj){
            console.log(key+"这个字母出现了"+obj[key]+"次");
        }
    }

    window.getTimes = getTimes;
}(window));