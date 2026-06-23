/**
 * Real location photos are referenced from Wikimedia Commons via the stable
 * Special:FilePath endpoint, which 302-redirects to the current upload and
 * supports an on-the-fly thumbnail width. All filenames were verified to exist
 * on Commons. Images render in the visitor's browser; components fall back to
 * the built-in vector art if a photo ever fails to load.
 */
export function commonsImg(filename: string, width = 1200) {
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(
    filename
  )}?width=${width}`;
}
