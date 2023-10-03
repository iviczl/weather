import { describe, expect, test } from 'vitest'
import {
  getTimeZoneOffsetForPlace,
  timeStringFromEpoch,
  twoDigitTimeString,
} from '../dateUtils'

describe('time zone offset test', () => {
  test('time zone offset is right for local', () => {
    const offset = getTimeZoneOffsetForPlace('Budapest')
    expect(offset).toBe(-120)
  })

  test('time zone offset is right for Tokyo', () => {
    const offset = getTimeZoneOffsetForPlace('Tokyo')
    expect(offset).toBe(-540)
  })

  test('timezone is undefined for invalid place', () => {
    const offset = getTimeZoneOffsetForPlace('SSS')
    expect(offset).toBe(undefined)
  })

  test('timezone is right for Warsaw', () => {
    const offset = getTimeZoneOffsetForPlace('Warsaw')
    expect(offset).toBe(-120)
  })
})

describe('2 digit time string test', () => {
  test('1 digit time string is formatted right', () => {
    const timeString = twoDigitTimeString('1')
    expect(timeString).toBe('01')
  })

  test('2 digit time string is formatted right', () => {
    const timeString = twoDigitTimeString('12')
    expect(timeString).toBe('12')
  })

  test('2 digit invalid time string is formatted right', () => {
    const timeString = twoDigitTimeString('72')
    expect(timeString).toBe('72')
  })

  test('0 length string is formatted right', () => {
    const timeString = twoDigitTimeString('')
    expect(timeString).toBe('')
  })

  test('4 digit string is formatted right', () => {
    const timeString = twoDigitTimeString('abcd')
    expect(timeString).toBe('abcd')
  })
})

describe('time string from epoch test', () => {
  test('epoch converts right', () => {
    const timeString = timeStringFromEpoch(1696316694)
    expect(timeString).toBe('09:04')
  })
})
