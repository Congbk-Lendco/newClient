import React from "react";
import "../styles/vanbanchitiet.css";

interface UserAvatarNameProps {
  avatar?: string | null;
  name?: string | null;
  className?: string;
}

const UserAvatarName: React.FC<UserAvatarNameProps> = ({ avatar, name, className }) => {
  // Hàm chuẩn hóa đường dẫn ảnh
  const formatUrl = (url?: string | null) => {
    if (!url || url.trim() === "") return undefined;
    let fixedUrl = url.replace(/\\/g, "/");
    if (fixedUrl.startsWith("wwwroot/")) fixedUrl = fixedUrl.substring(7);
    if (!fixedUrl.startsWith("http") && !fixedUrl.startsWith("/")) {
      fixedUrl = `http://localhost:5000/${fixedUrl}`;
    } else if (fixedUrl.startsWith("/")) {
      fixedUrl = `http://localhost:5000${fixedUrl}`;
    }
    return fixedUrl;
  };

  const imgSrc = formatUrl(avatar);

  return (
    <div className={`user-avatar-name ${className || ""}`}>
      {imgSrc ? (
        <img src={imgSrc} alt={`${name || "user"} avatar`} className="avatar" />
      ) : (
        <div className="avatar placeholder" />
      )}
      <span>{name || "Không rõ"}</span>
    </div>
  );
};

export default UserAvatarName;
