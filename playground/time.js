//UNIX EPIC:  Jan 1st 1970 00:00:00am UTC, is represented by timestamp 0, represent in milliseconds
// timestamp 1000 represent 1 sec from UNIX EPIC time.

// var date = new Date();
// console.log(date.getMonth());

var moment = require('moment');
var createdAt = new Date().getTime();
var date = moment(createdAt);
// console.log(date.format('MMM Do YYYY'));
console.log(date.format('h:mm a'));