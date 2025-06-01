import React, { useEffect, useState } from "react";
import "../styles/vanbanchitiet.css";

interface VanBanChiTietProps {
  idVanBan: string | null;
  onClose: () => void; // Prop đóng modal
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

const VanBanChiTiet: React.FC<VanBanChiTietProps> = ({ idVanBan, onClose }) => {
  const [detail, setDetail] = useState<VanBanDetaiList | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
            {/* Phần hiển thị người tạo ngay dưới ngày văn bản */}
            <tr>
              <td>Người tạo</td>
              <td className="creator-cell">
                {detail.avatarNguoiTao ? (
                  <img
                    src={detail.avatarNguoiTao}
                    alt={`${detail.tenNguoiTao} avatar`}
                    className="avatar creator-avatar"
                  />
                ) : (
                  <div className="avatar creator-avatar" />
                )}
                <span>{detail.tenNguoiTao || "Không xác định"}</span>
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
              <iframe
                src={detail.fileVanBanList[0].duongDan}
                title="Xem file"
                width="100%"
                height="100%"
                frameBorder="0"
              ></iframe>
            )}
          </div>

          <div className="comment-section">
            <h3>Bình luận</h3>
            <ul className="comment-list">
              {detail.commentList.length === 0 && <li>Không có bình luận</li>}
              {detail.commentList.map((cmt) => (
                <li key={cmt.idComment} className="comment-item">
                  {cmt.avatarNguoiDung ? (
                    <img
                      src={cmt.avatarNguoiDung}
                      alt={`${cmt.tenNguoiDung} avatar`}
                      className="avatar"
                    />
                  ) : (
                    <div className="avatar" />
                  )}
                  <div className="comment-content">
                    <strong>{cmt.tenNguoiDung}</strong>
                    <div>{cmt.noiDung}</div>
                    <small>{new Date(cmt.ngayTao).toLocaleString()}</small>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default VanBanChiTiet;
