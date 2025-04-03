import { useGetUserProfile } from "../../api/profileApi";
import Layout from "../../shared/layout/Layout";
import { useAppSelector } from "../../state/hooks";

const ProfilePage = () => {
    const userId = useAppSelector(state => state.userInfoSlice.userInfo.userId);
    const { data: user, isLoading } = useGetUserProfile(userId);
  
    if (isLoading) return <div>Loading...</div>;
    if (!user) return <div>User not found</div>;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="flex items-center gap-16 p-4">
          <div className="w-24 h-24 rounded-full overflow-hidden border border-gray-300">
            <img 
              src={user.avatar || "/default-avatar.png"} 
              alt={user.username}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-light">{user.username}</h1>
              <button className="px-4 py-1 bg-gray-100 rounded-md text-sm font-medium">
                Edit Profile
              </button>
            </div>
            
            <div className="flex gap-8 text-sm">
              <div className="text-center">
                <div className="font-semibold">{user.postsCount}</div>
                <div>posts</div>
              </div>
              <div className="text-center">
                <div className="font-semibold">{user.followersCount}</div>
                <div>followers</div>
              </div>
              <div className="text-center">
                <div className="font-semibold">{user.followingCount}</div>
                <div>following</div>
              </div>
            </div>
            
            <div>
              <p className="font-semibold text-sm">{user.fullName}</p>
              <p className="text-sm">{user.bio}</p>
            </div>
          </div>
        </div>
        
        {/* Profile Tabs */}
        <div className="border-t border-gray-300">
          <div className="flex justify-center gap-16 text-xs font-semibold uppercase">
            <button className="py-4 border-t border-black">Posts</button>
            <button className="py-4">Saved</button>
            <button className="py-4">Liked</button>

          </div>
        </div>
        
        {/* User Posts Grid */}
        <div className="grid grid-cols-3 gap-1">
          {user.posts.map(post => (
            <div key={post.id} className="aspect-square bg-gray-100 relative">
              <img 
                src={post.imageUrl} 
                alt={post.caption}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;