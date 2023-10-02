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

export function getTimeZoneOffsetForPlace(place) {
  const timeZones = Intl.supportedValuesOf('timeZone')
  const timeZone = timeZones.filter((item) => item.includes(place))[0]
  if (!timeZone) {
    return
  }
  return getOffset(timeZone)
}

const getOffset = (timeZone) => {
  const timeZoneName = Intl.DateTimeFormat('ia', {
    timeZoneName: 'short',
    timeZone,
  })
    .formatToParts()
    .find((i) => i.type === 'timeZoneName').value
  const offset = timeZoneName.slice(3)
  if (!offset) return 0

  const matchData = offset.match(/([+-])(\d+)(?::(\d+))?/)
  if (!matchData) throw `cannot parse timezone name: ${timeZoneName}`

  const [, sign, hour, minute] = matchData
  let result = parseInt(hour) * 60
  if (sign === '+') result *= -1
  if (minute) result += parseInt(minute)

  return result
}
