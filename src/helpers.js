var BigNumber = require('bignumber.js');
var wad = '0x1fad38', match
var rpad = (x, y, n) => x + repeat(y, n - x.length)
var lpad = (x, y, n) => repeat(y, n - x.length) + x
var repeat = (x, n) => n > 0 ? new Array(n + 1).join(x) : ""
var toHex = wad => new BigNumber(wad.replace(".", "")).toString(16)

if (match = wad.match(/^(\d+\.)(\d{1,18})$/)) {
  wad = match[1] + rpad(match[2], "0", 18)
  console.log('option 1', wad)
} else if (/^0x[0-9a-f]+/.test(wad)) {
  wad = lpad(new BigNumber(wad).toString(), "0", 18)
  wad = wad.replace(/.{18}$/, ".$&").replace(/^\./, "0.")
  console.log('option 2', wad)
} else {
  console.error("sai---wad: error: number must have decimal point")
}

console.log(wad)
console.log(`0x${lpad(toHex(wad), "0", 32)}`)
