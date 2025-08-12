import React from "react";

/**
 * Sidebar renders a list of notes with selection and quick delete.
 * It is scrollable and responsive.
 */

// PUBLIC_INTERFACE
export default function Sidebar({ notes, selectedId, onSelect, onDelete }) {
  /** Render the sidebar list of notes. */
  return (
    <aside className="sidebar">
      <div className="sidebar-list" role="list">
        {notes.length === 0 ? (
          <div className="empty">No notes yet</div>
        ) : (
          notes.map((note) => {
            const isActive = note.id === selectedId;
            const updated = note.updated_at ? new Date(note.updated_at) : null;
            const subtitle = updated ? updated.toLocaleString() : "";
            return (
              <div
                role="listitem"
                key={note.id}
                className={`note-list-item ${isActive ? "active" : ""}`}
                onClick={() => onSelect(note.id)}
              >
                <div className="note-list-item-title" title={note.title || "Untitled"}>
                  {note.title || "Untitled"}
                </div>
                <div className="note-list-item-subtitle">{subtitle}</div>
                <button
                  className="note-list-item-delete"
                  aria-label={`Delete ${note.title || "note"}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(note.id);
                  }}
                  title="Delete note"
                >
                  ×
                </button>
              </div>
            );
          })
        )}
      </div>
    </aside>
  );
}
