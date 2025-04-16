import { useState, useEffect } from "react";
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { useUpdateProfile } from "../../../api/ProfileApi";
import { useAppSelector } from "../../../state/hooks";
import LoaderSpinner from "../../../shared/components/LoaderSpinner";
import { toast } from "react-toastify";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

interface EditProfilePageProps {
  open: boolean;
  onClose: () => void;
  profile: {
    profileName: string;
    profilePicture: string;
    profileDescription: string;
  };
  onProfileUpdated: () => void;
}

export const EditProfilePage = ({ open, onClose, profile, onProfileUpdated }: EditProfilePageProps) => {
  const [name, setName] = useState(profile.profileName);
  const [description, setDescription] = useState(profile.profileDescription || "");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const userId = useAppSelector(state => state.userInfoSlice.userInfo.userId);
  const { mutate: updateProfile, isPending } = useUpdateProfile();

  useEffect(() => {
    setName(profile.profileName);
    setDescription(profile.profileDescription || "");
    setPreviewImage(null);
    setSelectedImage(null);
  }, [profile, open]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("isImageUpdated", String(!!selectedImage));
    if (selectedImage) {
      formData.append("file", selectedImage);
    }

    updateProfile({ userId, formData }, {
      onSuccess: () => {
        toast.success("Profile updated successfully!");
        onProfileUpdated();
        onClose();
      },
      onError: () => {
        toast.error("Failed to update profile");
      }
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogContent>
        <div className="flex flex-col items-center gap-4 mt-4">
          <Avatar
            src={previewImage || profile.profilePicture}
            sx={{ width: 100, height: 100 }}
            className="border-2 border-gray-300"
          />
          <Button
            component="label"
            variant="outlined"
            startIcon={<CloudUploadIcon />}
          >
            Upload new photo
            <VisuallyHiddenInput 
              type="file" 
              accept="image/*" 
              onChange={handleImageChange}
            />
          </Button>
        </div>

        <TextField
          margin="normal"
          fullWidth
          label="Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          margin="normal"
          fullWidth
          label="Bio"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Tell something about yourself..."
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isPending}>
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          disabled={isPending || !name.trim()}
        >
          {isPending ? <LoaderSpinner size={20} /> : "Save Changes"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};