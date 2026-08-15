// Serializes a team to a compact, URL-safe, copy-pasteable code, and
// back. Skeleton implementation for now: plain base64 JSON. Swappable
// later for a more compact binary encoding if codes get too long.

export function encodeTeam(team) {
  const json = JSON.stringify(team);
  const bytes = new TextEncoder().encode(json);
  let binary = "";
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function decodeTeam(code) {
  const restored = code.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(restored);
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  const json = new TextDecoder().decode(bytes);
  return JSON.parse(json);
}

export function getTeamCodeFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("team");
}

export function setTeamCodeInUrl(code) {
  const url = new URL(window.location.href);
  url.searchParams.set("team", code);
  window.history.replaceState({}, "", url);
}
