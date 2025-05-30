import React, { useState, useRef, useEffect } from "react";

const UserInfo: React.FC<{
  user: any;
  onLogout: () => void;
}> = ({ user, onLogout }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [imgSrc, setImgSrc] = useState(user.avatar || "/avatars/default.png"); // giữ src trong state
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

  // Nếu user.avatar thay đổi (ví dụ khi user được cập nhật), cập nhật lại imgSrc
  useEffect(() => {
    setImgSrc(user.avatar || "/avatars/default.png");
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
        onError={() => setImgSrc("/avatars/default.png")} // fallback chỉ set state 1 lần, tránh vòng lặp
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
