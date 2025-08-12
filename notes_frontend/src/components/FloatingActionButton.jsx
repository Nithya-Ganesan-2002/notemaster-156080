import React from "react";

/**
 * FloatingActionButton renders a circular button fixed to bottom-right to create new notes.
 */

// PUBLIC_INTERFACE
export default function FloatingActionButton({ onClick, label = "New Note" }) {
  /** Render the floating action button. */
  return (
    <button className="fab" onClick={onClick} aria-label={label} title={label}>
      +
    </button>
  );
}
