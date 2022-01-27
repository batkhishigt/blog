import {
  Container,
  Row,
  Col
} from "react-bootstrap";

import MyNavbar from "components/my-navbar";
import Intro from "components/intro";
import ListItem from "components/list-item";
import GridItem from "components/grid-item";
import { getAllPosts } from "lib/api";
export default function Home({ posts }) {
  return (
    <Container>
      <MyNavbar />
      <div className="blog-detail-page">
        <Row>
          <Col md="12">
            <Intro />
          </Col>
        </Row>
        <hr />
        {/* <pre>{JSON.stringify(posts, null, 2)}</pre> */}
        <div className={`page-wrapper`}>
          <Row className="mb-5">
            {/* <Col md="10">
              <ListItem />
            </Col> */}
            {posts.map(post => (
              <Col md="4">
                <GridItem post={post} />
              </Col>
            ))}
          </Row>
        </div>
      </div>
      <footer className="page-footer">
        <div>
          <a href="#">нүүр</a>
          {" | "}
          <a href="#">сургалт</a>
          {" | "}
          <a href="#">фэйсбүүк</a>
        </div>
      </footer>
    </Container>
  );
}

export const getStaticProps = async () => {
  const posts = await getAllPosts();
  return {
    props: {
      posts
    }
  }
}
