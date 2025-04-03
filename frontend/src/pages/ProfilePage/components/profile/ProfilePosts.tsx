import { Grid, Typography } from "@mui/material";
import { IPostInfo } from "../../../../shared/interfaces";

interface ProfilePostsProps {
  posts: IPostInfo[];
}

export const ProfilePosts = ({ posts }: ProfilePostsProps) => (
  <>
    {posts?.length ? (
      <Grid container spacing={2}>
        {posts.map((post: IPostInfo) => (
          <Grid item xs={4} key={post.postId}>
            <img 
              src={post.postImage} 
              alt={post.caption} 
              className="w-full h-64 object-cover rounded"
            />
          </Grid>
        ))}
      </Grid>
    ) : (
      <Typography className="text-center py-8 text-gray-500">
        No posts yet
      </Typography>
    )}
  </>
);