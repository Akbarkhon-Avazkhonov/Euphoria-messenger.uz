export function blobToBuffer(blob) {
  return new Promise((resolve, reject) => {
    if (blob instanceof Buffer) {
      resolve(blob);
    } else if (blob instanceof ArrayBuffer) {
      resolve(Buffer.from(blob));
    } else if (typeof blob === 'string') {
      const base64Data = blob.replace(/^data:audio\/ogg;base64,/, '');
      resolve(Buffer.from(base64Data, 'base64'));
    } else {
      reject(new Error('Unsupported blob type'));
    }
  });
}
