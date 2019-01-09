/**
 *
 * @param dt 时间对象
 * @returns {string} 返回格式化字符串
 * @author 管忠旭
 */
function getTime(dt){
    var arr = [dt.getFullYear(),dt.getMonth()+1,dt.getDate(),dt.getHours(),dt.getMinutes(),dt.getSeconds()];
    for(var i = 0 ;i<arr.length;i++){
        arr[i] = add0(arr[i]);
    }
    return arr[0]+"年"+arr[1]+"月"+arr[2]+"日 "+arr[3]+":"+arr[4]+":"+arr[5];
}
/**
 *
 * @param time 具体的时间（年,月,日,时,分,秒）
 * @returns {*} 如果两位数结果 但并不代表所有结果大于10；
 */
function add0(time){
    if(time<10){
        time = "0"+time;
    }
    return time;
}