import Cover from "public/login-cover.svg?react";
import Logo from "public/logo.svg?react";
import RegisterForm from "../components/register/RegisterForm";
const SignUp = () => {
  return (
    <>
      <div className="mt-10 flex flex-col items-center lg:mt-0 lg:flex-row lg:justify-between">
        <RegisterForm />
        <div className="relative h-[50vh] w-full overflow-clip md:h-screen lg:w-1/2">
          <Cover className="absolute top-0 -right-50 h-screen" />
          <Logo className="absolute top-28 right-5 h-[110px] w-3/4 sm:w-1/2 md:top-44 md:h-[300px]" />
        </div>
      </div>
    </>
  );
};
export default SignUp;
