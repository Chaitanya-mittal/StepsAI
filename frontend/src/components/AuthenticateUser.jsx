import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { TbEyeClosed } from "react-icons/tb";
import { FaEye, FaUserDoctor } from "react-icons/fa6";

import { Link } from "react-router-dom";
import Button from "./Button";

import { useAuthContext } from "../context/AuthProvider";
import Loader from "./Loader";
import useLoginDoctor from "../features/doctors/useLoginDoctor";

function AuthenticateUser({ user }) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const [showPass, setShowPass] = useState("");

  const { loginDoctorFunc } = useAuthContext();
  const { loginFunction, logginIn } = useLoginDoctor();

  const onSubmit = (data) => {
    const creds = {
      email: data.email,
      password: data.password,
    };

    console.log(creds);
    loginFunction(creds, {
      onSuccess: (d) => loginDoctorFunc(d),
      onError: () => reset(),
    });
  };

  if (logginIn) return <Loader />;
  return (
    <section className="flex h-full w-full flex-col items-center justify-center">
      <div className="px-4 py-8">
        <h1 className="flex items-center justify-center">
          <span className="text-3xl">
            <FaUserDoctor />
          </span>
        </h1>
        <div className="mb-4 mt-6 w-[30rem] p-4 max-[768px]:w-[400px] max-[520px]:w-[300px] max-[410px]:w-full">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full flex-col gap-4"
          >
            <div className="w-full">
              <label htmlFor="email" className="w-full text-sm font-bold">
                Email
              </label>

              <input
                type="text"
                className="mt-1 w-full rounded-md bg-stone-200 p-2 text-sm"
                id="email"
                {...register("email", {
                  required: "This is a required field",
                })}
              />
              {errors.email && <Error>{errors.email.message}</Error>}
            </div>

            <div className="w-full">
              <label htmlFor="password" className="w-full text-sm font-bold">
                Password
              </label>

              <div className="mt-1 flex w-full">
                {showPass === "password" ? (
                  <p className="grow rounded-md bg-stone-200 p-2 text-sm dark:bg-stone-300">
                    {watch("password")}
                  </p>
                ) : (
                  <input
                    type="password"
                    id="password"
                    className="min-w-0 grow rounded-md bg-stone-200 p-2 text-sm shadow-sm dark:bg-stone-300"
                    {...register("password", {
                      required: "This is a required field",
                    })}
                  />
                )}
                <button
                  className="ms-[-2px] p-2 text-sm"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowPass((p) => (p === "password" ? "" : "password"));
                  }}
                >
                  {" "}
                  <>{showPass === "password2" ? <FaEye /> : <TbEyeClosed />}</>
                </button>
              </div>
              {errors.password2 && <Error>{errors.password2.message}</Error>}
            </div>

            <div className="mt-6 flex w-full justify-end gap-4">
              <Button type="doctor" purpose="submit" disabled={logginIn}>
                Login
              </Button>
              <Button
                type="cancel"
                onClick={(e) => {
                  e.preventDefault();
                  reset();
                }}
              >
                Cancel
              </Button>
            </div>
            <Link to={`/register`} className="text-right text-sm font-bold">
              New User?
            </Link>
          </form>
        </div>
      </div>
    </section>
  );
}
export default AuthenticateUser;
