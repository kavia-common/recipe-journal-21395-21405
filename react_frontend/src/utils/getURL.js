//
// PUBLIC_INTERFACE
export const getURL = () => {
  // CRA build exposes REACT_APP_* variables
  let url = process.env.REACT_APP_SITE_URL || 'http://localhost:3000';
  if (!url.startsWith('http')) url = `https://${url}`;
  if (!url.endsWith('/')) url = `${url}/`;
  return url;
};
