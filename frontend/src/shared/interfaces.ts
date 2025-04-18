export interface IExtendedResponse<T = unknown> {
  data: T;
  message: string;
}

export interface IUserInfo {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  profileName: string;
  profilePicture: string;
  dob: Date;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IPostInfo {
  postId: string;
  caption: string;
  region: string | null;
  postImage: string;
  isLiked:boolean,
  postedBy: {
    userId: string;
    userName: string;
    profileImage: string;
  };
  totalLikes: number;
  totalSave: number;
  totalComments: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProfile {
  _id: string;
  profileName: string;
  profilePicture: string;
  profileDescription: string;
  user: string;
  followersCount?: number;
  followingCount?: number;
  postsCount?: number;
}

export interface IProfileResponse {
  message: string;
  status: boolean;
  statusCode: number;
  data: IProfile;
}