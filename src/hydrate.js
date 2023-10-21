'use strict'

import { toCamelCase } from '@dylan-ramos/js-tool'

/**
 * This function allows you to hydrate a class or its parents using the object taken as a parameter.
 * The keys are transformed into camelCase in order to find the corresponding Setter in the class.
 * The data object must contain the values that will be assigned to the properties of the class to which this function is assigned.
 *
 * @param data
 */
const hydrate = function (data) {
  if (typeof data !== 'object') {
    throw new Error('Constructor parameter need to be object type to works')
  }

  let c = this

  do {
    for (let i in data) {
      if (!data.hasOwnProperty(i)) {
        continue
      }

      const property = toCamelCase(i)

      if (typeof Object.getOwnPropertyDescriptor(c, property) !== 'object') {
        continue
      }

      if (!Object.getOwnPropertyDescriptor(c, property).configurable) {
        continue
      }

      this[property] = data[i]

      delete data[i]
    }

    if (!Object.entries(data).length) {
      return
    }

    if (
      c.hasOwnProperty('props') &&
      typeof Object.getOwnPropertyDescriptor(c, 'props') === 'object' &&
      Object.getOwnPropertyDescriptor(c, 'props').configurable
    ) {
      this.props = { ...this.props, ...data }
    }

    c = Object.getPrototypeOf(c)
  } while (c)
}

export default hydrate
export { hydrate }
