import React, { useState } from 'react';
import '../styles/A1.css';

const A1: React.FC = () => {
  const [checked, setChecked] = useState(false);
  const [selectedOption, setSelectedOption] = useState('option1');

  return (
    <div className="a1-container">
      <h2>Trang A1 với các nút và lựa chọn</h2>

      <div className="buttons">
        <button onClick={() => alert('Bạn bấm nút 1')}>Nút 1</button>
        <button onClick={() => alert('Bạn bấm nút 2')}>Nút 2</button>
        <button onClick={() => alert('Bạn bấm nút 3')}>Nút 3</button>
      </div>

      <div className="scroll-area">
        <p>Đây là vùng nội dung có thể scroll khi vượt quá chiều cao...</p>
        {[...Array(20)].map((_, i) => (
          <p key={i}>Dòng nội dung số {i + 1}</p>
        ))}
      </div>

      <div className="choices">
        <label>
          <input
            type="checkbox"
            checked={checked}
            onChange={e => setChecked(e.target.checked)}
          />
          Checkbox: Bật/Tắt
        </label>

        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="options"
              value="option1"
              checked={selectedOption === 'option1'}
              onChange={e => setSelectedOption(e.target.value)}
            />
            Lựa chọn 1
          </label>
          <label>
            <input
              type="radio"
              name="options"
              value="option2"
              checked={selectedOption === 'option2'}
              onChange={e => setSelectedOption(e.target.value)}
            />
            Lựa chọn 2
          </label>
          <label>
            <input
              type="radio"
              name="options"
              value="option3"
              checked={selectedOption === 'option3'}
              onChange={e => setSelectedOption(e.target.value)}
            />
            Lựa chọn 3
          </label>
        </div>
      </div>
    </div>
  );
};

export default A1;
