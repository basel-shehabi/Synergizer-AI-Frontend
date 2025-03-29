/* 
    Utility Functions go here 
*/


const isFieldInvalid = (value) => {
    return value === null || value === undefined || value === "";
}

export { isFieldInvalid };