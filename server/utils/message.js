const moment = require('moment');


module.exports.generateMessage = (from, text) => {
  return {
    from
  , text
  , createdAt: moment().valueOf()
  };
};
// http://google.com/maps?q=53.920598399999996,27.610716099999998

module.exports.generateLocationMessage = (from, latitude, longitude) => {
  return {
    from
  , url: `http://google.com/maps?q=${latitude},${longitude}`
  , createdAt: moment().valueOf()
  };
};
