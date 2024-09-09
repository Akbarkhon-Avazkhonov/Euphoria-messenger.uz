// export default  function relativeDate(date:  Date  |  string ) {
//     const now = new Date().getTime();
//     const diff = Math.round(now/1000 - (+(date)));
  
//     const minute = 60;
//     const hour = minute * 60;
//     const day = hour * 24;
//     const week = day * 7;
//     const month = day * 30;
//     const year = month * 12;
  
//     if (diff < 30) {
//       return "только что";
//     } else if (diff < minute) {
//       return diff + " секунд назад";
//     } else if (diff < 2 * minute) {
//       return "минуту назад";
//     } else if (diff < hour) {
//       return Math.floor(diff / minute) + " минуты назад";
//     } else if (Math.floor(diff / hour) == 1) {
//       return "час назад";
//     } else if (diff < day) {
//       return Math.floor(diff / hour) + " часа назад";
//     } else if (diff < day * 2) {
//       return "вчера";
//     } else if (diff < week) {
//       return week + " дней назад";
//     } else if (diff < month) {
//       return Math.floor(diff / week) + " недели назад";
//     } else if (diff < year) {
//       return Math.floor(diff / month) + " месяцев назад";
//     } else {
//       return Math.floor(diff / year) + " года назад";
//     }
//   }

  export default  function relativeDate(timestamp: any): string {
    const date = new Date(timestamp * 1000); // Multiply by 1000 to convert seconds to milliseconds
    
    
    return `${date.toLocaleDateString(
      // 'ru-RU',
      [],
      {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }
    )} ${date.toLocaleTimeString(
      [],
      {
        hour: '2-digit',
        minute: '2-digit',
      }
    )}`;
  }
  