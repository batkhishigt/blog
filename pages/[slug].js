import { useRouter } from "next/router";
import { Row, Col } from "react-bootstrap"
import Layout from "components/layout"
import { getPostBySlug, getAllPosts } from "lib/api"
import HighLightCode from "components/HighLightCode"
import { urlFor } from 'lib/api';
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
                <img src={urlFor(props.node).height(400).url()} alt={props.node.alt} />
                <div className="code-filename" style={{ textAlign: "center" }}>{props.node.alt}</div>
            </div>
        ),
    },
}
export default ({ post }) => {
    return (
        <Layout>
            <Row>
                <Col md="12">
                    {/* <pre>{JSON.stringify(post, null, 2)}</pre> */}
                    <div className="blog-detail-header">
                        <p className="lead mb-0">
                            <img

                                src={post.publisher.picture}
                                className="rounded-circle mr-3"
                                height="50px"
                                width="50px"
                            />
                            {post.publisher.title}, {post.date}
                        </p>

                        <h1 className="font-weight-bold blog-detail-header-title mb-0">
                            {post.title}
                        </h1>

                        <h2 className="blog-detail-header-subtitle mb-3">
                            {post.subtitle}
                        </h2>

                        <img className="img-fluid rounded" src={urlFor(post.cover_image).height(600).url()} alt={post.cover_image.alt} />

                        <div className="code-filename" style={{ textAlign: "center" }}>{post.cover_image.alt}</div>
                    </div>
                    <br />
                    <BlockContent blocks={post.content} imageOptions={{ w: 320, h: 240, fit: 'max' }} serializers={serializers} />
                </Col>
            </Row>
        </Layout>
    );
}
export const getStaticProps = async ({ params }) => {
    const post = await getPostBySlug(params.slug)
    return {
        props: {
            post: post[0]
        }
    }
}
export const getStaticPaths = async () => {
    const posts = await getAllPosts();

    const data = posts.map((post) => (
        { params: { slug: post.slug, }, }
    ))
    return {
        paths: data,
        fallback: false
    }
}