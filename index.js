const convert = require('./convert')
const locales = {}
const languages = ['en', 'nl', 'ind']
languages.forEach(lang => (locales[lang] = require(`./lang/${lang}`)))

const input = Number(process.argv.pop().replace(/[^0-9]/g, ''))
Object.keys(locales).forEach(lang => {
  console.log(convert(input, locales[lang]))
})
