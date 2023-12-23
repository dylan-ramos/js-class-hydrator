'use strict';
import { toCamelCase } from '@dylan-ramos/js-tool';
/**
 * Checks if provided data is of type object.
 *
 * @param {UnknownType} data - The data to be checked.
 *
 * @returns {boolean} - True if data is of type object, false otherwise.
 */
const isObjectType = (data) => typeof data === 'object';
/**
 * Check if an object has a configurable property.
 *
 * @param {UnknownType} obj - The object to check.
 * @param {string} property - The name of the property.
 *
 * @returns {boolean} - Returns true if the object has a configurable property, otherwise false.
 */
const hasConfigurableProperty = (obj, property) => {
    const propertyDescriptor = Object.getOwnPropertyDescriptor(obj, property);
    if (typeof propertyDescriptor === 'undefined') {
        return false;
    }
    // @ts-expect-error unnecessary warning
    return (typeof propertyDescriptor === 'object' && propertyDescriptor.configurable);
};
/**
 * Checks if a property exists in a data object.
 *
 * @param {PropsType} data - The data object to check.
 * @param {string} key - The property key to check.
 *
 * @returns {boolean} - True if the property exists, false otherwise.
 */
const hasPropertyInDataObject = (data, key) => Object.prototype.hasOwnProperty.call(data, key);
/**
 * Assigns a property value from a source object to a target object, and then deletes the property from the source object.
 *
 * @param {object} source - The source object to retrieve the property value from.
 * @param {string} key - The key of the property in the source object to retrieve the value from.
 * @param {object} target - The target object to assign the property value to.
 * @param {string} property - The property name in the target object to assign the value to.
 *
 * @return {void} - This function does not return anything.
 */
const assignAndDeleteProperty = (source, key, target, property) => {
    if (!hasPropertyInDataObject(source, key) ||
        !hasConfigurableProperty(target, property)) {
        return;
    }
    target[property] = source[key];
    delete source[key];
};
/**
 * Hydrates an object with data by assigning properties from the data object to the target object and its prototypes.
 *
 * @param {PropsType} data - The data object containing the properties to assign.
 * @param {ConfigurableObject} targetObject - The target object to assign the properties to.
 *
 * @returns {void}
 */
const hydrateObject = (data, targetObject) => {
    let target = targetObject;
    do {
        Object.entries(data).forEach(([key]) => {
            const property = toCamelCase(key);
            assignAndDeleteProperty(data, key, target, property);
        });
        if (!Object.entries(data).length) {
            break;
        }
        if (hasConfigurableProperty(target, 'props')) {
            target.props = {
                ...target.props,
                ...data,
            };
        }
        target = Object.getPrototypeOf(target);
    } while (target);
};
/**
 * Hydrates a target object with the provided data.
 *
 * This function allows you to hydrate a class or its parents using the object taken as a parameter.
 * The keys are transformed into camelCase in order to find the corresponding Setter in the class.
 * The data object must contain the values that will be assigned to the properties of the class to which this function is assigned.
 *
 * @param {PropsType} data - The data to hydrate the target object with.
 *
 * @throws {Error} - Throws an error if the constructor parameter is not of object type.
 *
 * @returns {void}
 */
const hydrate = function (data) {
    if (!isObjectType(data)) {
        throw new Error('Constructor parameter need to be object type to works');
    }
    const targetObject = this;
    hydrateObject(data, targetObject);
};
export default hydrate;
export { hydrate };
