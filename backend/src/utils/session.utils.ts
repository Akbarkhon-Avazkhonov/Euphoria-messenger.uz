export function splitSession(cookie: string): string {
  const sessionValue = cookie
    .split(';')
    .find((part) => part.trim().startsWith('session='))
    .split('=')[1];

  return decodeURIComponent(decodeURIComponent(sessionValue));
}
