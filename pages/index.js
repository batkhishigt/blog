import {
  Row,
  Col,
  Button
} from "react-bootstrap";
import Intro from "components/intro";
// import ListItem from "components/list-item";
import GridItem from "components/grid-item";
import { getPaginatedPosts } from "lib/api";
import Layout from "components/layout"
import useSWRInfinite from 'swr/infinite'

import PreviewAlert from 'components/preview-alert';
const PAGE_LIMIT = 2;
export default function Home({ posts, preview }) {
  const { data, size, setSize, isValidating } = useSWRInfinite((index) => `/api/posts?page=${index}&limit=${PAGE_LIMIT}`, { initialData: [posts] });
  let datas;
  // const { data, isLoading, error } = usePosts(posts);
  if (!data) { datas = [posts] } else datas = data
  // if (error) return <div>Алдаа гарлаа<pre>{JSON.stringify(data, null, 2)}</pre></div>
  // if (isLoading) return <div>Ачаалалж байна...</div>
  return (
    <Layout>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <Row>
        <Col md="12">
          {preview && <PreviewAlert />}
          <Intro />
        </Col>
      </Row>
      <hr />
      {/* <pre>{JSON.stringify(posts, null, 2)}</pre> */}
      <Row className="mb-5">
        {/* <Col md="10">
              <ListItem />
            </Col> */}
        {datas.map(
          page => page.map(
            post => (
              <Col md={12 / PAGE_LIMIT}>
                <GridItem post={post} />
              </Col>
            )
          ))}
      </Row>
      <div style={{ textAlign: "center" }}>
        {datas[datas.length - 1].length !== 0 && (
          isValidating ? <div style={{ fontSize: 14 }}>Түр хүлээн үү ...</div> : <Button onClick={() => { setSize(size + 1) }}>Цааш нь ... </Button>)}
      </div>
    </Layout>
  );
}
export const getStaticProps = async ({ preview = false }) => {
  const posts = await getPaginatedPosts(0, PAGE_LIMIT);
  return {
    props: {
      posts, preview
    }, revalidate: 10
  }
}
