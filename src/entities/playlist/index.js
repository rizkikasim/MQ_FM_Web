export const getPlaylistName = (playlists, id) => {
  const p = (playlists || []).find((x) => x.id === id);
  return p?.name || "Unknown";
};
