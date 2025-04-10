import ClearIcon from "@mui/icons-material/Clear";
import { Button, CircularProgress } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { deletePostApi } from "../../../api/postApi";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import { updateSelectedPostToDelete } from "../../../state/slices/postSlice";
import { qcDeletePostInCache } from "../../../state/tanstack/queryClient";

const DeletePostContainer = () => {
  const dispatch = useAppDispatch();
  const postId = useAppSelector(
    (state) => state.postSlice.selectedPostToDelete.postId
  );

  const { mutate: deletePost, isPending, isError, error } = useMutation({
    mutationFn: () => deletePostApi(postId!),
    onSuccess: () => {
      qcDeletePostInCache(postId!);
      dispatch(updateSelectedPostToDelete(null));
    },
    onError: (error) => {
      console.error("Error deleting post:", error);
    },
  });

  const handleDelete = () => {
    deletePost();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative bg-white rounded-2xl shadow-xl flex 
      flex-col w-[90vw] max-w-md overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <button
            onClick={() => dispatch(updateSelectedPostToDelete(null))}
            className="text-gray-500 cursor-pointer hover:text-gray-700 transition-colors"
            aria-label="Close delete confirmation"
          >
            <ClearIcon sx={{ fontSize: "1.5rem" }} />
          </button>
          <h2 className="text-lg font-semibold text-gray-800">Delete Post</h2>
          <div className="w-6" />
        </div>

        {/* Content */}
        <div className="flex flex-col p-6 gap-6">
          {isError && (
            <div className="text-red-500 text-sm mb-4">
              Error: {error?.message || "Failed to delete post"}
            </div>
          )}

          <div className="text-center">
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete this post?
            </p>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              variant="outlined"
              onClick={() => dispatch(updateSelectedPostToDelete(null))}
              disabled={isPending}
              sx={{
                borderRadius: "8px",
                textTransform: "none",
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleDelete}
              disabled={isPending}
              sx={{
                borderRadius: "8px",
                textTransform: "none",
              }}
            >
              {isPending ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Delete"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeletePostContainer;