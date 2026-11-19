const escape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Renders `**bold**` spans in trusted copy from src/data as <strong>. */
export const emphasize = (s: string) => escape(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
