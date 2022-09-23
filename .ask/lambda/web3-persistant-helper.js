/**
 * Make a File object with the given filename, containing the given object (serialized to JSON).
 * @param {string} filename filename for the returned File object
 * @param {object} obj a JSON-serializable object
 * @returns {File}
 */
 export function jsonFile(filename, obj) {
    return new File([JSON.stringify(obj)], filename)
}