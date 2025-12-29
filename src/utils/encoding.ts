export const encodeName = (name: string) =>
  btoa(name).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
export const decodeName = (encoded: string) => {
  try {
    return atob(encoded.replace(/-/g, '+').replace(/_/g, '/'));
  } catch {
    return '';
  }
};
