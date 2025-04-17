import { useState, useEffect } from "react";
import { savePostApi, unsavePostApi } from "../../api/savePostApi";
import { qcUpdateSaveStatus } from "../../state/tanstack/queryClient";

export const useSavePost = (postId: string, initialSaved: boolean) => {
  const [saved, setSaved] = useState(initialSaved);

  useEffect(() => {setSaved(initialSaved);}, [initialSaved]);

  const handleSaveClick = async () => {
    const newSave = !saved;
    setSaved(newSave);

    try {
      if (newSave) {
        await savePostApi(postId);
        qcUpdateSaveStatus(postId);

      } else {
        await unsavePostApi(postId);
        qcUpdateSaveStatus(postId);

      }
    } catch (error) {
      console.error("Error save/unsave post:", error);
      setSaved(!newSave); 
    }
  };

  return { saved, handleSaveClick };
};
