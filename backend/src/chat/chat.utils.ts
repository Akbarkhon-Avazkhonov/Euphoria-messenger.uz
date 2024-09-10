export function splitSession(cookie: string) {
  const sessionValue = cookie
    .split(';')
    .find((part) => part.trim().startsWith('session='))
    .split('=')[1];

  // Decode the session value twice
  const session = decodeURIComponent(decodeURIComponent(sessionValue));
  return session;
}

// Convert blob (either base64, ArrayBuffer, or Buffer) to a Node.js Buffer
export function blobToBuffer(blob) {
  return new Promise((resolve, reject) => {
    if (blob instanceof Buffer) {
      // Already a Buffer
      resolve(blob);
    } else if (blob instanceof ArrayBuffer) {
      // Convert ArrayBuffer to Buffer
      resolve(Buffer.from(blob));
    } else if (typeof blob === 'string') {
      // Assume base64-encoded string
      const base64Data = blob.replace(/^data:audio\/ogg;base64,/, '');
      resolve(Buffer.from(base64Data, 'base64'));
    } else {
      reject(new Error('Unsupported blob type'));
    }
  });
}
