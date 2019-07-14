let lodash = require('lodash');

/**
 * Look for fields in <fields> that are in the <allowed> list, then convert each field value to string, and trim whitespaces.
 * 
 * @param {Object} fields Object of fields, example from req.body.
 * @param {Array} allowed Array of names of allowed fields.
 * @param {Boolean} assignMissing True to create fields that are absent in <fields> but present in <allowed>. Assign an empty string as defaults.
 * 
 * @return {Object} Object of fields that are in the <allowed> list.
 */
let allowedFields = (fields, allowed, assignMissing = false) => {
    let post = {}
    lodash.each(allowed, (allowedKey) => {
        let found = lodash.find(fields, (_, fieldKey) => {
            return allowedKey === fieldKey
        })
        if (found !== undefined) { // Strict type test. If field is in allowed list, include it
            let cleanValue = '';
            // console.log(typeof found);
            if (typeof found === "undefined") {
                // Defaults to ''
            } else if (typeof found === "boolean") {
                cleanValue = found; // As is
            } else if (typeof found === "number") {
                cleanValue = found // As is
            } else if (typeof found === "string") {
                cleanValue = lodash.trim(found); // Trim
            } else if (typeof found === "symbol") { // Symbol (new in ECMAScript 2015)
                // Defaults to ''
            } else if (typeof found === "function") {
                // Defaults to ''
            } else if (typeof found === "object") {
                cleanValue = JSON.stringify(found)
            } else {
                // Unknown types defaults to ''
            }

            post[allowedKey] = cleanValue;
        } else {
            if (assignMissing) { // If true, then add this field with value of empty string (use case: prevents null error)
                post[allowedKey] = ""
            }
        }
    });

    return post
}

// Export
module.exports = {
    allowedFields: allowedFields
};

