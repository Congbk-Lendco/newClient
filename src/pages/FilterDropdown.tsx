import React, { useState, useEffect, useRef } from "react";

interface FilterDropdownProps {
  label: string;
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  label,
  options,
  selected,
  onSelect,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="filter-dropdown" ref={ref}>
      <button
        className="filter-button"
        onClick={() => setOpen(o => !o)}
        type="button"
      >
        {label}: {selected || "Tất cả"} ▼
      </button>
      {open && (
        <div className="dropdown-list scrollbox">
          <div
            className={`dropdown-item ${selected === "" ? "selected" : ""}`}
            onClick={() => {
              onSelect("");
              setOpen(false);
            }}
          >
            Tất cả
          </div>
          {options.map(opt => (
            <div
              key={opt}
              className={`dropdown-item ${selected === opt ? "selected" : ""}`}
              onClick={() => {
                onSelect(opt);
                setOpen(false);
              }}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
