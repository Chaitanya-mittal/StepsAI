import { validatePassword } from "../../utils/password";
import { useForm } from "react-hook-form";

import { useState } from "react";
import Button from "../../components/Button";

import { FaEye } from "react-icons/fa";
import { TbEyeClosed } from "react-icons/tb";

import useCreatePatient from "./useCreatePatient";

function CreatePatient({ closeModal }) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const [showPass, setShowPass] = useState("");
  const pass1 = watch("password1", "");
  const passCriteria = validatePassword(pass1);
  const { createPatientFunction, isCreating } = useCreatePatient();

  const onSubmit = (data) => {
    const newPatient = {
      Name: data.name,
      Email: data.userEmail,
      PasswordHash: data.password1,
    };
    createPatientFunction(newPatient, {
      onSuccess: () => closeModal(),
      onError: () => closeModal(),
    });
  };

  return (
    <section className="flex h-full w-full flex-col items-center justify-center bg-white py-10">
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

          <div className="w-full">
            <label htmlFor="password1" className="text-sm font-bold">
              Password
            </label>
            <div className="my-1 w-full">
              <div className="flex">
                {showPass === "password1" ? (
                  <p className="grow rounded-md bg-stone-200 p-2 text-sm shadow-sm dark:bg-stone-300">
                    {watch("password1")}
                  </p>
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
                  <p className="grow rounded-md bg-stone-200 p-2 text-sm shadow-sm dark:bg-stone-300">
                    {watch("password2")}
                  </p>
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
            <Button purpose="submit" type="patient" disabled={isCreating}>
              {isCreating ? "Creating..." : "Create"}
            </Button>
            <Button
              type="cancel"
              onClick={(e) => {
                e.preventDefault();
                reset();
                closeModal();
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default CreatePatient;
