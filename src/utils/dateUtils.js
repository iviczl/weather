export function timeStringFromEpoch(epoch) {
  const time = new Date(epoch * 1000)
  return (
    twoDigitTimeString(time.getHours()) +
    ':' +
    twoDigitTimeString(time.getMinutes())
  )
}

export function twoDigitTimeString(time) {
  let timeString = String(time)
  if (timeString.length < 2) {
    timeString = '0' + timeString
  }
  return timeString
}
