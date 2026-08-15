import playlist from '../data/playlist.json'

/**
 * The only place the app reads playlist data.
 *
 * Today: returns the hardcoded JSON. Phase 2: replace the body with an
 * HTTP call (e.g. `await fetch('/api/playlist').then(r => r.json())`)
 * — the async signature stays the same, so no component changes.
 *
 * Returns fresh copies so callers can't mutate the imported module.
 */
export async function getPlaylist() {
  return playlist.map((track) => ({ ...track }))
}
