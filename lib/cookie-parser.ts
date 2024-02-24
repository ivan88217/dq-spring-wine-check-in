export const getCookies = () => {
  const REGEXP = /([\w\.]+)\s*=\s*(?:"((?:\\"|[^"])*)"|(.*?))\s*(?:[;,]|$)/g;
  let cookies: Record<string, any> = {};
  let match;
  while ((match = REGEXP.exec(document.cookie)) !== null) {
    const name = match[1];
    let value = match[2] || match[3];
    cookies[name] = decodeURIComponent(value);
  }
  return cookies;
}

export const setCookie = (name: string, value: any, expireInSecond: number) => {
  const d = new Date();
  d.setTime(d.getTime() + expireInSecond * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
};
