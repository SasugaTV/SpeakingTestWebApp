// storageUtils.js: localStorage wrapper with JSON parse/stringify

export function getItem(key, defaultValue) {
  const stored = window.localStorage.getItem(key);
  if (stored === null) {
    return defaultValue;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return defaultValue;
  }
}

export function setItem(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}
