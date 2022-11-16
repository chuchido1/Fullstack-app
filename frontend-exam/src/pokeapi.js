export const getPokemon = async (id) => {
  let num = id;
  try {
    let url = "https://pokeapi.co/api/v2/pokemon/" + num + "/";
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err) {}
};
