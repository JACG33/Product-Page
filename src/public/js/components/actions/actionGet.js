export const actionGet = async () => {
  const d = document;
  const $sectionUser = d.getElementById("sectionUser");
  const res = await fetch(`/api/products/`);
  const res_1 = await res.json();
  const $div = document.createElement("div");
  $div.className = "container products";
  let tmp = ``;
  res_1.forEach((ele,index) => {
    tmp += `
      <div class="product__item">
        <div class="product__info">
          <span class="product__name">${ele.name}</span>
          <p class="product__descrip">${ele.descrip}</p>
        </div>
        <div class="stars" id="starsContainer${index}" data-post="${ele.id_product}"  data-starsstatus="false">
          <button type="button" class="star__btn"><img src="/img/svgIcons/starNone.svg" data-star="star" data-starcount="1" data-starstatus="false" alt=""></button>
          <button type="button" class="star__btn"><img src="/img/svgIcons/starNone.svg" data-star="star" data-starcount="2" data-starstatus="false" alt=""></button>
          <button type="button" class="star__btn"><img src="/img/svgIcons/starNone.svg" data-star="star" data-starcount="3" data-starstatus="false" alt=""></button>
          <button type="button" class="star__btn"><img src="/img/svgIcons/starNone.svg" data-star="star" data-starcount="4" data-starstatus="false" alt=""></button>
          <button type="button" class="star__btn"><img src="/img/svgIcons/starNone.svg" data-star="star" data-starcount="5" data-starstatus="false" alt=""></button>
        </div>
        <div>
          <span>Puntuacion del Producto ${ele.rating}/5</span>
        </div>
      </div>`;
  });
  $div.innerHTML = tmp;
  $sectionUser.innerHTML = null;
  $sectionUser.append($div);
  // return $div;
};
