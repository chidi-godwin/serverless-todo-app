export default {
    type: "object",
    properties: {
        name: {
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
        }
    },
    required: ["name", "dueDate"],
    additionalProperties: false
} as const;