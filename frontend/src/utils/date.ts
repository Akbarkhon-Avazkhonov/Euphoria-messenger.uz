  export default  function relativeDate(timestamp: any): string {

    const date = (typeof timestamp === 'number') ? new Date(timestamp * 1000) : new Date(timestamp);
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

export function convertDate(timestamp: any): string {
    const date = new Date(timestamp * 1000); // Multiply by 1000 to convert seconds to milliseconds
    // if the date is today, return only the time
    if (new Date().getDate() === date.getDate()) {
      return date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
    }
    // if (`${date.toLocaleString('en-GB').slice(0,10)}` == 'Invalid Date Invalid Date') {
    //   return 'Только что';
    // }
    // if the date is yesterday, return 'Yesterday'
    if (new Date().getDate() - 1 === date.getDate()) {
      return 'Вчера';
    }
    // otherwise, return the full date 
    
    return `${date.toLocaleString('en-GB').slice(0,10)}`;
  }

  