import React, { useEffect, useState } from 'react';

type User = {
  id_User: string;
  ten: string;
  tuoi: number;
  sdt: string;
  diaChi: string;
  ngayTao: string;
  trangThai: boolean;
};

const PAGE_SIZE = 10;

const A2: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // Fetch dữ liệu từ API
  const fetchUsers = () => {
    fetch('http://localhost:5000/api/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
      })
      .catch(err => console.error('Lỗi khi fetch dữ liệu:', err));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Tìm kiếm
  const filteredUsers = users.filter(user =>
    user.ten.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.sdt.includes(searchTerm) ||
    user.diaChi.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / PAGE_SIZE);
  const pagedUsers = filteredUsers.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handleEdit = (id: string) => {
    const user = users.find(u => u.id_User === id);
    if (user) setEditingUser(user);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Bạn có chắc muốn xóa user này không?')) {
      fetch(`http://localhost:5000/api/users/${id}`, {
        method: 'DELETE',
      })
        .then(res => {
          if (res.ok) {
            alert('Xóa thành công');
            fetchUsers();
          } else {
            alert('Xóa thất bại');
          }
        })
        .catch(err => console.error('Lỗi xóa:', err));
    }
  };

  const handleUpdate = () => {
    if (editingUser) {
      fetch(`http://localhost:5000/api/users/update`, {
        method: 'POST', // hoặc PUT tùy API bạn thiết kế
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingUser),
      })
        .then(res => {
          if (res.ok) {
            alert('Cập nhật thành công');
            setEditingUser(null);
            fetchUsers();
          } else {
            alert('Cập nhật thất bại');
          }
        })
        .catch(err => console.error('Lỗi cập nhật:', err));
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: 'auto', padding: 20 }}>
      <h2>Danh sách Users</h2>

      <input
        type="text"
        placeholder="Tìm kiếm theo tên, số điện thoại hoặc địa chỉ..."
        value={searchTerm}
        onChange={e => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
        }}
        style={{
          padding: '8px',
          width: '100%',
          maxWidth: 400,
          marginBottom: 20,
          fontSize: 16,
        }}
      />

      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        }}
      >
        <thead style={{ backgroundColor: '#3498db', color: 'white' }}>
          <tr>
            <th style={{ padding: 8, border: '1px solid #ddd' }}>Tên</th>
            <th style={{ padding: 8, border: '1px solid #ddd' }}>Tuổi</th>
            <th style={{ padding: 8, border: '1px solid #ddd' }}>SĐT</th>
            <th style={{ padding: 8, border: '1px solid #ddd' }}>Địa chỉ</th>
            <th style={{ padding: 8, border: '1px solid #ddd' }}>Ngày tạo</th>
            <th style={{ padding: 8, border: '1px solid #ddd' }}>Trạng thái</th>
            <th style={{ padding: 8, border: '1px solid #ddd' }}>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {pagedUsers.length === 0 && (
            <tr>
              <td colSpan={7} style={{ textAlign: 'center', padding: 20 }}>
                Không tìm thấy dữ liệu
              </td>
            </tr>
          )}
          {pagedUsers.map(user => (
            <tr key={user.id_User}>
              <td style={{ padding: 8, border: '1px solid #ddd' }}>{user.ten}</td>
              <td style={{ padding: 8, border: '1px solid #ddd' }}>{user.tuoi}</td>
              <td style={{ padding: 8, border: '1px solid #ddd' }}>{user.sdt}</td>
              <td style={{ padding: 8, border: '1px solid #ddd' }}>{user.diaChi}</td>
              <td style={{ padding: 8, border: '1px solid #ddd' }}>
                {new Date(user.ngayTao).toLocaleDateString()}
              </td>
              <td style={{ padding: 8, border: '1px solid #ddd' }}>
                {user.trangThai ? 'Hoạt động' : 'Không hoạt động'}
              </td>
              <td style={{ padding: 8, border: '1px solid #ddd' }}>
                <button onClick={() => handleEdit(user.id_User)} style={{ marginRight: 8 }}>
                  Sửa
                </button>
                <button onClick={() => handleDelete(user.id_User)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Form sửa - popup */}
      {editingUser && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: 30,
              borderRadius: 10,
              maxWidth: 500,
              width: '100%',
              boxShadow: '0 0 10px rgba(0,0,0,0.3)',
            }}
          >
            <h3>Sửa User</h3>
            <div style={{ marginBottom: 10 }}>
              <label>Tên:</label>
              <input
                type="text"
                value={editingUser.ten}
                onChange={e => setEditingUser({ ...editingUser, ten: e.target.value })}
                style={{ width: '100%', padding: 8 }}
              />
            </div>
            <div style={{ marginBottom: 10 }}>
              <label>Tuổi:</label>
              <input
                type="number"
                value={editingUser.tuoi}
                onChange={e => setEditingUser({ ...editingUser, tuoi: +e.target.value })}
                style={{ width: '100%', padding: 8 }}
              />
            </div>
            <div style={{ marginBottom: 10 }}>
              <label>SĐT:</label>
              <input
                type="text"
                value={editingUser.sdt}
                onChange={e => setEditingUser({ ...editingUser, sdt: e.target.value })}
                style={{ width: '100%', padding: 8 }}
              />
            </div>
            <div style={{ marginBottom: 10 }}>
              <label>Địa chỉ:</label>
              <input
                type="text"
                value={editingUser.diaChi}
                onChange={e => setEditingUser({ ...editingUser, diaChi: e.target.value })}
                style={{ width: '100%', padding: 8 }}
              />
            </div>
            <div style={{ marginBottom: 10 }}>
              <label>Trạng thái:</label>
              <select
                value={editingUser.trangThai ? 'true' : 'false'}
                onChange={e =>
                  setEditingUser({ ...editingUser, trangThai: e.target.value === 'true' })
                }
                style={{ width: '100%', padding: 8 }}
              >
                <option value="true">Hoạt động</option>
                <option value="false">Không hoạt động</option>
              </select>
            </div>
            <div style={{ marginTop: 20, textAlign: 'right' }}>
              <button onClick={handleUpdate} style={{ marginRight: 10 }}>
                Lưu thay đổi
              </button>
              <button onClick={() => setEditingUser(null)}>Đóng</button>
            </div>
          </div>
        </div>
      )}

      {/* Phân trang */}
      <div
        style={{
          marginTop: 20,
          display: 'flex',
          justifyContent: 'center',
          gap: 10,
        }}
      >
        <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
          Trước
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => goToPage(i + 1)}
            style={{
              fontWeight: currentPage === i + 1 ? 'bold' : 'normal',
              backgroundColor: currentPage === i + 1 ? '#3498db' : undefined,
              color: currentPage === i + 1 ? 'white' : undefined,
              borderRadius: 5,
              padding: '4px 8px',
              cursor: 'pointer',
              border: '1px solid #ccc',
            }}
          >
            {i + 1}
          </button>
        ))}
        <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
          Sau
        </button>
      </div>
    </div>
  );
};

export default A2;
