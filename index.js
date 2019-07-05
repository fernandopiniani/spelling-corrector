const fs = require('fs')
const words = fs.readFileSync((__dirname + '/palavras.txt'), 'utf8').trim().split('\n')
const baseText = fs.readFileSync((__dirname + '/cortico.txt'), 'utf8').toLowerCase()
  .replace(/([\n])+/g, ' ')
  .replace(/( - )+/g, '')
  .replace(/([^ abcdefghijklmnopqrstuvwxyzáâãàçéêíóôõ-])+/g, '')

