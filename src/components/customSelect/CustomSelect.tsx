import { useState, useEffect, useRef, MouseEventHandler } from "react";
import "./CustomSelect.scss";

type SelectProps = {
  selected: string | null;
  options: string[];
  placeholder?: string;
  mode?: "rows" | "cells";
  onChange?: (selected: string) => void;
  onClose?: () => void;
};

type OptionProps = {
  value: string;
  onClick: (value: string) => void;
};

export default function CustomSelect(props: SelectProps) {
  const {
    mode = "rows",
    options,
    placeholder,
    selected,
    onChange,
    onClose,
  } = props;
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const { target } = event;
      if (target instanceof Node && !rootRef.current?.contains(target)) {
        isOpen && onClose?.();
        setIsOpen(false);
      }
    };

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [isOpen, onClose]);

  const handleOptionClick = (value: string) => {
    setIsOpen(false);
    onChange?.(value);
  };

  useEffect(() => {
    const placeholderEl = placeholderRef.current;
    if (!placeholderEl) return;

    const handleClick = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        setIsOpen((prev) => !prev);
      }
    };

    placeholderEl.addEventListener("keydown", handleClick);

    return () => {
      placeholderEl.removeEventListener("keydown", handleClick);
    };
  }, []);

  const handlePlaceHolderClick: MouseEventHandler<HTMLDivElement> = () => {
    setIsOpen((prev) => !prev);
  };

  function Option(props: OptionProps) {
    const { value, onClick } = props;

    const handleClick =
      (clickedValue: string): MouseEventHandler<HTMLLIElement> =>
      () => {
        onClick(clickedValue);
      };

    const optionRef = useRef<HTMLLIElement>(null);

    useEffect(() => {
      const option = optionRef.current;
      if (!option) return;

      const handleEnterPress = (event: KeyboardEvent) => {
        if (document.activeElement === option && event.key === "Enter") {
          onClick(value);
        }
      };

      option.addEventListener("keydown", handleEnterPress);

      return () => {
        option.removeEventListener("keydown", handleEnterPress);
      };
    }, [value, onClick]);

    return (
      <li
        className="option"
        ref={optionRef}
        value={value}
        onClick={handleClick(value)}
        tabIndex={0}
      >
        {value}
      </li>
    );
  }

  return (
    <div
      className="custom-select"
      data-testid="custom-select"
      ref={rootRef}
      data-is-active={isOpen}
      data-mode={mode}
    >
      <div
        className="custom-select__select"
        data-testid="custom-select-select"
        ref={placeholderRef}
        data-selected={selected}
        role="button"
        onClick={handlePlaceHolderClick}
        tabIndex={0}
      >
        {isOpen ? placeholder : selected}
        <div className="custom-select__svg">
          <svg
            className={
              isOpen ? "svg-chevron-down-opened" : "svg-chevron-down-closed"
            }
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>
      </div>
      {isOpen && (
        <ul
          className="custom-select__dropdown-menu"
          data-testid="custom-select-dropdown-menu"
        >
          {options.map((option) => (
            <Option key={option} value={option} onClick={handleOptionClick} />
          ))}
        </ul>
      )}
    </div>
  );
}
