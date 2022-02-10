// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getPaginatedPosts } from "lib/api"
export default async (req, res) => {
    console.log('server side', Math.random())
    const page = parseInt(req.query.page, 10);
    const limit = parseInt(req.query.limit, 10);
    const posts = await getPaginatedPosts(page, limit);
    res.status(200).json(posts)
}
