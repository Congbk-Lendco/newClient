import React, { useEffect, useState } from "react";
import "../styles/A2.css";
import FilterDropdown from "./FilterDropdown";

interface VanBan {
  id_vanban: string;
  ngayVB: string | null;
  soVB: string | null;
  noiphathanh: string | null;
  noidung: string | null;
  ngaynhanVB: string | null;
  ngaygiaoviec: string | null;
  ngaydukienhoanthanh: string | null;
  ketqua: string | null;
  donvichutri: string | null;
  donviphoihop: string | null;
  nguoi_tao_id: string | null;
  ykienchidao: string | null;
}

const PAGE_SIZE = 8;

const A2: React.FC = () => {
  const [data, setData] = useState<VanBan[]>([]);
  const [filteredData, setFilteredData] = useState<VanBan[]>([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterKetQua, setFilterKetQua] = useState<string>("");
  const [filterDonViChuTri, setFilterDonViChuTri] = useState<string>("");
  const [filterDonViPhoiHop, setFilterDonViPhoiHop] = useState<string>("");
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");

  useEffect(() => {
    fetch("http://localhost:5000/api/nv/vanban")
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => {
        console.error("Lỗi fetch:", err);
      });
  }, []);

  useEffect(() => {
    let temp = [...data];

    if (searchTerm.trim()) {
      const st = searchTerm.toLowerCase();
      temp = temp.filter(vb =>
        (vb.soVB?.toLowerCase().includes(st) ?? false) ||
        (vb.noidung?.toLowerCase().includes(st) ?? false) ||
        (vb.ketqua?.toLowerCase().includes(st) ?? false) ||
        (vb.donvichutri?.toLowerCase().includes(st) ?? false) ||
        (vb.donviphoihop?.toLowerCase().includes(st) ?? false)
      );
    }

    if (filterKetQua) {
      temp = temp.filter(vb => vb.ketqua === filterKetQua);
    }
    if (filterDonViChuTri) {
      temp = temp.filter(vb => vb.donvichutri === filterDonViChuTri);
    }
    if (filterDonViPhoiHop) {
      temp = temp.filter(vb => vb.donviphoihop === filterDonViPhoiHop);
    }

    if (dateFrom) {
      temp = temp.filter(vb => vb.ngayVB && vb.ngayVB >= dateFrom);
    }
    if (dateTo) {
      temp = temp.filter(vb => vb.ngayVB && vb.ngayVB <= dateTo);
    }

    setFilteredData(temp);
    setPage(1);
  }, [data, searchTerm, filterKetQua, filterDonViChuTri, filterDonViPhoiHop, dateFrom, dateTo]);

  const uniqueKetQua = Array.from(new Set(data.map(d => d.ketqua).filter(Boolean))) as string[];
  const uniqueDonViChuTri = Array.from(new Set(data.map(d => d.donvichutri).filter(Boolean))) as string[];
  const uniqueDonViPhoiHop = Array.from(new Set(data.map(d => d.donviphoihop).filter(Boolean))) as string[];

  const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);
  const pagedData = filteredData.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="a2-container">
      <h2>Danh sách Văn bản</h2>

      <div className="filters">
        <input
          type="text"
          placeholder="Tìm kiếm..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <FilterDropdown
          label="Kết quả"
          options={uniqueKetQua}
          selected={filterKetQua}
          onSelect={setFilterKetQua}
        />

        <FilterDropdown
          label="Đơn vị chủ trì"
          options={uniqueDonViChuTri}
          selected={filterDonViChuTri}
          onSelect={setFilterDonViChuTri}
        />

        <FilterDropdown
          label="Đơn vị phối hợp"
          options={uniqueDonViPhoiHop}
          selected={filterDonViPhoiHop}
          onSelect={setFilterDonViPhoiHop}
        />

        <div className="filter-group date-filter">
          <label>Từ ngày:</label>
          <input
            type="date"
            value={dateFrom}
            onChange={e => setDateFrom(e.target.value)}
          />
          <label>Đến ngày:</label>
          <input
            type="date"
            value={dateTo}
            onChange={e => setDateTo(e.target.value)}
          />
        </div>
      </div>

      {/* Phần bảng bạn muốn giữ nguyên hoặc tự xử lý */}
      <table className="vanban-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Số VB</th>
            <th>Ngày VB</th>
            <th>Nơi phát hành</th>
            <th>Nội dung</th>
            <th>Ngày nhận VB</th>
            <th>Ngày giao việc</th>
            <th>Ngày dự kiến hoàn thành</th>
            <th>Kết quả</th>
            <th>Đơn vị chủ trì</th>
            <th>Đơn vị phối hợp</th>
            {/* <th>Người tạo</th> */}
            <th>Ý kiến chỉ đạo</th>
          </tr>
        </thead>
        <tbody>
          {pagedData.length === 0 ? (
            <tr><td colSpan={13} style={{ textAlign: "center" }}>Không có dữ liệu</td></tr>
          ) : pagedData.map((vb, index) => (
            <tr key={vb.id_vanban}>
              <td>{(page - 1) * PAGE_SIZE + index + 1}</td>
              <td>{vb.soVB}</td>
              <td>{vb.ngayVB ? new Date(vb.ngayVB).toLocaleDateString() : ""}</td>
              <td>{vb.noiphathanh}</td>
              <td>{vb.noidung}</td>
              <td>{vb.ngaynhanVB ? new Date(vb.ngaynhanVB).toLocaleDateString() : ""}</td>
              <td>{vb.ngaygiaoviec ? new Date(vb.ngaygiaoviec).toLocaleDateString() : ""}</td>
              <td>{vb.ngaydukienhoanthanh ? new Date(vb.ngaydukienhoanthanh).toLocaleDateString() : ""}</td>
              <td>{vb.ketqua}</td>
              <td>{vb.donvichutri}</td>
              <td>{vb.donviphoihop}</td>
              {/* <td>{vb.nguoi_tao_id}</td> */}
              <td>{vb.ykienchidao}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button
          disabled={page <= 1}
          onClick={() => setPage(p => Math.max(1, p - 1))}
        >
          Prev
        </button>
        <span>Trang {page} / {totalPages}</span>
        <button
          disabled={page >= totalPages}
          onClick={() => setPage(p => Math.min(totalPages, p + 1))}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default A2;
