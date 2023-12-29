export const storage = {
  get: (key: string) => {
    const store = window.localStorage.getItem(key);
    if (store) {
        const data =
          typeof store === "string" || store !== null ? JSON.parse(store) : store;

      return data;
    }
  },

  set: (key: string, value: string | object) => {
    window.localStorage.setItem(key, JSON.stringify(value));
  },
};
