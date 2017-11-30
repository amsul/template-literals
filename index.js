/**
 * Creates a tagged template to use for interpolating values into a string.
 * Primarily "inspired" by https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_template_literals
 *
 * @example
 * const message = tag `${0} ${'name'}!`
 * message('Hello', { name: 'Amsul' }) // 'Hello Amsul!'
 *
 * @example
 * const message = tag `It goes ${0} ${1} and back to ${0}`
 * message('one', 'two') // 'It goes one two and back to one'
 *
 * @param  {String[]} strings       The array that contains the string templates.
 * @param  {...String|Number} keys  The keys to use for interpolating values.
 * @return {Function}               The tagged template.
 */
export const tag = (strings, ...keys) => (...values) => {

  const dict = values[values.length - 1] || {}
  const result = [strings[0]]
  const getValue = createGetValue(values, dict)

  keys.forEach((key, index) => {
    const value = getValue(key)
    result.push(value, strings[index + 1])
  })

  return result.join('')
}

const createGetValue = (values, dict) => (key) => {
  const value = Number.isInteger(key) ? values[key] : dict[key]
  const valueType = typeof value
  if (valueType !== 'number' && valueType !== 'string') {
    console.error('The value for the key %o must be a string or number: %o', key, value)
    return ''
  }
  return value
}
