// VanBanPage.tsx
import React, { useState } from 'react';
import VanBanChiTiet from './vanbanchitiet';
import { useParams, useNavigate } from 'react-router-dom';

const VanBanPage: React.FC = () => {
  const { id } = useParams();  // Lấy id từ url params, ví dụ /vanban/123
  const idVanBan = Number(id);
  const navigate = useNavigate();

  const handleClose = () => {
    // Quay lại trang trước hoặc trang danh sách
    navigate(-1);
  };

  if (!idVanBan) {
    return <div>ID văn bản không hợp lệ</div>;
  }

  return <VanBanChiTiet idVanBan={idVanBan} onClose={handleClose} />;
};

export default VanBanPage;
