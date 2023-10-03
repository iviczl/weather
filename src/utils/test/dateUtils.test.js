import { describe, expect, test } from 'vitest'
import { getTimeZoneOffsetForPlace } from '../dateUtils'

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
