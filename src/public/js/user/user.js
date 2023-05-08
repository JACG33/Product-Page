const d = document;
d.addEventListener("DOMContentLoaded", (e) => {
  const $sectionUser = d.getElementById("sectionUser"),
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
        `[data-card="${target.parentElement.parentElement.dataset.card}"]`
      );
      console.log(token);
      name = el.querySelector("span").innerText;
      descrip = el.querySelector('input[type="hidden"]').value;
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
          if (res.message === "Datos actualizados") {
            $floatModal.innerHTML = null;
            import("../components/Steps/LastStep.js").then((res) =>
              $floatModal.append(res.LastStep("ok"))
            );
            import("../components/actions/actionGetUserProd.js").then((res) =>
              res.actionGetUserProd()
            );
          }
        });
      });
    }

    // Delete Product ***************
    if (target.dataset.action === "delete") {
      token = target.dataset.name;
      import("../components/actions/actionDelete.js").then((res) =>
        res.actionDelete({ token }).then((res) => {
          if (res.message === "Datos elimiados") {
            target.parentElement.parentElement.remove();
          }
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
      import("../components/actions/actionGetUserProd.js").then((res) =>
        res.actionGetUserProd()
      );
    }

    // Save Product added ***************
    if (target.dataset.next === "añadirSend") {
      name = d.getElementById("nombre").value;
      descrip = d.getElementById("descripcion").value;
      import("../components/actions/actionCreate.js").then((res) => {
        res.actionCreate({ name, descrip }).then((res) => {
          if (res.message === "Producto añadido") {
            $floatModal.innerHTML = null;
            import("../components/Steps/LastStep.js").then((res) =>
              $floatModal.append(res.LastStep("ok"))
            );
            import("../components/actions/actionGetUserProd.js").then((res) =>
              res.actionGetUserProd()
            );
          }
        });
      });
    }

    // Edit profile user
    if (target.dataset.btn == "editProfile") {
      import("../components/Steps/Steps.js").then((res) => {
        $floatModal.showModal();
        $floatModal.innerHTML = null;
        $floatModal.append(
          res.editProfile({
            name: userNameProfile.innerText,
            descrip: userDescripProfile.innerText,
            step: "editarPerfil",
          })
        );
      });
    }

    // Save change user Profile
    if(target.dataset.next=="editarPerfilSend"){
      name = d.getElementById("nombre").value;
      import("../components/actions/actionEditUser.js")
        .then(res=>res.actionEditUser({username:name}))
    }

    

    // Close Modal ***************
    if (target.dataset.close === "cerrar") {
      $floatModal.close();
      $floatModal.innerHTML = null;
    }
  });
});
