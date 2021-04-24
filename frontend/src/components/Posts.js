import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

import PostTemplate from "./PostTemplate";
import PostServer from "./PostServer";
import Masonry from "react-masonry-css";
import axios from "axios";

const allPosts = async (key) => {
  let slug = key.queryKey[1];

  let searchQuery = slug === "all" ? "all" : `all/${slug}`;



  let response = await axios.get(
    `/posts/${searchQuery}`,
    { withCredentials: true }
  );

  return response.data;
};
const Posts = () => {
  let { slug } = useParams();

  const { data, status } = useQuery(["posts", slug], allPosts);

  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1,
  };
  if (status === "error") {
    return <p>some error occurred</p>;
  }
  return (
    <PostServer>
      <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {status === "success" && data.docs.length === 0 && (
          <p>no posts yet... create a post</p>
        )}
        {status === "success" &&
          data.docs !== undefined &&
          data.docs.map((post) => {
            return <PostTemplate key={post._id} post={post} />;
          })}
      </Masonry>
    </PostServer>
  );
};

export default Posts;
