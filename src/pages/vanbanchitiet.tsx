import React, { useEffect, useState } from "react";
import "../styles/vanbanchitiet.css";

interface FileVanBan {
  fileId: string;
  vanBanId: string;
  tenFile: string;
  duongDan: string;
  loaiFile: string;
  ngayTao: string;
}

interface Comment {
  idComment: string;
  noiDung: string;
  ngayTao: string;
  replyTo: string | null;
  tenNguoiDung: string;
  avatarNguoiDung: string | null;
}

interface VanBanChiTietProps {
  idVanBan: string | null;
}

const VanBanChiTiet: React.FC<VanBanChiTietProps> = ({ idVanBan }) => {
  const [data, setData] = useState<{
    idVanBan: string;
    noiDung: string;
    noiPhatHanh: string;
    ngayVB: string;
    fileVanBanList: FileVanBan[];
    commentList: Comment[];
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!idVanBan) {
      setData(null);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    fetch("http://localhost:5000/api/nv/vanban/details", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id_vanban: idVanBan }),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Lỗi server: ${res.status}`);
        return res.json();
      })
      .then((jsonData) => {
        setData(jsonData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [idVanBan]);

  if (loading) return <div className="vanbanchitiet-container">Đang tải chi tiết...</div>;
  if (error) return <div className="vanbanchitiet-container error">Lỗi: {error}</div>;
  if (!data) return <div className="vanbanchitiet-container">Chọn một văn bản để xem chi tiết.</div>;

  return (
    <div className="vanbanchitiet-container">
      <h3>Chi tiết văn bản</h3>
      <p><strong>ID:</strong> {data.idVanBan}</p>
      <p><strong>Nội dung:</strong> {data.noiDung}</p>
      <p><strong>Nơi phát hành:</strong> {data.noiPhatHanh}</p>
      <p><strong>Ngày VB:</strong> {data.ngayVB}</p>
      <p><strong>File đính kèm:</strong></p>
      <ul>
        {data.fileVanBanList.map(file => (
          <li key={file.fileId}>
            <a href={file.duongDan} target="_blank" rel="noopener noreferrer">{file.tenFile}</a> ({file.loaiFile})
          </li>
        ))}
      </ul>
      <p><strong>Bình luận:</strong></p>
      <ul>
        {data.commentList.map(comment => (
          <li key={comment.idComment}>
            <img
              src={comment.avatarNguoiDung || "/default-avatar.png"}
              alt={comment.tenNguoiDung}
              className="avatar"
            />
            <strong>{comment.tenNguoiDung}:</strong> {comment.noiDung} <em>({new Date(comment.ngayTao).toLocaleString()})</em>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VanBanChiTiet;
