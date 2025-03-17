export const asyncHandler = (fn: Function) => {
    return async (parent: any, args: any, context: any, info: any) => {
        try {
            return await fn(parent, args, context, info);
        } catch (error) {
            console.error("Error in resolver:", error);
            throw error;
        }
    };
};
