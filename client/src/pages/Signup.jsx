import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../config/appConstans";

let initialForm = {
  nombreApellido: "",
  name: "",
  pass: "",
};
export const Signup = () => {
  const [register, setRegister] = useState(initialForm);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setRegister({
      ...register,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let soli = await fetch(`${API_URL}auth/register`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          fullname: register.nombreApellido,
          user: register.name,
          password: register.pass,
        }),
      });

      if (!soli.ok) throw new Error("Error interno");
      let json = await soli.json();
      console.log(json);

      if (json.message == "Usuario registrado") {
        return navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="container h-100minvh d-flex flex-aling-center flex-jus-center">
      <form onSubmit={handleSubmit}>
        <div className="card">
          <div className="card__step">
            <span>Register</span>
          </div>
          <div className="card__data">
            <label className="card__label" htmlFor="">
              Nombre y Apellido
            </label>
            <input
              onChange={handleChange}
              className="card__input"
              type="text"
              name="nombreApellido"
              placeholder="Nombre y Apellido"
              id="fullname"
              value={register.nombreApellido}
            />
            <label className="card__label" htmlFor="">
              Usuario
            </label>
            <input
              onChange={handleChange}
              className="card__input"
              type="text"
              name="name"
              placeholder="Usuario"
              id="user"
              value={register.name}
            />
            <label className="card__label" htmlFor="">
              Contraseña
            </label>
            <input
              onChange={handleChange}
              className="card__input"
              type="text"
              name="pass"
              placeholder="12345678"
              id="password"
              value={register.pass}
            />
          </div>
          <div className="card__btn flex-jus-end">
            <button className="btn btn__send" type="submit" id="register">
              Registrar
            </button>
          </div>
          <small>
            ¿Estas Registrado?
            <Link to={"/login"}>Inicia Sesion</Link>
          </small>
        </div>
      </form>
    </section>
  );
};
