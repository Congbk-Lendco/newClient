import React, { useState, useRef, useEffect } from "react";

const UserInfo: React.FC<{
  user: any;
  onLogout: () => void;
}> = ({ user, onLogout }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  // Chuyển đường dẫn avatar local thành URL đầy đủ
  const formatAvatarUrl = (avatar: string) => {
    if (!avatar) return "/avatars/default.png";

    // Thay \ thành / cho chuẩn URL
    const normalizedPath = avatar.replace(/\\/g, "/");

    // Nếu đã là URL http(s) thì trả về nguyên
    if (normalizedPath.startsWith("http://") || normalizedPath.startsWith("https://")) {
      return normalizedPath;
    }

    // Nếu bắt đầu bằng "wwwroot", loại bỏ "wwwroot" và thêm địa chỉ server
    if (normalizedPath.startsWith("wwwroot/")) {
      // Giả sử server chạy localhost:5000, bạn đổi theo thực tế
      return "http://localhost:5000/" + normalizedPath.substring(7);
    }

    // Trường hợp khác thì trả về avatar như cũ
    return normalizedPath;
  };

  const [imgSrc, setImgSrc] = useState(formatAvatarUrl(user.avatar));

  console.log("User avatar:", user.avatar);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Nếu user.avatar thay đổi, cập nhật lại imgSrc đã format
  useEffect(() => {
    setImgSrc(formatAvatarUrl(user.avatar));
  }, [user.avatar]);

  return (
    <div
      className="user-info"
      ref={dropdownRef}
      onClick={() => setShowDropdown(prev => !prev)}
    >
      <img
        src={imgSrc}
        alt="avatar"
        className="user-avatar"
        onError={() => setImgSrc("/avatars/default.png")}
      />
      <div className="user-details">
        <strong>{user.tenNhanVien || "Không rõ"}</strong>
        <span>{user.tenChiNhanh || ""}</span>
      </div>

      {showDropdown && (
        <div className="user-dropdown">
          <button
            onClick={e => {
              e.stopPropagation();
              alert("Cài đặt chưa triển khai");
            }}
          >
            ⚙ Cài đặt
          </button>
          <button
            onClick={e => {
              e.stopPropagation();
              onLogout();
            }}
          >
            🚪 Thoát
          </button>
        </div>
      )}
    </div>
  );
};

export default React.memo(UserInfo);
