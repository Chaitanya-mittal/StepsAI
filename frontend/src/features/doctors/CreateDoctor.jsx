import { useForm } from "react-hook-form";
import { useState } from "react";
import Error from "../../components/Error";
import Button from "../../components/Button";
import { validatePassword } from "../../utils/password";
import { FaEye } from "react-icons/fa";
import { TbEyeClosed } from "react-icons/tb";

import { FaUserDoctor } from "react-icons/fa6";
import { useAuthContext } from "../../context/AuthProvider";
import Loader from "../../components/Loader";
import useCreateDoctor from "./useCreateDoctor";

function CreateDoctor() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const { loginDoctorFunc } = useAuthContext();
  const [showPass, setShowPass] = useState("");
  const pass1 = watch("password1", "");
  const passCriteria = validatePassword(pass1);

  const { createDoctorFunction, isCreating } = useCreateDoctor();

  const onSubmit = (data) => {
    console.log(data);
    const newDoctor = {
      Name: data.name,
      Email: data.userEmail,
      PasswordHash: data.password1,
      Specialty: data.speciality,
    };
    createDoctorFunction(newDoctor, {
      onSuccess: (doctordata) => {
        loginDoctorFunc(doctordata);
      },
    });
  };

  if (isCreating) return <Loader />;

  return (
    <>
      <h3 className="flex items-center justify-center text-3xl font-medium">
        <span>
          <FaUserDoctor />
        </span>
      </h3>

      <div className="mb-4 w-[30rem] p-4 max-[768px]:w-[400px] max-[520px]:w-[300px] max-[410px]:w-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-4"
        >
          <div>
            <label htmlFor="name" className="text-sm font-bold">
              Name
            </label>
            <div className="my-1 w-full">
              <input
                type="text"
                id="firstName"
                className="w-full rounded-md bg-stone-200 p-2 text-sm shadow-sm dark:bg-stone-300"
                {...register("name", {
                  required: "Please enter your name",
                })}
                autoComplete="off"
              />
              {errors.name && <Error>{errors.name.message}</Error>}
            </div>
          </div>

          <div className="w-full">
            <label
              htmlFor="userEmail"
              className="w-[150px] pt-1 text-sm font-bold"
            >
              Email
            </label>
            <div className="my-1">
              <input
                type="email"
                autoComplete="on"
                className="w-full flex-1 rounded-md bg-stone-200 p-2 text-sm shadow-sm dark:bg-stone-300"
                id="userEmail"
                {...register("userEmail", {
                  required: "Please enter your email",
                })}
              />
              {errors.userEmail && <Error>{errors.userEmail.message}</Error>}
            </div>
          </div>
          <div>
            <label htmlFor="speciality" className="text-sm font-bold">
              Speciality
            </label>
            <div className="my-1 w-full">
              <input
                type="text"
                id="speciality"
                className="w-full rounded-md bg-stone-200 p-2 text-sm shadow-sm dark:bg-stone-300"
                {...register("speciality", {
                  required: "Please enter your speciality",
                })}
                autoComplete="off"
              />
              {errors.speciality && <Error>{errors.speciality.message}</Error>}
            </div>
          </div>
          <div className="w-full">
            <label htmlFor="password1" className="text-sm font-bold">
              Password
            </label>
            <div className="my-1 w-full">
              <div className="flex">
                {showPass === "password1" ? (
                  <input
                    type="text"
                    disabled
                    value={watch("password1")}
                    className="grow rounded-md bg-stone-200 p-2 text-sm shadow-sm dark:bg-stone-300"
                  ></input>
                ) : (
                  <input
                    type="password"
                    id="password1"
                    className="min-w-0 grow rounded-md bg-stone-200 p-2 text-sm shadow-sm dark:bg-stone-300"
                    {...register("password1", {
                      required: "Please provide your password",
                      validate: (value) =>
                        validatePassword(value).every(
                          (criterion) => criterion.isMet,
                        ) || "Password does not meet all criteria",
                    })}
                  />
                )}
                <button
                  className="ms-[-2px] p-2 text-sm"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowPass((p) => (p === "password1" ? "" : "password1"));
                  }}
                >
                  <>{showPass === "password1" ? <FaEye /> : <TbEyeClosed />}</>
                </button>
              </div>
              {errors.password1 && (
                <ul>
                  {passCriteria.map((val) => (
                    <Error key={val.label} check={val.isMet ? "on" : "off"}>
                      {val.label}
                    </Error>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="w-full">
            <label htmlFor="password2" className="text-sm font-bold">
              Confirm Password
            </label>
            <div className="my-1">
              <div className="flex w-full">
                {showPass === "password2" ? (
                  <input
                    type="text"
                    value={watch("password2")}
                    className="grow rounded-md bg-stone-200 p-2 text-sm shadow-sm dark:bg-stone-300"
                  ></input>
                ) : (
                  <input
                    type="password"
                    id="password2"
                    className="min-w-0 grow rounded-md bg-stone-200 p-2 text-sm shadow-sm dark:bg-stone-300"
                    {...register("password2", {
                      required: "Please confirm your password",
                      validate: () =>
                        watch("password1") === watch("password2")
                          ? true
                          : "Passwords do not match",
                    })}
                  />
                )}
                <button
                  className="ms-[-2px] p-2 text-sm"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowPass((p) => (p === "password2" ? "" : "password2"));
                  }}
                >
                  {" "}
                  <>{showPass === "password2" ? <FaEye /> : <TbEyeClosed />}</>
                </button>
              </div>
              {errors.password2 && <Error>{errors.password2.message}</Error>}
            </div>
          </div>

          <div className="mt-4 flex w-full justify-end gap-2">
            <Button type="doctor" purpose="submit" disabled={isCreating}>
              Signup
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
          <Button to="/login" type="doctor">
            Already a user?
          </Button>
        </form>
      </div>
    </>
  );
}

export default CreateDoctor;
