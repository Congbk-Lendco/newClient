import React, { useEffect, useState } from "react";
import type { KeyboardEvent } from "react";
import UserAvatarName from "./UserAvatarName";
import "../styles/vanbanchitiet.css";

interface VanBanChiTietProps {
  idVanBan: string | null;
  onClose: () => void;
}

interface FileVanBanDto {
  fileId: string;
  vanBanId: string;
  tenFile: string;
  duongDan: string;
  loaiFile: string;
  ngayTao: string;
}

interface CommentDto {
  idComment: string;
  noiDung: string;
  ngayTao: string;
  replyTo: string | null;
  tenNguoiDung: string;
  avatarNguoiDung: string | null;
}

interface VanBanDetaiList {
  idVanBan: string;
  noiDung: string;
  noiPhatHanh: string;
  ngayVB: string;
  nguoiTaoId?: string | null;
  tenNguoiTao?: string | null;
  avatarNguoiTao?: string | null;
  fileVanBanList: FileVanBanDto[];
  commentList: CommentDto[];
}

// Hàm chuyển đường dẫn server thành URL truy cập web
function toWebUrl(path: string | null | undefined): string | undefined {
  if (!path) return undefined;
  return path.replace(/\\/g, "/").replace(/^wwwroot\//i, "/");
}

const VanBanChiTiet: React.FC<VanBanChiTietProps> = ({ idVanBan, onClose }) => {
  const [detail, setDetail] = useState<VanBanDetaiList | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [commentInput, setCommentInput] = useState("");

  // Giả sử lấy nguoiDungId từ localStorage hoặc nơi lưu thông tin user đăng nhập
  // Nếu bạn có context hoặc redux thì lấy ở đó nhé
  const nguoiDungId = localStorage.getItem("nguoiDungId") || "ff5d9e18-f2d2-4b3e-a648-1d288b349fc3";

  // Load chi tiết văn bản
  useEffect(() => {
    if (!idVanBan) {
      setDetail(null);
      setError(null);
      return;
    }
    setLoading(true);
    setError(null);

    fetch("http://localhost:5000/api/nv/vanban/details", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ IdVanBan: idVanBan }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorBody = await res.json();
          throw new Error(errorBody.message || "Lỗi khi lấy chi tiết văn bản");
        }
        return res.json();
      })
      .then((data) => setDetail(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [idVanBan]);

  // Gửi bình luận mới
  // ...

  const handleSendComment = () => {
    if (!commentInput.trim() || !idVanBan || !nguoiDungId) return;

    const newComment = {
      VanBanId: idVanBan,       // Đổi tên từ IdVanBan thành VanBanId
      NoiDung: commentInput.trim(),
      NguoiDungId: nguoiDungId,
      ReplyTo: null,
    };

    fetch("http://localhost:5000/api/nv/add-comment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newComment),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Lỗi khi gửi bình luận");
        return res.json();
      })
      .then(() => {
        setCommentInput("");
        // Reload lại chi tiết để lấy comment mới
        setLoading(true);
        fetch("http://localhost:5000/api/nv/vanban/details", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ IdVanBan: idVanBan }),
        })
          .then((res) => res.json())
          .then((data) => setDetail(data))
          .finally(() => setLoading(false));
      })
      .catch((err) => alert(err.message));
  };

  // ...

  // Bắt phím Enter để gửi comment
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendComment();
    }
  };

  if (!idVanBan) return null;

  if (loading)
    return (
      <>
        <div className="vanban-overlay" onClick={onClose}></div>
        <div className="vanban-detail centered">Đang tải chi tiết...</div>
      </>
    );

  if (error)
    return (
      <>
        <div className="vanban-overlay" onClick={onClose}></div>
        <div className="vanban-detail centered" style={{ color: "red" }}>
          Lỗi: {error}
          <button className="close-btn" onClick={onClose} aria-label="Đóng">
            &times;
          </button>
        </div>
      </>
    );

  if (!detail) return null;

  return (
    <>
      <div className="vanban-overlay" onClick={onClose}></div>

      <div className="vanban-detail" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose} aria-label="Đóng">
          &times;
        </button>

        <h2>Chi tiết văn bản</h2>

        <table>
          <tbody>
            <tr>
              <td>Nội dung</td>
              <td>{detail.noiDung}</td>
            </tr>
            <tr>
              <td>Nơi phát hành</td>
              <td>{detail.noiPhatHanh}</td>
            </tr>
            <tr>
              <td>Ngày văn bản</td>
              <td>{new Date(detail.ngayVB).toLocaleDateString()}</td>
            </tr>
            <tr>
              <td>Người tạo</td>
              <td className="creator-cell">
                <UserAvatarName
                  avatar={toWebUrl(detail.avatarNguoiTao)}
                  name={detail.tenNguoiTao}
                  className="creator-avatar"
                />
              </td>
            </tr>
          </tbody>
        </table>

        <div className="vanban-content">
          <div className="file-preview">
            <h3>Xem file đính kèm</h3>
            {detail.fileVanBanList.length === 0 ? (
              <p>Không có file đính kèm</p>
            ) : (
              (() => {
                const file = detail.fileVanBanList[0];
                const url = toWebUrl(file.duongDan);
                if (!url) return <p>File không hợp lệ</p>;

                if (file.loaiFile === "pdf") {
                  return (
                    <iframe
                      src={url}
                      title="Xem file PDF"
                      width="100%"
                      height="600px"
                      frameBorder="0"
                    ></iframe>
                  );
                } else if (
                  file.loaiFile.startsWith("image") ||
                  /\.(jpg|jpeg|png|gif)$/i.test(file.tenFile)
                ) {
                  return (
                    <img
                      src={url}
                      alt={file.tenFile}
                      style={{ maxWidth: "100%", maxHeight: "600px" }}
                    />
                  );
                } else {
                  return (
                    <a href={url} target="_blank" rel="noopener noreferrer">
                      Tải file: {file.tenFile}
                    </a>
                  );
                }
              })()
            )}
          </div>

          <div className="comment-section">
            <h3>Bình luận</h3>
            <ul className="comment-list">
              {detail.commentList.length === 0 && <li>Không có bình luận</li>}
              {detail.commentList.map((cmt) => (
                <li key={cmt.idComment} className="comment-item">
                  <UserAvatarName
                    avatar={toWebUrl(cmt.avatarNguoiDung)}
                    name={cmt.tenNguoiDung}
                  />
                  <div className="comment-content">
                    <div>{cmt.noiDung}</div>
                    <small>{new Date(cmt.ngayTao).toLocaleString()}</small>
                  </div>
                </li>
              ))}
            </ul>

            {/* Input bình luận */}
            <div className="comment-input-wrapper">
              <input
                type="text"
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Viết bình luận..."
                className="comment-input"
              />
              <button onClick={handleSendComment} className="send-comment-btn">
                Gửi
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VanBanChiTiet;
