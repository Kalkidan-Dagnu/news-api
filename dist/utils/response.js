"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = exports.successResponse = void 0;
const successResponse = (message, object = null) => ({
    Success: true,
    Message: message,
    Object: object,
    Errors: null
});
exports.successResponse = successResponse;
const errorResponse = (message, errors) => ({
    Success: false,
    Message: message,
    Object: null,
    Errors: errors
});
exports.errorResponse = errorResponse;
