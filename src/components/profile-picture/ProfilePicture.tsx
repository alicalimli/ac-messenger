import React from "react";

type sizesType = "small" | "medium" | "large";

const DEFAULT_PROFILE_IMAGE = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRony1PUEAFW_rKWuriSeChlMZK05SNCoyhblOQpH5tBq1m5C_HHsKEJvveSdHRdSj_zJ4&usqp=CAU`;

interface ProfilePictureProps {
  photoURL: string | undefined;
  isOnline: boolean;
  size: sizesType;
  className?: string;
}

const ProfilePicture = ({
  photoURL,
  isOnline,
  size,
  className,
}: ProfilePictureProps): JSX.Element => {
  const onlineClass = isOnline ? "bg-green-500" : "";

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    e.target.src = DEFAULT_PROFILE_IMAGE;
  };

  const getSizeClass = (size: sizesType) => {
    switch (size) {
      case "small":
        return "w-12 h-12";
      case "medium":
        return "w-14 h-14";
      case "large":
        return "w-16 h-16";
    }
  };

  return (
    <div className={`${className} relative bg-transparent shrink-0`}>
      <div
        className={`${onlineClass} p-1.5 rounded-full absolute right-0 bottom-0`}
      ></div>
      <img
        src={photoURL || ""}
        onError={handleImageError}
        className={`${getSizeClass(size)} object-cover rounded-[50%]`}
      />
    </div>
  );
};

export default ProfilePicture;
