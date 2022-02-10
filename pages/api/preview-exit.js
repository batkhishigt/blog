export default async (req, res) => {

    res.clearPreviewData({ data: req.query.secret })
    res.writeHead(307, { Location: "/" })
    res.end();
    // const posts = await getPaginatedPosts(page, limit);
    //res.status(200).json({ messsage: "success" + req.query.slug })
}
