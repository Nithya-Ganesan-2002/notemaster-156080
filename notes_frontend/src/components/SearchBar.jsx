import React from "react";

/**
 * SearchBar provides a controlled input for filtering note list by title/content.
 * The actual filtering is performed by the parent to keep this component stateless.
 */

// PUBLIC_INTERFACE
export default function SearchBar({ value, onChange, placeholder = "Search notes..." }) {
  /** Render the search input. */
  return (
    <div className="search-bar">
      <input
        aria-label="Search notes"
        type="search"
        className="search-input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
