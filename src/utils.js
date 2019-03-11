export default {
  getDateDiff(time) {
    let arr = time.split(/[^0-9]/);
    let worldDate = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);
    let localDate = new Date(worldDate.getTime() + 8 * 60 * 60 * 1000);
    let localTimeStamp = Date.parse(localDate),
      nowTimeStamp = Date.parse(new Date());
    let diffTimeStamp = nowTimeStamp - localTimeStamp,
      minute = 1000 * 60,
      hour = minute * 60,
      day = hour * 24,
      month = day * 30;
    let monthDiff = diffTimeStamp / month;
    let weekDiff = diffTimeStamp / (7 * day);
    let dayDiff = diffTimeStamp / day;
    let hourDiff = diffTimeStamp / hour;
    let minDiff = diffTimeStamp / minute;
      if(monthDiff >= 1) {
        return `${Math.floor(monthDiff)}个月前`
      }else if(weekDiff >= 1) {
        return `${Math.floor(weekDiff)}个星期前`
      }else if(dayDiff >= 1) {
        return `${Math.floor(dayDiff)}天前`
      }else if (hourDiff >= 1) {
        return `${Math.floor(hourDiff)}小时前`
      }else if(minDiff >=1) {
        return `${Math.floor(minDiff)}分钟前`
      }else {
        return `刚刚`
      }
  }
}