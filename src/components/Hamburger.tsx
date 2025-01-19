import { useState } from "react";
import "../app/globals.css";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Hamburger: React.FC<Props> = ({ open, setOpen }) => {
  return (
    <button
      className={`hamburger ${open ? "open" : ""}`}
      onClick={() => setOpen(!open)}
      aria-label="Toggle Menu"
    >
      <span className="line line1"></span>
      <span className="line line2"></span>
      <span className="line line3"></span>
    </button>
  );
};

export default Hamburger;
