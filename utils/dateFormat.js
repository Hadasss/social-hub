const dateFormat = require("dateFormat");
const now = new Date();

const date = dateFormat("dd, mm, yyyy, HH:MM");
// dateFormat();
// Sat Jun 09 2007 17:46:22

module.exports = date;
