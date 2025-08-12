import React, { useEffect, useMemo, useState } from "react";
import "./App.css";

import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import Sidebar from "./components/Sidebar";
import NoteEditor from "./components/NoteEditor";
import FloatingActionButton from "./components/FloatingActionButton";
import { listNotes, getNote, createNote, updateNote, deleteNote } from "./services/api";

/**
 * Main App component orchestrating layout and data flow between UI and API.
 */

// PUBLIC_INTERFACE
export default function App() {
  /** Render the notes application */
  const [notes, setNotes] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Load notes on mount
  useEffect(() => {
    // Avoid triggering real network calls during tests
    if (process.env.NODE_ENV === 'test') {
      return;
    }
    let mounted = true;
    setLoading(true);
    listNotes()
      .then((data) => {
        if (!mounted) return;
        const sorted = (data || []).sort(
          (a, b) => new Date(b.updated_at || 0) - new Date(a.updated_at || 0)
        );
        setNotes(sorted);
        if (sorted.length > 0) {
          setSelectedId(sorted[0].id);
        }
      })
      .catch((e) => setError(String(e?.message || e)))
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  const selectedNote = useMemo(
    () => notes.find((n) => n.id === selectedId) || null,
    [notes, selectedId]
  );

  const filteredNotes = useMemo(() => {
    const q = (search || "").toLowerCase();
    if (!q) return notes;
    return notes.filter((n) => {
      const t = (n.title || "").toLowerCase();
      const c = (n.content || "").toLowerCase();
      return t.includes(q) || c.includes(q);
    });
  }, [search, notes]);

  async function handleSelectNote(id) {
    setSelectedId(id);
    try {
      const fresh = await getNote(id);
      setNotes((prev) =>
        prev.map((n) => (n.id === id ? { ...n, ...fresh } : n))
      );
    } catch (e) {
      setError(String(e?.message || e));
    }
  }

  async function handleCreateNote() {
    setSaving(true);
    try {
      const note = await createNote({ title: "Untitled", content: "" });
      setNotes((prev) => [note, ...prev]);
      setSelectedId(note.id);
    } catch (e) {
      setError(String(e?.message || e));
    } finally {
      setSaving(false);
    }
  }

  function handleChangeTitle(title) {
    if (!selectedNote) return;
    setNotes((prev) =>
      prev.map((n) => (n.id === selectedNote.id ? { ...n, title } : n))
    );
  }

  function handleChangeContent(content) {
    if (!selectedNote) return;
    setNotes((prev) =>
      prev.map((n) => (n.id === selectedNote.id ? { ...n, content } : n))
    );
  }

  async function handleSave() {
    if (!selectedNote) return;
    setSaving(true);
    try {
      const updated = await updateNote(selectedNote.id, {
        title: selectedNote.title ?? "",
        content: selectedNote.content ?? ""
      });
      setNotes((prev) =>
        prev
          .map((n) => (n.id === selectedNote.id ? updated : n))
          .sort((a, b) => new Date(b.updated_at || 0) - new Date(a.updated_at || 0))
      );
    } catch (e) {
      setError(String(e?.message || e));
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!id) return;
    try {
      await deleteNote(id);
      setNotes((prev) => prev.filter((n) => n.id !== id));
      if (selectedId === id) {
        const next = notes.find((n) => n.id !== id);
        setSelectedId(next?.id ?? null);
      }
    } catch (e) {
      setError(String(e?.message || e));
    }
  }

  return (
    <div className="app-shell">
      <Header />
      <div className="main">
        <div className="left-pane">
          <SearchBar value={search} onChange={setSearch} />
          <Sidebar
            notes={filteredNotes}
            selectedId={selectedId}
            onSelect={handleSelectNote}
            onDelete={handleDelete}
          />
        </div>
        <div className="right-pane">
          {loading ? (
            <div className="loading">Loading...</div>
          ) : (
            <NoteEditor
              note={selectedNote}
              onChangeTitle={handleChangeTitle}
              onChangeContent={handleChangeContent}
              onSave={handleSave}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>

      <FloatingActionButton onClick={handleCreateNote} />

      {saving && <div className="status-toast">Saving...</div>}
      {error && (
        <div className="error-toast" role="alert" onClick={() => setError("")}>
          {String(error)}
        </div>
      )}
    </div>
  );
}
