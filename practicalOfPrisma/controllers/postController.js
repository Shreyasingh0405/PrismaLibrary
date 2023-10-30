const prisma = require("../prisma/prismaClientFunction")

//create a new post
exports.createPost = async (req, res) => {
    try {
        const { slug, title, body, authorId } = req.body
        if (!slug || !title || !body || !authorId) {
            return res.send({ status: 0, msg: "All feilds are required" })
        }
        const result = await prisma.post.create({
            data: {
                slug,
                title,
                body,
                author: { connect: { id: authorId } }
            }
        })
        return res.send(result)
    } catch (error) {
        return res.send(error.message)
    }
}

//update
exports.updatePost = async (req, res) => {
    try {
        const { id, title, body } = req.body; // Destructure the variables properly
        const update = await prisma.post.updateMany({
            where: { id: id }, // Change `_id` to `id`
            data: {
                title: title,
                body: body
            }
        });
        return res.send({ data: update, msg: "Updated successfully" });
    } catch (error) {
        return res.send(error.message);
    }
};


//delete
exports.deletePost = async (req, res) => {
    try {
        const{id} = req.body
        const deleteData = await prisma.post.delete({
            where: { id: id }
        })
        return res.send({data:deleteData,msg:"data deleted successfully"})
    } catch (error) {
        return res.send(error.message)
    }
}

//get all post
exports.getPost = async (req, res) => {
    try {
        const result = await prisma.post.findMany()
        return res.send({data:result})
    } catch (error) {
        return res.send(error.message)
    }
}