import { ChangeEvent, useRef, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Lottie from "react-lottie";
import loader from "../../assets/lottie/loader.json";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: loader,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname;
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);

  const [user, setUser] = useState("");
  const [isValidName, setIsValidName] = useState(false);
  const [password, setPassword] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  // const [check, toggleCheck] = useToggle("persist", false);
  useEffect(() => {
    userRef?.current?.focus();
  }, []);
  useEffect(() => {
    setErrMsg("");
  }, [user, password]);

  useEffect(() => {
    // const result = USER_REGEX.test(user);
    if (user.trim() !== "" && !(user.length < 4)) {
      setIsValidName(true);
    } else {
      setIsValidName(false);
    }
  }, [user]);

  useEffect(() => {
    if (password.trim() !== "" && !(password.length < 6)) {
      setIsValidPassword(true);
    } else {
      setIsValidPassword(false);
    }
  }, [password]);

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Sending data to server
      const userData = await login({ username: user, password }).unwrap();
      dispatch(setCredentials({ ...userData }));
      console.log({ userData });
      setUser("");
      setPassword("");
      toast.success("Login Successful");
      navigate("/employee", { replace: true });
      //   Clear input fields
    } catch (err: any) {
      if (!err?.data) {
        console.log(err);
        setErrMsg("No server response");
      } else if (err?.status === 400) {
        setErrMsg(err.data.message);
      } else if (err?.status === 401) {
        setErrMsg(err.data.message);
      } else {
        setErrMsg("Login Failed");
      }
      errRef?.current?.focus();
    }
  };
  const handleUserInput = (e: ChangeEvent<HTMLInputElement>) =>
    setUser(e.target.value);
  const handlePasswordInput = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const content = isLoading ? (
    <h1>Loading</h1>
  ) : (
    <section className="flex w-[100vw] h-[100vh] place-items-center justify-center">
      <div className="flex w-[500px] min-h-[400px] flex-col gap-5 border-2 border-white rounded-lg p-5">
        <p
          ref={errRef}
          aria-live="assertive"
          className={`${
            errMsg
              ? "bg-rose-500 p-space_10 rounded-radius_10 font-semibold"
              : "hidden"
          }`}
        >
          {errMsg}
        </p>
        <h2 className="font-bold text-size_30">Log In</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2 text-size_18">
            <label
              htmlFor="username"
              className="font-semibold flex gap-2 items-center"
            >
              Username:
            </label>
            <input
              id="username"
              name="username"
              ref={userRef}
              required
              autoComplete="off"
              type="text"
              className="border-2 border-primaryWhiteHex rounded-md p-2"
              value={user}
              onChange={handleUserInput}
            />
          </div>
          <div className="flex flex-col gap-2 text-size_18">
            <label
              htmlFor="password"
              className="font-semibold flex gap-2 items-center"
            >
              Password:
            </label>
            <input
              id="password"
              name="password"
              required
              type="password"
              className="border-2 border-primaryWhiteHex rounded-md p-2"
              value={password}
              onChange={handlePasswordInput}
            />
          </div>

          <button
            disabled={!isValidName || !isValidPassword ? true : false}
            className="border-2 border-[#242424] bg-primaryBlackHex text-primaryWhiteHex rounded-md p-2 disabled:bg-primaryGreyHex disabled:text-primaryBlackHex"
          >
            {isLoading ? (
              <Lottie options={defaultOptions} height={50} width={50} />
            ) : (
              "Sign In"
            )}
          </button>
          {/* <div>
            <input
              type="checkbox"
              id="persist"
              onChange={toggleCheck}
              checked={check}
            />
            <label htmlFor="persist"> Trust This Device?</label>
          </div> */}
        </form>
        <div>
          Need an Account?{" "}
          <Link to={"/"} className="underline">
            Register
          </Link>
        </div>
        <div></div>
      </div>
    </section>
  );
  return content;
};

export default Login;
