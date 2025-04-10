import ClearIcon from "@mui/icons-material/Clear";
import { Button, CircularProgress } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  getPostByIdApi,
  IUpdatePostData,
  updatePostApi,
} from "../../../api/postApi";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import { updateSelectedPostToEdit } from "../../../state/slices/postSlice";
import { qcUpdatePostInCache } from "../../../state/tanstack/queryClient";
import { IPostInfo } from "../../interfaces";

const UpdatePostContainer = () => {
  const dispatch = useAppDispatch();
  const postId = useAppSelector(
    (state) => state.postSlice.selectedPostToEdit.postId
  );

  const {
    isPending: isLoadingPost,
    isError: isPostError,
    error: postError,
    data: postData,
  } = useQuery<IPostInfo>({
    queryKey: ["post", postId],
    queryFn: () => getPostByIdApi(postId!),
    enabled: postId !== null,
    gcTime: 0,
  });

  const [postInfo, setPostInfo] = useState({
    region: "",
    caption: "",
  });

  useEffect(() => {
    if (postData) {
      setPostInfo({
        region: postData.region || "",
        caption: postData.caption || "",
      });
    }
  }, [postData]);

  const {
    mutate: updatePostMutation,
    isPending: isUpdating,
    isError: isUpdateError,
    error: updateError,
  } = useMutation({
    mutationFn: (data: IUpdatePostData) => updatePostApi(data),
    onSuccess: (updatedPost) => {
      qcUpdatePostInCache(updatedPost);
      dispatch(updateSelectedPostToEdit(null));
    },
    onError: (error) => {
      console.error("Error updating post:", error);
    },
  });

  const handleUpdatePost = () => {
    if (!postId) return;

    updatePostMutation({
      caption: postInfo.caption,
      postId,
      region: postInfo.region,
      isImageUpdated: false,
    });
  };

  if (isLoadingPost) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
        <CircularProgress sx={{ color: "white" }} />
      </div>
    );
  }

  if (isPostError) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
        <div className="bg-white p-6 rounded-xl shadow-xl max-w-md w-full text-center">
          <h3 className="text-lg font-bold mb-2">Error Loading Post</h3>
          <p className="text-red-500 mb-4">{postError.message}</p>
          <Button
            variant="contained"
            onClick={() => dispatch(updateSelectedPostToEdit(null))}
            sx={{ borderRadius: "12px", textTransform: "none" }}
          >
            Close
          </Button>
        </div>
      </div>
    );
  }

  if (!postData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center
     bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative bg-white rounded-2xl shadow-xl flex 
      flex-col w-[90vw] max-w-md overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <button
            onClick={() => dispatch(updateSelectedPostToEdit(null))}
            className="text-gray-500 cursor-pointer hover:text-gray-700 transition-colors"
            aria-label="Close post view"
          >
            <ClearIcon sx={{ fontSize: "1.5rem" }} />
          </button>
          <h2 className="text-lg font-semibold text-gray-800">Edit Post</h2>
          <Button
            variant="text"
            className="text-blue-500 hover:text-blue-600 font-medium"
            onClick={handleUpdatePost}
            disabled={isUpdating}
          >
            {isUpdating ? "Saving..." : "Save"}
          </Button>
        </div>

        {/* Content */}
        <div className="flex flex-col p-6 gap-6">
          {/* Error message for update failure */}
          {isUpdateError && (
            <div className="text-red-500 text-sm mb-4">
              Error updating post: {updateError?.message || "Unknown error"}
            </div>
          )}

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <Input
                className="w-full rounded-lg border-gray-300 
                focus:border-blue-500 focus:ring-blue-500"
                placeholder="Where was this taken?"
                value={postInfo.region}
                onChange={(e) =>
                  setPostInfo({ ...postInfo, region: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Caption
              </label>
              <Textarea
                className="w-full rounded-lg border-gray-300 
                focus:border-blue-500 focus:ring-blue-500 min-h-[100px]"
                placeholder="Tell your story..."
                value={postInfo.caption}
                onChange={(e) =>
                  setPostInfo({ ...postInfo, caption: e.target.value })
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePostContainer;