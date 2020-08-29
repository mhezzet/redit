import NavBar from "../components/NavBar";
import { usePostsQuery } from "../generated/graphql";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Index = () => {
  const [{ data }] = usePostsQuery();

  return (
    <>
      <NavBar />
      {data?.posts.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
