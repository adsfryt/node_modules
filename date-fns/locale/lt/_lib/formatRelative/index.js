"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var formatRelativeLocale = {
  lastWeek: "'Praėjusį' eeee p",
  yesterday: "'Vakar' p",
  today: "'Šiandien' p",
  tomorrow: "'Rytoj' p",
  nextWeek: 'eeee p',
  other: 'P'
};

var formatRelative = function (token, _date, _baseDate, _options) {
  return formatRelativeLocale[token];
};

var _default = formatRelative;
exports.default = _default;
module.exports = exports.default;