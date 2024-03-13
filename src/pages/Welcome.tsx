import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();
  const login = () => {
    navigate("/login");
  };
  return (
    <div className="flex w-[100vw] h-[100vh] place-items-center justify-center">
      <div className="flex w-[500px] min-h-[400px] flex-col gap-5 border-2 border-white place-items-center justify-center rounded-lg p-5">
        <h3 className="text-3xl">
          Hi There! welcome to LETX, we appreciate your support!
        </h3>
        <ul className="flex flex-col gap-5">
          <li className="underline text-2xl">
            <Link to={"/admin"}>Go to Admin's Page</Link>
          </li>
          <li className="underline text-2xl">
            <Link to={"/editor"}>Go to Editor's Page</Link>
          </li>
          <li className="underline text-2xl">
            <Link to={"/lounge"}>Go to Lounge Page</Link>
          </li>
        </ul>
        <button onClick={login}>Login</button>
      </div>
    </div>
  );
};

export default Welcome;
