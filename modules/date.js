const formatDateAsYYYYMMDD = (date, delim = '-') => {
  const dateString = '' + date.getFullYear().toString() +
  delim +
  (parseInt(date.getMonth()) + 1).toString().padStart(2, '0') +
  delim +
  date.getDate().toString().padStart(2, '0')
  return dateString
}

module.exports = { formatDateAsYYYYMMDD }
