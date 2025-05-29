// src/components/A.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/A.css';

const A: React.FC = () => {
  const [email, setEmail] = useState('');
  const [matKhau, setMatKhau] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          mat_khau: matKhau,
        }),
      });

      if (!response.ok) {
        throw new Error('Sai email hoặc mật khẩu');
      }

      const data = await response.json();
      localStorage.setItem('user', JSON.stringify(data)); // lưu thông tin user nếu cần dùng sau
      navigate('/A1'); // chuyển trang nếu thành công
    } catch (err: any) {
      setError(err.message || 'Lỗi đăng nhập');
    }
  };

  return (
    <div className="a-container">
      <header className="a-header">
        <h1>Đăng nhập LendCo</h1>
        <p>Nhập thông tin để tiếp tục</p>
      </header>

      <form className="a-login-form" onSubmit={handleLogin}>
        {error && <p className="error-text">{error}</p>}

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Mật khẩu:</label>
          <input
            type="password"
            value={matKhau}
            onChange={(e) => setMatKhau(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="login-button">Đăng nhập</button>
      </form>
    </div>
  );
};

export default A;
