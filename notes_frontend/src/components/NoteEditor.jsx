import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

/**
 * NoteEditor renders a title input and a rich text editor for note content.
 * It exposes change and save actions via props.
 */

// PUBLIC_INTERFACE
export default function NoteEditor({
  note,
  onChangeTitle,
  onChangeContent,
  onSave,
  onDelete
}) {
  /** Render title + rich editor. */
  if (!note) {
    return (
      <div className="editor-empty">
        Select a note or create a new one.
      </div>
    );
  }

  return (
    <div className="editor">
      <div className="editor-toolbar">
        <input
          className="title-input"
          aria-label="Note title"
          type="text"
          placeholder="Untitled"
          value={note.title ?? ""}
          onChange={(e) => onChangeTitle(e.target.value)}
        />
        <div className="editor-actions">
          <button className="btn-outline" onClick={() => onDelete(note.id)} aria-label="Delete note">
            Delete
          </button>
          <button className="btn-primary" onClick={onSave} aria-label="Save note">
            Save
          </button>
        </div>
      </div>

      <div className="quill-wrapper">
        <ReactQuill
          theme="snow"
          value={note.content ?? ""}
          onChange={onChangeContent}
          placeholder="Start writing your note..."
          className="quill"
          modules={{
            toolbar: [
              [{ header: [1, 2, 3, false] }],
              ["bold", "italic", "underline", "strike"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["link", "blockquote", "code-block"],
              [{ align: [] }],
              [{ color: [] }, { background: [] }],
              ["clean"]
            ]
          }}
        />
      </div>
    </div>
  );
}
