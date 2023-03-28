const d = document;
d.addEventListener("click", (e) => {
  const target = e.target;

  if (target.matches("#register")) {
    import("../components/actions/actionRegister.js")
      .then((res) =>
        res.actionRegister({ fullname:fullname.value,user: user.value, password: password.value })
      )
      .then((res) =>
        res.message === "Usuario registrado" ? (location.href = "/products") : ""
      );
  }
});
