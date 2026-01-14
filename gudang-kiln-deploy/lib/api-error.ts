// Error handling utilities for API routes

export class ApiError extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number = 500) {
        super(message);
        this.statusCode = statusCode;
        this.name = 'ApiError';
    }
}

export function handleApiError(error: unknown) {
    if (error instanceof ApiError) {
        return {
            success: false,
            message: error.message,
            statusCode: error.statusCode
        };
    }

    if (error instanceof Error) {
        return {
            success: false,
            message: error.message,
            statusCode: 500
        };
    }

    return {
        success: false,
        message: 'An unexpected error occurred',
        statusCode: 500
    };
}

export function createErrorResponse(error: unknown) {
    const { success, message, statusCode } = handleApiError(error);
    return Response.json({ success, message }, { status: statusCode });
}
