import React from "react";

/**
 * Header component displaying the application title.
 * Modern, minimalistic light theme using brand colors.
 */

// PUBLIC_INTERFACE
export default function Header() {
  /** Render the app header with the brand name. */
  return (
    <header className="app-header">
      <div className="header-title">Notemaster</div>
    </header>
  );
}
