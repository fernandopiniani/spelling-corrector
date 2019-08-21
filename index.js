// def words(text): return re.findall(r'\w+', text.lower())
const fs = require('fs')

const words = fs.readFileSync((__dirname + '/palavras.txt'), 'utf8').trim().toLowerCase().split('\n')
const chars = 'abcdefghijklmnopqrstuvwxyzáâãàçéêíóôõ-'
const validChars = `/([^ ${chars}])+/g`
const baseText = fs.readFileSync((__dirname + '/cortico.txt'), 'utf8').toLowerCase()
  .replace(/([\n])+/g, ' ')
  .replace(/( - )+/g, '')
  .replace(new RegExp(validChars), '')

const dict = baseText.split(' ').concat(words).reduce((counter, word) => {
  if(!counter[word]) counter[word] = 1
  else counter[word]++
  return counter
}, {})

// def P(word, N=sum(WORDS.values())):
//     "Probability of `word`."
//     return WORDS[word] / N
const probability = word => word ? dict[word] : 0

// def correction(word): 
//     "Most probable spelling correction for word."
//     return max(candidates(word), key=P)
const correction = word => 
  candidates(word)
    .reduce((bestCandidate, candidate) =>
      probability(bestCandidate) >= probability(candidate)
        ? bestCandidate
        : candidate
    , word)

// def candidates(word): 
//     "Generate possible spelling corrections for word."
//     return (known([word]) or known(edits1(word)) or known(edits2(word)) or [word])
const candidates = word => {
  return known([word])
    || known(edits1(word))
    || known(edits2(word))
    || []
}

// def known(words): 
//     "The subset of `words` that appear in the dictionary of WORDS."
//     return set(w for w in words if w in WORDS)
const known = words => { 
  const known = words.filter(w => dict[w])
  return known.length > 0 ? known : null 
}

// def edits1(word):
//     "All edits that are one edit away from `word`."
//     letters    = 'abcdefghijklmnopqrstuvwxyz'
//     splits     = [(word[:i], word[i:])    for i in range(len(word) + 1)]
//     deletes    = [L + R[1:]               for L, R in splits if R]
//     transposes = [L + R[1] + R[0] + R[2:] for L, R in splits if len(R)>1]
//     replaces   = [L + c + R[1:]           for L, R in splits if R for c in letters]
//     inserts    = [L + c + R               for L, R in splits for c in letters]
//     return set(deletes + transposes + replaces + inserts)
const edits1 = word => {
  const edits = []
  const splits = []

  for(let i = 1; i <= word.length; i ++)
    splits.push([word.substr(0, i), word.substr(i)])

  splits.forEach(([L, R]) => {
    if (R) {
      edits.push(L + R.substr(1)) //deletes
      chars.split('').forEach(c => edits.push(L + c + R.substr(1))) //replaces
    }
    if (R.length > 1) edits.push(L + R[1] + R[0] + R.substr(2)) //transposes
    chars.split('').forEach(c => edits.push(L + c + R)) //inserts
  })
  return edits
}

// def edits2(word): 
//     "All edits that are two edits away from `word`."
//     return (e2 for e1 in edits1(word) for e2 in edits1(e1))
const edits2 = word =>
  edits1(word).map(edits1).reduce((flattenEdits, edits) => [...flattenEdits, ...edits], [])

console.time('1 edits')
console.log('batatus ->',correction('batatus'))
console.timeEnd('1 edits')
console.time('2 edits')
console.log('batatuss ->',correction('batatuss'))
console.timeEnd('2 edits')
