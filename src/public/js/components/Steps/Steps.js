import { CardBuilder } from "../CardBuilder.js";
/**
 *
 * @param {number} step Numero del Paso en el que se encuentra el usuario
 * @returns Devuelbe la Card
 */
export function addProduct(step) {
  let str = ` 
  <label class="card__label" for="nombre">Nombre del Producto</label>
  <input id="nombre" class="card__input" type="text" placeholder="Producto" required pattern="^[A-Za-zÑñ\s]+$">
  <label class="card__label" for="descripcion">Descripción</label>
  <textarea id="descripcion" class="card__textarea" cols="30" rows="10" placeholder="Descripcion" required data-pattern="^.{15,140}$"></textarea>
  `;
  return CardBuilder({ str, step });
}
/**
 *
 * @param {object} params Objeto con datos para la construccion de la card
 * @returns Devuelbe la Card
 */
export function editProduct(params) {
  let { step, name, descrip, token } = params;
  let str = ` 
  <label class="card__label" for="nombre">Nombre del Producto</label>
  <input id="nombre" class="card__input" type="text" value="${name}" placeholder="Producto" required pattern="^[A-Za-zÑñ\s]+$">
  <label class="card__label" for="descripcion">Descripción</label>
  <textarea id="descripcion" class="card__textarea" cols="30" rows="10" placeholder="Descripcion" required data-pattern="^.{15,140}$">${descrip}</textarea>
  `;
  return CardBuilder({ str, step, token });
}

/**
  * Funcion para editar el perfil del usuario
  * @param {object} params Objectos con los datos para crear la card.
  * @return Devuelbe la Card.
  */
export function editProfile(params) {
  let { step, name, descrip } = params,
    str = `
      <label class="card__label" for="nombre">Nombre</label>
      <input id="nombre" class="card__input" type="text" value="${name}" placeholder="Producto" required pattern="^[A-Za-zÑñ\s]+$">
      <label class="card__label" for="descripcion">Descripción Personal</label>
      <textarea id="descripcion" class="card__textarea" cols="30" rows="10" placeholder="Descripcion" required data-pattern="^.{15,140}$">${descrip}</textarea>
    `;
    return CardBuilder({ str, step });
}
