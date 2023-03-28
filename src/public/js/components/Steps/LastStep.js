/**
 *
 * @param {string} status Estado de la respuesta del fetch
 * @param {number} step Paso en el que se encuentra el usuario
 * @returns Retorna la Tarjeta
 */
export function LastStep(status, step) {
  const d = document;

  const $divCard = d.createElement("div");
  $divCard.className = "card t-center";

  const $cardDivData = d.createElement("div");
  $cardDivData.className = "card__data";

  const $cardDivInputs = d.createElement("div");
  $cardDivInputs.className = "card__btn flex-jus-center";
  const $cardInputPrev = d.createElement("button");
  $cardInputPrev.type = "button";

  if (status == "ok") {
    $cardDivData.innerHTML = `<h3>Registro Exitoso</h3><h1>👍</h1>`;
    $cardInputPrev.setAttribute("data-close", "cerrar");
    $cardInputPrev.innerText = "Finalizar";
    $cardInputPrev.className = "btn btn__send";
  } else {
    $cardDivData.innerHTML = `<h3>Error en el Registro</h3>
    <p><h1>❌</h1>Regresa para intentar nuevamente.</p>`;
    $cardInputPrev.setAttribute("data-prev", step);
    $cardInputPrev.innerText = "Regresar";
    $cardInputPrev.className = "btn btn__prev";
  }

  $cardDivInputs.append($cardInputPrev);
  $divCard.append($cardDivData);
  $divCard.append($cardDivInputs);
  return $divCard;
}
