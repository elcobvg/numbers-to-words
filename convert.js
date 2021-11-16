const convert = (n, locale, index = 0) => {
  const { ones, tens, scales, options } = locale
  const { hundreds, first, suffix, group, tooLarge } = options

  if (n >= Math.pow(10, 15)) return tooLarge

  if (n < 20) return first.custom !== undefined && index === 1 && n === 1 ? first.custom : ones[n]

  if (n < 100) {
    const single = n % 10
    const digits = [tens[Math.trunc(n / 10) - 2], single ? ones[single] : '']
    first.start && digits.reverse()
    const glue = single ? (digits[0].match(/[aeiou]$/) ? suffix.vowel : suffix.cons) : ''
    return digits.join(glue)
  }

  const inRange = !Math.trunc(n / 1000) || group.size === 3 || (group.from <= n && n < group.to)
  if (n < Math.pow(10, index ? 3 : group.size) && inRange) {
    const { prefix, suffix } = hundreds
    const hundred =
      first.custom !== undefined && Math.trunc(n / 100) === 1 ? first.custom : ones[Math.trunc(n / 100)] + prefix
    return hundred + scales[0] + (n % 100 == 0 ? '' : suffix + convert(n % 100, locale))
  }

  const head = convert(Math.trunc(n / 1000), locale, ++index)
  const tail = n % 1000 ? convert(n % 1000, locale) : ''
  const scale = Math.trunc(n / 1000) % 1000 ? scales[index] + ' ' : ' '
  return (head + scale + tail).replace(/ +/g, ' ')
}

module.exports = convert
