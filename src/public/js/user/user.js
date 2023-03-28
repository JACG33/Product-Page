const d = document,
  $sectionUser = d.getElementById("sectionUser"),
  $addProduct = d.getElementById("addProduct"),
  $floatModal = d.getElementById("floatModal");

d.addEventListener("click", (e) => {
  let token = "",
    name = "",
    descrip = "";
  const target = e.target;

  // Edit Product ***************
  if (target.dataset.action === "edit") {
    token = target.dataset.name;
    let el = document.querySelector(
      `.${target.parentElement.parentElement.className}`
    );

    name = el.querySelector("span").innerText;
    descrip = el.querySelector("p").innerText;
    import("../components/Steps/Steps.js").then((res) => {
      $floatModal.showModal();
      $floatModal.innerHTML = null;
      $floatModal.append(
        res.editProduct({ step: "editar", name, descrip, token })
      );
    });
  }

  // Save Product edited ***************
  if (target.dataset.next === "editarSend") {
    name = d.getElementById("nombre").value;
    descrip = d.getElementById("descripcion").value;
    token = target.dataset.name;
    import("../components/actions/actionEdit.js").then((res) => {
      res.actionEdit({ token, name, descrip }).then((res) => {
        if (res.message === "Datos actualizados") $floatModal.innerHTML = null;
        import("../components/Steps/LastStep.js").then((res) =>
          $floatModal.append(res.LastStep("ok"))
        );
        import("../components/actions/actionGetUserProd.js").then((res) =>
          res.actionGetUserProd()
        );
      });
    });
  }

  // Delete Product ***************
  if (target.dataset.action === "delete") {
    token = target.dataset.name;
    import("../components/actions/actionDelete.js").then((res) =>
      res.actionDelete({ token }).then((res) => {
        if (res.message === "Datos elimiados")
          import("../components/actions/actionGetUserProd.js").then((res) =>
            res.actionGetUserProd()
          );
      })
    );
  }

  // Add Product ***************
  if (target.matches("#addProduct")) {
    $floatModal.showModal();
    import("../components/Steps/Steps.js").then((res) => {
      $floatModal.innerHTML = null;
      $floatModal.append(res.addProduct("añadir"));
    });
  }

  // Save Product added ***************
  if (target.dataset.next === "añadirSend") {
    name = d.getElementById("nombre").value;
    descrip = d.getElementById("descripcion").value;
    import("../components/actions/actionCreate.js").then((res) => {
      res.actionCreate({ name, descrip }).then((res) => {
        if (res.message === "Producto añadido") $floatModal.innerHTML = null;
        import("../components/Steps/LastStep.js").then((res) =>
          $floatModal.append(res.LastStep("ok"))
        );
        import("../components/actions/actionGetUserProd.js").then((res) =>
          res.actionGetUserProd()
        );
      });
    });
  }

  // Close Modal ***************
  if (target.dataset.close === "cerrar") {
    $floatModal.close();
    $floatModal.innerHTML = null;
  }
});
