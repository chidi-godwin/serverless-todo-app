export default {
    type: "object",
    properties: {
        task: {
            type: "object",
            properties: {
                S: {
                    type: "string"
                }
            },
            additionalProperties: false,
            required: ["S"]
        },
        dueDate: {
            type: "object",
            properties: {
                S: {
                    type: "string"
                }
            },
            additionalProperties: false,
            required: ["S"]
        },
        done: {
            type: "object",
            properties: {
                BOOL: {
                    type: "boolean"
                }
            },
            additionalProperties: false,
            required: ["BOOL"]
        }
    },
    additionalProperties: false
} as const;
