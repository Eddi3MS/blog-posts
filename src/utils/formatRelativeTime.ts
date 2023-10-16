const MINUTE = 60
const HOUR = MINUTE * 60
const DAY = HOUR * 24
const WEEK = DAY * 7
const MONTH = DAY * 30
const YEAR = DAY * 365

export function getTimeAgo(date: Date) {
  const secondsAgo = Math.round((Date.now() - Number(date)) / 1000)

  if (secondsAgo < MINUTE) {
    return secondsAgo + ` second${secondsAgo !== 1 ? 's' : ''} ago`
  }

  let divisor
  let unit = ''

  if (secondsAgo < HOUR) {
    divisor = MINUTE
    unit = 'minute'
  } else if (secondsAgo < DAY) {
    divisor = HOUR
    unit = 'hour'
  } else if (secondsAgo < WEEK) {
    divisor = DAY
    unit = 'day'
  } else if (secondsAgo < MONTH) {
    divisor = WEEK
    unit = 'week'
  } else if (secondsAgo < YEAR) {
    divisor = MONTH
    unit = 'month'
  } else {
    divisor = YEAR
    unit = 'year'
  }

  const count = Math.floor(secondsAgo / divisor)
  return `${count} ${unit}${count > 1 ? 's' : ''} ago`
}
