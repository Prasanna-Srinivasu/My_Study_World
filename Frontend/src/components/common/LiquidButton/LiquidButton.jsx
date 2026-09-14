import { useRef } from "react";
import "./LiquidButton.css";

function LiquidButton({
  children = "LOGIN",
  type = "button",
  onClick,
  disabled = false,
}) {
  const buttonRef = useRef(null);

  const handlePointerMove = (event) => {
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    button.style.setProperty("--mouse-x", `${x}px`);
    button.style.setProperty("--mouse-y", `${y}px`);

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const moveX = ((x - centerX) / centerX) * 5;
    const moveY = ((y - centerY) / centerY) * 3;

    button.style.setProperty("--move-x", `${moveX}px`);
    button.style.setProperty("--move-y", `${moveY}px`);
  };

  const handlePointerLeave = () => {
    const button = buttonRef.current;
    if (!button) return;

    button.style.setProperty("--mouse-x", "50%");
    button.style.setProperty("--mouse-y", "50%");
    button.style.setProperty("--move-x", "0px");
    button.style.setProperty("--move-y", "0px");
  };

  return (
    <button
      ref={buttonRef}
      type={type}
      disabled={disabled}
      className="liquid-button"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={onClick}
    >
      <span className="liquid-button-blob" />
      <span className="liquid-button-content">
        {children}
        <span className="liquid-button-arrow">→</span>
      </span>
    </button>
  );
}

export default LiquidButton;