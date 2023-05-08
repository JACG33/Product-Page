/*
 * Funcion para buscar una palabra o letra.
 * @param string Palabra o letra a bucar.
 * @param string Tecla presionada.
 * @return Array de objetos con los resultados de busquedas.
 */
export const actionSearch = async (product, key) => {
  if (key == "Enter") location.href = `/search/${product}`;

  try {
    const search = await fetch(`/search/s/${product}`);
    const resul = await search.json();

    return resul;
  } catch (error) {
    console.log({ Error: error });
  }
};
