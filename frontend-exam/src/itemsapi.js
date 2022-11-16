export const getItems = async () => {
  try {
    let url = "https://localhost:7237/api/Item/GetAll";
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err) {}
};

export const addItem = async (item) => {
  try {
    let options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    };
    let url = "https://localhost:7237/api/Item";
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (err) {}
};

export const editItem = async (item) => {
  try {
    let options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    };
    let url = "https://localhost:7237/api/Item";
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (err) {}
};

export const deleteItem = async (id) => {
  try {
    let options = { method: "DELETE" };
    let url = "https://localhost:7237/api/Item/" + id.toString();
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (err) {}
};
