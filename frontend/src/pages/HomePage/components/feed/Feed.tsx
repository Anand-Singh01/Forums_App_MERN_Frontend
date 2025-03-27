import { useQuery } from "@tanstack/react-query";
import { getAllPostsApi } from "../../../../api/postApi";
import LoaderSpinner from "../../../../shared/components/LoaderSpinner";
import PostContainer from "../../../../shared/components/post/PostContainer";
import { IPostInfo } from "../../../../shared/interfaces";
import AddPost from "./components/AddPost";

const Feed = () => {
  const { data, isLoading, isError, error } = useQuery<IPostInfo[]>({
    queryKey: ["posts"],
    queryFn: getAllPostsApi,
    retry: false,
  });

  if (isLoading) {
    return <LoaderSpinner />;
  }
  if (isError) {
    alert("Server error");
  }
  return (
    <div className="flex justify-center md:gap-[3rem]">
      <section
        className="space-y-5 h-[calc(100vh-100px)] 
    overflow-scroll no-scrollbar"
      >
        <section className="flex justify-center pt-5">
          <AddPost />
        </section>
        <section className="flex flex-col h-full gap-5 items-center">
          {data?.map((post) => {
            return <PostContainer key={post.postId} post={post} />;
          })}
        </section>
      </section>
      <section className="font-semibold text-gray-600 p-3 w-[20rem]">
        <div className="border-[1px]">
          <p>Latest Activity</p>
        </div>
      </section>
    </div>
  );
};

export default Feed;
