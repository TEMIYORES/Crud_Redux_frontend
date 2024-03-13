import { Link, useNavigate } from "react-router-dom";
import { useUserInfoQuery } from "../features/users/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectCurrentId } from "../features/auth/authSlice";
import { clearUserInfo } from "../features/users/userSlice";
import { useEffect, useState } from "react";
interface userInfoProps {
  username: string | null;
}
const Home = () => {
  const navigate = useNavigate();
  const id = useSelector(selectCurrentId);
  const { data, isLoading, isError, isSuccess, error } = useUserInfoQuery({
    id,
  });
  const [userInfo, setUserInfo] = useState<userInfoProps>(data);

  const dispatch = useDispatch();
  const signOut = async () => {
    dispatch(logout());
    dispatch(clearUserInfo());
    navigate("/links");
  };

  useEffect(() => {
    setUserInfo(data);
    console.log({ data });
  }, [data]);

  let content;
  if (isLoading) {
    content = <h1>Loading...</h1>;
  } else if (isSuccess) {
    content = (
      <div className="flex w-[100vw] h-[100vh] place-items-center justify-center">
        <div className="flex w-[500px] min-h-[400px] flex-col gap-5 border-2 border-white place-items-center justify-center rounded-lg p-5">
          <h3 className="text-3xl">
            WELCOME {userInfo?.username} YOU'RE ARE LOGGED IN!
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
          <button onClick={signOut}>Sign Out</button>
        </div>
      </div>
    );
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }
  // navigate("/login", { state: { from: location }, replace: true });

  return content;
};

export default Home;
