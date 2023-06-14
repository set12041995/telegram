import React from "react";

export default function Button({ color = "blue", children, onClick }) {
  return (
    <div
      style={{
        background: color,
        padding: "5px 10px",
        margin: "5px auto",
        borderRadius: 7,
        width: "fit-content",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
