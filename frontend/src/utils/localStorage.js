export const getItemLS = (key) => {
    const data = JSON.parse(localStorage.getItem(key)) || "";
    return data;
};

export const setItemLS = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const deleteItemLS = (key) => {
  localStorage.removeItem(key);
};