const NodeCache = require( "node-cache" );
const uuidv1 = require('uuid/v1');

const cache = new NodeCache()

let i = 0

module.exports = (fn, identifier = uuidv1()) => (...params) => {
  const key = `${identifier}:${JSON.stringify(params)}`
  const cachedResult = cache.get(key)
  if(cachedResult) {
    return cachedResult
  }
  i++
  const result = fn(...params)
  cache.set(key, result)
  return result
}
