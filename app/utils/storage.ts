// give me localStorage getter and setter with error handling and Json formatting
type StorageKey = "currentLocation";
export const setStorage = (key: StorageKey, value: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(error);
  }
};

export const getStorage = <T = any>(key: StorageKey): T | null => {
  try {
    const value = localStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};
