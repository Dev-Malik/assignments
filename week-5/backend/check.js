const zod = require("zod");

const createCard = zod.object({
    name: zod.string(),
    description: zod.string(),
    interests: zod.array(zod.string().min(1)),
    handles: zod.object({
        linkedin: zod.string().url(),
        insta: zod.string().url()
    })
})

module.exports = {
    createCard: createCard
}