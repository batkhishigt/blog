import { useRouter } from "next/router";
import { Row, Col } from "react-bootstrap"
import Layout from "components/layout"
import { getPostBySlug, getAllPosts, getPaginatedPosts } from "lib/api"
import HighLightCode from "components/highlight-code"
import { urlFor } from 'lib/api';
import PostHeader from "components/post-header"
import PreviewAlert from 'components/preview-alert';
const BlockContent = require('@sanity/block-content-to-react')
const serializers = {
    types: {
        code: (props) => (
            <>
                <HighLightCode language={props.node.language}>
                    {props.node.code}
                </HighLightCode>
                <div className="code-filename" style={{ textAlign: "center" }}> {props.node.filename}</div >
            </>
        ),
        image: (props) => (
            <div className={`blog-image blog-image-${props.node.position}`}>
                <img src={urlFor(props.node).width(600).url()} alt={props.node.alt} />
                <div className="code-filename" style={{ textAlign: "center" }}>{props.node.alt}</div>
            </div>
        ),
    },
}
export default ({ post, preview }) => {
    const router = useRouter();
    if (router.isFallback) return <Layout>
        <div>Түр хүлээн үү</div>
    </Layout>
    if (!router.isFallback && !post?.slug) return <Layout>
        <div>uuchlaarai ene post baihgui bna </div>
    </Layout>
    return (
        <Layout>
            <Row>
                <Col md="12">
                    {preview && <PreviewAlert />}
                    {/* <pre>{JSON.stringify(post, null, 2)}</pre> */}
                    <PostHeader post={post} />
                    <br />
                    <BlockContent blocks={post.content} imageOptions={{ w: 320, h: 240, fit: 'max' }} serializers={serializers} />
                </Col>
            </Row>
        </Layout>
    );
}
export const getStaticProps = async ({ params, preview = false, previewData }) => {

    const post = await getPostBySlug(params.slug, preview)
    return {
        props: {
            post: post.length > 1 ? post[1] : post.length > 0 ? post[0] : {}, preview
        }
    }
}
export const getStaticPaths = async () => {
    const posts = await getPaginatedPosts(0, 2);
    const data = posts.map((post) => (
        { params: { slug: post.slug, }, }
    ))
    return {
        paths: data,
        fallback: true
    }
}