import { useGetUserProfile } from "../../api/profileApi";
import Layout from "../../shared/layout/Layout";
import { useAppSelector } from "../../state/hooks";

const ProfilePage = () => {
    const userId = useAppSelector(state => state.userInfoSlice.userInfo.userId);
    
    // Fetch user profile data
    const { data: user, isLoading } = useGetUserProfile(userId);
  
    if (isLoading) return <div>Loading...</div>;
    if (!user) return <div>User not found</div>;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-4">
        {/* Profile Header */}
        <div className="flex items-center gap-8 mb-8">
          <div className="w-32 h-32 rounded-full overflow-hidden">
            <img 
              src={user.avatar || "/default-avatar.png"} 
              alt={user.username}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
              <h1 className="text-2xl font-semibold">{user.username}</h1>
              <button className="px-4 py-1 bg-gray-200 rounded-md text-sm font-medium">
                {user.isFollowing ? 'Following' : 'Follow'}
              </button>
            </div>
            
            <div className="flex gap-8 mb-4">
              <div>
                <span className="font-semibold">{user.postsCount}</span> posts
              </div>
              <div>
                <span className="font-semibold">{user.followersCount}</span> followers
              </div>
              <div>
                <span className="font-semibold">{user.followingCount}</span> following
              </div>
            </div>
            
            <div>
              <p className="font-semibold">{user.fullName}</p>
              <p>{user.bio}</p>
            </div>
          </div>
        </div>
        
        {/* Profile Tabs */}
        <div className="border-t border-gray-300 pt-4">
          <div className="flex justify-center gap-16">
            <button className="text-sm font-semibold uppercase">Posts</button>
            <button className="text-sm font-semibold uppercase">Liked</button>
            <button className="text-sm font-semibold uppercase">Saved</button>
          </div>
        </div>
        
        {/* User Posts Grid */}
        <div className="grid grid-cols-3 gap-1 mt-4">
          {user.posts.map(post => (
            <div key={post.id} className="aspect-square bg-gray-100 relative">
              <img 
                src={post.imageUrl} 
                alt={post.caption}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black bg-opacity-50 text-white">
                <div className="flex gap-4">
                  <span>❤️ {post.likesCount}</span>
                  <span>💬 {post.commentsCount}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;