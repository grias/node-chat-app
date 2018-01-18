const moment = require('moment');

let date = moment();

console.log(date.format('MMM Do, YYYY HH:mm:ss'));
console.log(date.format('h:mm a'));

let timestamp = moment().valueOf();
console.log(timestamp);
