/**
 * Suma dos números
 * @param {number} a - Primer número a sumar
 * @param {number} b - Segundo número a sumar
 * @returns {number} - La suma de a y b
 */
function suma(a, b) {
    return a + b;
}

/**
 * Resta dos números
 * @param {number} a - Primer número
 * @param {number} b - Segundo número
 * @returns {number} - La resta de a y b
 */
function resta(a, b) {
    return a - b;
}

module.exports = {
    suma: suma,
    resta: resta
};