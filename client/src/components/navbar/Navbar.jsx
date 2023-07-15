import { NavLink, Navigate } from "react-router-dom";
import { useAppProvider } from "../context/AppProvider";
import { API_URL } from "../../config/appConstans";

export const Navbar = () => {
  const { stateUser, getToken, logut } = useAppProvider();

  const hanbleOut = async (e) => {
    e.preventDefault();

    try {
      let soli = await fetch(`${API_URL}auth/logut`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (!soli.ok) throw new Error("Error en la solicitud");
      let json = await soli.json();

      if (json.message == "Out") {
        console.log(json);
        logut();
      }
    } catch (error) {
      console.log(error);
    }

    if (!stateUser) return <Navigate to={"/"} />;
  };
  return (
    <header>
      <nav className="navbar">
        {/* <NavLink className={"no-link"} to={"/"}>
          Home
        </NavLink> */}
        {/* <div className="wrapper__search" id="wrapperSearch">
          <input
            className="input__search"
            type="search"
            name=""
            id="searchInput"
          />
          <button className="btn__search" type="button" data-btn="search">
            <i data-btn="search" className="fa-solid fa-magnifying-glass"></i>
          </button>
          <div className="search__result__cont" id="searchResultCont"></div>
        </div> */}
        <button className="btn__hamburger" data-btn="hamburger">
          <i className="fa-solid fa-bars" data-btn="hamburger"></i>
        </button>
        <div className={"navbar__items"} id="navbarItems">
          {stateUser && (
            <>
              <NavLink to={"/user"} className={"btn btn__1 navbar__item"}>
                Perfil
              </NavLink>
              <NavLink to={"/products"} className={"btn btn__1 navbar__item"}>
                Productos
              </NavLink>
            </>
          )}
          {!stateUser && (
            <NavLink to={"/login"} className={"btn btn__send navbar__item"}>
              Login
            </NavLink>
          )}
          {!stateUser && (
            <NavLink to={"/signup"} className={"btn btn__border navbar__item"}>
              Singup
            </NavLink>
          )}

          {stateUser && (
            <NavLink
              onClick={hanbleOut}
              to={"/"}
              className={"btn btn__logout navbar__item"}
            >
              Cerrar Sesion
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  );
};
