export default function populateURL(url, params) {
  let newUrl = url;
  Object.keys(params).forEach((key) => {
    newUrl = newUrl.replace(`:${key}`, params[key]);
  });
  return newUrl;
}
