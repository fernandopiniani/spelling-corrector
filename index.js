// def words(text): return re.findall(r'\w+', text.lower())
const words = fs.readFileSync((__dirname + '/palavras.txt'), 'utf8').trim().toLowerCase().split('\n')
const baseText = fs.readFileSync((__dirname + '/cortico.txt'), 'utf8').toLowerCase()
  .replace(/([\n])+/g, ' ')
  .replace(/( - )+/g, '')
  .replace(/([^ abcdefghijklmnopqrstuvwxyzáâãàçéêíóôõ-])+/g, '')

const counter = baseText.split(' ').concat(words).reduce((counter, word) => {
  if(!counter[word]) counter[word] = 1
  else counter[word]++
  return counter
}, {})

// def P(word, N=sum(WORDS.values())):
//     "Probability of `word`."
//     return WORDS[word] / N

const probability = word => counter[word]

// const correction = (word) => {
//   "Most probable spelling correction for word."
//     return max(candidates(word), key=P)
// }

const correction = word => candidates(word).reduce((bestCandidate, candidate) =>
  probability(bestCandidate) >= probability(candidate)
    ? bestCandidate
    : candidate
)

// const candidates = word => {
//   "Generate possible spelling corrections for word."
//   return (known([word]) or known(edits1(word)) or known(edits2(word)) or [word])
// }

const candidates = word => {
  // TODO
}

// const known = words => {
//     "The subset of `words` that appear in the dictionary of WORDS."
//     return set(w for w in words if w in WORDS)
// }

const edits = word => {

}

// const edits1 = word => {
//     "All edits that are one edit away from `word`."
//     letters    = 'abcdefghijklmnopqrstuvwxyz'
//     splits     = [(word[:i], word[i:])    for i in range(len(word) + 1)]
//     deletes    = [L + R[1:]               for L, R in splits if R]
//     transposes = [L + R[1] + R[0] + R[2:] for L, R in splits if len(R)>1]
//     replaces   = [L + c + R[1:]           for L, R in splits if R for c in letters]
//     inserts    = [L + c + R               for L, R in splits for c in letters]
//     return set(deletes + transposes + replaces + inserts)
// }
//
// const edits2 = word => {
//   "All edits that are two edits away from `word`."
//   return (e2 for e1 in edits1(word) for e2 in edits1(e1))
// }
//
