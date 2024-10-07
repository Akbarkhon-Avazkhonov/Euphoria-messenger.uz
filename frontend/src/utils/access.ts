import { AccessKeys } from "@/types/access";

export // Константы для шифрования
const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || ''; // Ключ должен быть 32 символа для AES-256
const IV_LENGTH = 12; // Длина IV для AES-GCM

// Функция для преобразования строки в ArrayBuffer
function stringToArrayBuffer(str: string): any {
  return new TextEncoder().encode(str);
}

// Функция для преобразования ArrayBuffer в строку
function arrayBufferToString(buffer: ArrayBuffer): string {
  return new TextDecoder().decode(buffer);
}

// Функция для получения ключа шифрования из строки
async function getEncryptionKey(key: string): Promise<CryptoKey> {
  const keyBuffer = stringToArrayBuffer(key);
  return crypto?.subtle?.importKey(
    'raw', 
    keyBuffer, 
    { name: 'AES-GCM' },
    false, 
    ['encrypt', 'decrypt'],
  );
}

// Функция шифрования данных перед записью в куки
async function encryptData(data: string): Promise<string> {
  const key = await getEncryptionKey(ENCRYPTION_KEY);
  const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH)); // Генерация случайного IV

  const encryptedBuffer = await crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv: iv,
    },
    key,
    stringToArrayBuffer(data), // Преобразование строки в ArrayBuffer
  );

  // Объединяем IV и зашифрованные данные в одну строку Base64
  const combinedBuffer = new Uint8Array(iv.length + encryptedBuffer.byteLength);
  combinedBuffer.set(iv, 0);
  combinedBuffer.set(new Uint8Array(encryptedBuffer), iv.length);

  return btoa(String.fromCharCode(...combinedBuffer)); // Конвертация в строку Base64
}

// Функция для сохранения зашифрованных данных в куки
export async function setEncryptedCookie(name: string, value: Record<string, any>, maxAge: number = 86400): Promise<void> {
  console.log('Value:', value);
  const jsonString = JSON.stringify(value); // Преобразуем объект в строку JSON
  const encryptedValue = await encryptData(jsonString); // Шифруем JSON-строку

  console.log('Encrypted Value:', encryptedValue);
  // Устанавливаем зашифрованное значение в куки
  document.cookie = `${name}=${encryptedValue}; path=/; max-age=${maxAge}`;
}

// Пример использования
// const data = {
//   access: { admin: 'full-access', user: 'read-only' }
// };

// Сохраняем зашифрованное значение в куки
// setEncryptedCookie('access', data.access);


// Функция дешифрования данных
async function decryptData(encryptedData: string): Promise<string | null> {
    try {
      const key = await getEncryptionKey(ENCRYPTION_KEY);
      const encryptedBytes = Uint8Array.from(atob(encryptedData), (c) => c.charCodeAt(0));
  
      // Извлечение IV и зашифрованных данных
      const iv = encryptedBytes.slice(0, IV_LENGTH);
      const data = encryptedBytes.slice(IV_LENGTH);
  
      const decryptedBuffer = await crypto.subtle.decrypt(
        {
          name: 'AES-GCM',
          iv: iv,
        },
        key,
        data,
      );
  
      return arrayBufferToString(decryptedBuffer); // Преобразование ArrayBuffer в строку
    } catch (error) {
      console.error('Error decrypting data:', error);
      return null;
    }
  }
  
  // Функция для получения и расшифровки куки
  export async function getDecryptedCookie(name: string): Promise<Record<string, any> | null> {
    const cookie = document.cookie.split(';').find((item) => item.trim().startsWith(`${name}=`));
  
    if (!cookie) return null;
  
    const encryptedValue = cookie.split('=')[1];
    const decryptedValue = await decryptData(encryptedValue);
  
    if (!decryptedValue) return null;
    console.log('Decrypted Value:', decryptedValue);
    return JSON.parse(decryptedValue);
  }
  
  // Пример использования для расшифровки куки
//   (async () => {
//     const decryptedAccess = await getDecryptedCookie('access');
//     console.log('Decrypted Access:', decryptedAccess); // Расшифрованное значение из куки
//   })();
  
export const fetchAccess = async (
  accessName: AccessKeys,
  setAccess: React.Dispatch<React.SetStateAction<boolean | null>>,
) => {
  try {
    const decryptedAccess = await getDecryptedCookie('access');
    if (decryptedAccess) {
      setAccess(decryptedAccess[accessName]); // Устанавливаем значение can_write
    } else {
      setAccess(false); // Если куки не найдены или ошибка, блокируем доступ
    }
  } catch (error) {
    console.error('Ошибка при получении доступа:', error);
    setAccess(false); // В случае ошибки, блокируем доступ
  }
};
