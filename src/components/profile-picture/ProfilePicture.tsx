type sizesType = "small" | "medium" | "large";

interface ProfilePictureProps {
  photoURL: string | undefined;
  isOnline: boolean;
  size: sizesType;
}

const ProfilePicture = ({
  photoURL,
  isOnline,
  size,
}: ProfilePictureProps): JSX.Element => {
  const onlineClass = isOnline ? "bg-green-500" : "";

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
    <div className="relative bg-transparent shrink-0">
      <div
        className={`${onlineClass} p-1.5 rounded-full absolute right-0 bottom-0`}
      ></div>
      <img
        src={photoURL || ""}
        className={`${getSizeClass(size)} object-cover rounded-[50%]`}
      />
    </div>
  );
};

export default ProfilePicture;
