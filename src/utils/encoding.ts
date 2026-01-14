export const encodeName = (name: string) =>
  btoa(name).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
export const decodeName = (encoded: string) => {
  try {
    return atob(encoded.replace(/-/g, '+').replace(/_/g, '/'));
  } catch {
    return '';
  }
};

export const encodeWeddingData = (n1: string, n2: string, date: string) => {
  const data = `${n1}|${n2}|${date}`;
  return btoa(encodeURIComponent(data)).replace(/=/g, '');
};

export const decodeWeddingData = (encoded: string) => {
  try {
    const decoded = decodeURIComponent(atob(encoded));
    const [n1, n2, date] = decoded.split('|');
    return { n1, n2, date };
  } catch {
    return null;
  }
};
