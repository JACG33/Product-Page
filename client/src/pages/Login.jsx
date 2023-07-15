import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAppProvider } from "../components/context/AppProvider";
import { API_URL } from "../config/appConstans";

let initialForm = {
  name: "",
  pass: "",
};
export const Login = () => {
  const [login, setLogin] = useState(initialForm);

  const { setStateUser, stateUser, setToken, setUserInfo } = useAppProvider();

  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let soli = await fetch(`${API_URL}auth/login`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ username: login.name, password: login.pass }),
      });

      if (!soli.ok) throw new Error("Error en la solicitud");
      let json = await soli.json();

      if (json.message == "Logeado") {
        console.log(json);
        let { refreshToken,message,userData } = json;
        setStateUser(true);
        setToken(refreshToken);
        localStorage.setItem("auth", JSON.stringify({ token: refreshToken,message }));
        localStorage.setItem("user", JSON.stringify({ user: userData.user,fullname:userData.nombreApellido }));
        setUserInfo(JSON.parse(localStorage.getItem("user")));
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (stateUser) return <Navigate to={"/products"} />;

  return (
    <section className="container h-100minvh d-flex flex-aling-center flex-jus-center">
      <form onSubmit={handleSubmit}>
        <div className="card">
          <div className="card__step">
            <span>Login</span>
          </div>
          <div className="card__data">
            <label className="card__label" htmlFor="">
              Usuario
            </label>
            <input
              className="card__input"
              id="user"
              type="text"
              name="name"
              placeholder="Usuario"
              onChange={handleChange}
              value={login.name}
            />
            <label className="card__label" htmlFor="">
              Contraseña
            </label>
            <input
              className="card__input"
              id="pass"
              type="text"
              name="pass"
              placeholder="12345678"
              onChange={handleChange}
              value={login.pass}
            />
          </div>
          <div className="card__btn flex-jus-end">
            <button className="btn btn__send" type="submit" id="login">
              Login
            </button>
          </div>
          <small>
            ¿No estas Registrado?
            <Link to={"/signup"}>Registrate</Link>
          </small>
        </div>
      </form>
    </section>
  );
};
