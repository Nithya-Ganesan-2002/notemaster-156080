"use strict";

/**
 * Simple API client for the Notes backend.
 * Uses a configurable base URL via REACT_APP_API_BASE_URL.
 * Falls back to relative paths when the env var is not provided (same-origin).
 */

const BASE_URL = (() => {
  // Safely read CRA-style env var at build time; avoid direct 'process' reference in browsers
  const envBase =
    typeof process !== "undefined" &&
    process.env &&
    process.env.REACT_APP_API_BASE_URL
      ? process.env.REACT_APP_API_BASE_URL
      : undefined;

  if (envBase) return envBase;

  // Optional runtime config injected via a global for non-CRA or runtime-based setups
  const runtimeBase =
    typeof window !== "undefined" &&
    window.__APP_CONFIG__ &&
    window.__APP_CONFIG__.API_BASE_URL
      ? window.__APP_CONFIG__.API_BASE_URL
      : undefined;

  return runtimeBase || "";
})();

/**
 * Internal request wrapper with sensible defaults and error handling.
 */
async function request(path, options = {}) {
  const url = `${BASE_URL}${path}`;
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {})
  };

  const resp = await fetch(url, { ...options, headers });
  if (!resp.ok) {
    let message = `Request failed with status ${resp.status}`;
    try {
      const text = await resp.text();
      // Provide backend-provided message if any
      if (text) message = text;
    } catch (_) {
      /* no-op */
    }
    const error = new Error(message);
    error.status = resp.status;
    throw error;
  }

  if (resp.status === 204) {
    return null;
  }

  try {
    return await resp.json();
  } catch {
    return null;
  }
}

// PUBLIC_INTERFACE
export async function listNotes({ offset = 0, limit = 500 } = {}) {
  /** Retrieve a paginated list of notes from the backend. */
  return request(`/notes?offset=${offset}&limit=${limit}`);
}

// PUBLIC_INTERFACE
export async function getNote(id) {
  /** Retrieve a single note by ID. */
  return request(`/notes/${id}`);
}

// PUBLIC_INTERFACE
export async function createNote({ title, content }) {
  /** Create a new note with given title and content. */
  return request(`/notes`, {
    method: "POST",
    body: JSON.stringify({ title, content })
  });
}

// PUBLIC_INTERFACE
export async function updateNote(id, { title = null, content = null } = {}) {
  /** Update an existing note. Fields are optional and will be patched. */
  return request(`/notes/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ title, content })
  });
}

// PUBLIC_INTERFACE
export async function deleteNote(id) {
  /** Delete a note by ID. Returns null on success (204). */
  return request(`/notes/${id}`, {
    method: "DELETE"
  });
}
