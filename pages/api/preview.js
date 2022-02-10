// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getPaginatedPosts } from "lib/api"
export default async (req, res) => {
    console.log('server side', Math.random())
    if (process.env.SANITY_STUDIO_PREVIEW_SECRET
        !== req.query.secret) return res.status(401).json({ messsage: "invalid password" + req.query.secret });

    res.setPreviewData({ data: req.query.secret })
    res.writeHead(307, { Location: encodeURI(`/${req.query.slug}`) })
    res.end();
    // const posts = await getPaginatedPosts(page, limit);
    //res.status(200).json({ messsage: "success" + req.query.slug })
}
