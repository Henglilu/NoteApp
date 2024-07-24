class HttpError extends Error {
    constructor(message?: string) {
        super(message);
        this.name = this.constructor.name;
    } 
}
/** 
 * Status 401
*/
export class UnauthorizedError extends HttpError {}

/**
 * statsu 409
 */

export class ConflictError extends HttpError{}

// Add more error class here

