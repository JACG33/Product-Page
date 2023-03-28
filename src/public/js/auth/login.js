const d = document;
d.addEventListener("click", (e) => {
  const target = e.target;

  if (target.matches("#login")) {
    import("../components/actions/actionLogin.js")
      .then((res) =>
        res.actionLogin({ user: user.value, password: pass.value })
      )
      .then((res) =>
        res.message === "Logeado" ? (location.href = "/products") : ""
      );
  }
});
