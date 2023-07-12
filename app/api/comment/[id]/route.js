import Comment from "@models/comment";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const comment = await Comment.find({ post: params.id }).populate("creator")
        if (!comment) return new Response("Comment Not Found", { status: 404 });

        return new Response(JSON.stringify(comment), { status: 200 })

    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        // Find the comment by ID and remove it
        await Comment.findByIdAndRemove(params.id);

        return new Response("Comment deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting comment", { status: 500 });
    }
};