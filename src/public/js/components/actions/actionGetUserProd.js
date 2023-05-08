export const actionGetUserProd = async () => {
  try {
    const d = document,
      $productList = d.getElementById("productList") 
    const res = await fetch("/api/products/userProduct");
    const json = await res.json();
    // console.log(json);
    let tmp = ``;
    json.products.forEach((ele, index) => {
      tmp += `
      <div class="product__item">
        <div class="product__info" data-prod="p${index}">
          <span class="product__name">${ele.name}</span>
          <p class=""product__descrip>${ele.descrip}</p>
        </div>
        <div class="product__actions">
          <button class="btn btn-edit" type="button" data-name="${ele.id_product}" data-action="edit">Editar</button>
          <button class="btn btn-delet" type="button" data-name="${ele.id_product}" data-action="delete">Eliminar</button>
        </div>
        <div class="rating__result">
          <span>Puntuacion del Producto ${ele.rating}/5</span>
        </div>
      </div>
      `;
    });
    $productList.innerHTML = null;
    $productList.innerHTML = tmp;
  } catch (err) {
    console.log(err);
  }
};
