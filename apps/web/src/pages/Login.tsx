import Cover from "public/login-cover.svg?react";
import Logo from "public/logo.svg?react";
import LoginForm from "../components/login/LoginForm";
const Login = () => {
  return (
    <>
      <div className="flex lg:flex-row lg:justify-between lg:mt-0 flex-col mt-10 items-center">
        <LoginForm />
        <div className="relative md:h-screen h-[50vh] overflow-clip lg:w-1/2 w-full ">
          <Cover className="absolute h-screen top-0 -right-50" />
          <Logo className="absolute md:top-44 top-28 h-[110px] md:h-[300px] right-5 sm:w-1/2 w-3/4 " />
        </div>
      </div>
    </>
  );
};
export default Login;
