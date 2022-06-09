export function sortObjectByPropreties(
  data: Array<Object>,
  propretie: String,
  desc = true
): Array<Object> {
  //@ts-ignore
  var array = data.sort(function (a: Object, b: Object) {
    //@ts-ignore
    if (a[propretie] < b[propretie]) return -1
    //@ts-ignore
    if (a[propretie] > b[propretie]) return 1
  })

  // if desc is true reverse the data
  if (desc) data.reverse()

  return array
}

export function ruleOfThree(a: number, b: number, c: number): number {
  return (b * c) / a
}
