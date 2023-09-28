export async function getAllSettlements(name) {
  const url =
    'http://geodb-free-service.wirefreethought.com/v1/geo/places?limit=8&offset=0&types=CITY&namePrefix=' +
    name

  try {
    const response = await fetch(url, {
      method: 'GET',
    })
    const result = (await response.json())?.data
    console.log(result)
    return result
  } catch (error) {
    console.error(error)
  }
}
