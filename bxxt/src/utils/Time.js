export function formatDate() {
    var d = new Date();
    //获取一个4位数的年份；
    var year = d.getFullYear();
    //获取月份
    var month = d.getMonth() + 1;
    month = month >= 10 ? month : '0' + month;
    //获取天
    var date = d.getDate();
    date = date >= 10 ? date : '0' + date;
    //获取小时
    var hours = d.getHours();
    hours = hours >= 10 ? hours : '0' + hours;
    //获取分钟
    var minutes = d.getMinutes();
    minutes = minutes >= 10 ? minutes : '0' + minutes;
    //获取秒
    var seconds = d.getSeconds();
    seconds = seconds >= 10 ? seconds : '0' + seconds;

    return year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds;
}