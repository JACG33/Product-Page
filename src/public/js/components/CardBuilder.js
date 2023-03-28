/**
 *
 * @param {object} props Objetos de la propiedades que se usaran en la funccion
 * @returns Retorna el formulario que se insertara en la Tag dialog
 */
export function CardBuilder(props) {
  const d = document;
  const $form = d.createElement("form");
  $form.id = "form";
  const $cardDiv = d.createElement("div");
  $cardDiv.className = "card";

  $cardDiv.innerHTML = null;

  const $cardDivStep = d.createElement("div");
  $cardDivStep.className = "card__step";

  const $cardSpan = d.createElement("span");
  props.step == "añadir" ? ($cardSpan.innerText = "Añadir Producto") : "";
  props.step == "editar" ? ($cardSpan.innerText = "Editar Producto") : "";

  const $cardDivData = d.createElement("div");
  $cardDivData.className = "card__data";

  const $cardDivInputs = d.createElement("div");
  $cardDivInputs.className = "card__btn";

  const $cardInputNext = d.createElement("button");
  $cardInputNext.setAttribute("data-next", props.step);
  $cardInputNext.innerText = "Siguiente";
  $cardInputNext.className = "btn btn__next";
  $cardInputNext.type = "button";

  const $cardInputPrev = d.createElement("button");
  $cardInputPrev.className = "btn btn__prev";
  $cardInputPrev.type = "button";

  const $cardInputReg = d.createElement("button");
  $cardInputReg.className = "btn btn__send";
  $cardInputReg.type = "button";
  
  $cardDivStep.append($cardSpan);
  
  $cardDivData.insertAdjacentHTML("afterbegin", props.str);
  
  if (props.step === "añadir" || props.step === "editar") {
    $cardDivInputs.className = "card__btn flex-jus-btw";
    $cardInputPrev.setAttribute("data-close", 'cerrar');
    $cardInputReg.setAttribute("data-next", `${props.step}Send`);
    $cardInputReg.setAttribute("data-name", `${props.token}`);
    $cardInputPrev.innerText = "Cerrar";
    $cardInputReg.innerText = "Guardar";
    $cardDivInputs.append($cardInputPrev);
    $cardDivInputs.append($cardInputReg);
  }

  $cardDiv.append($cardDivStep);
  $cardDiv.append($cardDivData);
  $cardDiv.append($cardDivInputs);
  $form.append($cardDiv);

  return $form;
}
