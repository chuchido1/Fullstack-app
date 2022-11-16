export const getUsers = async () => {
  try {
    let url = "https://localhost:7237/api/User/GetAll";
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err) {}
};

export const addUser = async (user) => {
  try {
    let options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    };
    let url = "https://localhost:7237/api/User";
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (err) {}
};

export const editUser = async (user) => {
  try {
    let options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    };
    let url = "https://localhost:7237/api/User";
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (err) {}
};

export const deleteUser = async (id) => {
  try {
    let options = { method: "DELETE" };
    let url = "https://localhost:7237/api/User/" + id.toString();
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (err) {}
};
