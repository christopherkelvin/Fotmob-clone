/**
 * Groups an array of objects by a specified key.
 *
 * @param array - The array of objects to be grouped.
 * @param key - The key to group by.
 * @returns An object where the keys are the values of the specified key and the values are arrays of objects.
 */
export function groupBy<T extends Record<string, any>>(array: T[], key: keyof T): Record<string, T[]> {
    return array.reduce((result: Record<string, T[]>, currentObj: T) => {
        // Determine the value of the key for the current object
        const keyValue = currentObj[key];

        // If the key value is not already in the result object, create an array for it
        if (!result[keyValue as string]) {
            result[keyValue as string] = [];
        }

        // Push the current object into the array for this key value
        result[keyValue as string].push(currentObj);

        return result;
    }, {});
}
