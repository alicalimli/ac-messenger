import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { useAppDispatch } from "hooks/use-reducer-hooks/useReducerHooks";
import React, { useState } from "react";
import { storage } from "setup/firebase";
import { createToast } from "toastSlice";
import { v4 as uuid } from "uuid";

type uploadImgParams = {
  imageFile: File;
  imageInputRef: React.Ref<HTMLInputElement>;
};

const useUploadImage = () => {
  const [imgURL, setImgURL] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isImgPending, setIsImgPending] = useState(false);
  const [imageStorageName, setImageStorageName] = useState("");

  const dispatch = useAppDispatch();

  const uploadImg = async ({ imageFile, imageInputRef }: uploadImgParams) => {
    try {
      setIsImgPending(true);
      const imageUpload = imageFile;

      if (!imageUpload || !imageInputRef) return;

      const imageName = `images/${imageUpload.name + uuid()}`;
      const imageRef = ref(storage, imageName);

      setImageStorageName(imageName);
      console.log(imageInputRef);

      const upBytes = await uploadBytes(imageRef, imageUpload);
      const downloadURL = await getDownloadURL(upBytes.ref);

      imageInputRef.current.value = "";
      setImgURL((state) => downloadURL);
      setIsImgPending(false);
      dispatch(createToast("profile picture changed."));
    } catch (error) {
      imageInputRef.current.value = "";
      setIsImgPending(false);
      dispatch(createToast("something went wrong."));
    }
  };

  const removeUploadImg = () => {
    if (!imageStorageName) return;

    const imageRef = ref(storage, imageStorageName);
    deleteObject(imageRef);

    setImgURL("");
    setImageStorageName("");
  };

  return { uploadImg, removeUploadImg, imgURL, isImgPending, errorMsg };
};

export default useUploadImage;
