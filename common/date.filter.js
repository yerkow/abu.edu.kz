export default (value, type) => {
  const date = new Date(value)
  let shortMonth = [];
  shortMonth['RU'] = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
  shortMonth['KZ'] = ['қаңтар', 'ақпан', 'наурыз', 'сәуір', 'мамыр', 'маусым', 'шілде', 'тамыз', 'қыр', 'қаз', 'қар', 'жел'];
  shortMonth['EN'] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let longMonth = [];
  longMonth['RU'] = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
  longMonth['KZ'] = ['қаңтар', 'ақпан', 'наурыз', 'сәуір', 'мамыр', 'маусым', 'шілде', 'тамыз', 'қыркүйек', 'қазан', 'қараша', 'желтоқсан'];
  longMonth['EN'] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  switch (type) {
    case 'date':
      return date.toLocaleDateString()
    case 'fullDateRU':
      return date.getDate()+' '+longMonth['RU'][date.getMonth()]+' '+date.getFullYear();
    case 'fullDateKZ':
      return date.getDate()+' '+longMonth['KZ'][date.getMonth()]+' '+date.getFullYear();
    case 'fullDateEN':
      return date.getDate()+' '+longMonth['EN'][date.getMonth()]+' '+date.getFullYear();
    case 'time':
      return date.toLocaleTimeString()
    case 'day':
      return date.getDate()
    case 'month':
      return date.getMonth()
    case 'shortMonthRU':
      return shortMonth['RU'][date.getMonth()];
    case 'shortMonthKZ':
      return shortMonth['KZ'][date.getMonth()];
    case 'shortMonthEN':
      return shortMonth['EN'][date.getMonth()];
    default:
      return date.toLocaleString()
  }
}

