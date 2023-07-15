import { Link, useRouteError } from "react-router-dom";

const NotFound = () => {
  const error = useRouteError();
  console.log(error);
  return (
    <div className="container">
      <div className="notfound">
      <h1>Ops</h1>
      <h3>{error?.status}</h3>
      <h4>{error?.statusText || error?.message}</h4>
      <Link className="btn btn__send" to={"/"}>Regresar al inicio</Link>
      </div>
    </div>
  );
};

export default NotFound;
