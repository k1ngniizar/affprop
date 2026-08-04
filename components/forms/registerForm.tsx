"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterInput } from "@/validations";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { registerAction } from "@/actions/auth.actions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(data: RegisterInput) {
    try {
      const result = await registerAction(data);

      if (!result.success) {
        console.log(result.errors);
        toast.error("User not created try again.");
        return;
      }

      toast.success("Sign up successful and redirecting to login page");
      router.push("/login");
    } catch (error) {
      const isError =
        error instanceof Error ? error.message : "Something went wrong";

      toast.error(isError);
    }
  }

  return (
    <div className="flex w-full">
      <div className="sm:w-2/5 sm:block hidden">
        <img
          src={
            "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          loading="lazy"
          alt="white and brown concrete building under blue sky during daytime."
          className="h-full saturate-0 w-full opacity-50"
        />
      </div>
      <div className="sm:w-3/5 w-full flex items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5 max-w-md w-full shadow-sm shadow-zinc-600 border-zinc-600 border-[0.5px] p-2 rounded-lg"
        >
          <div>
            <label htmlFor="firstName">First name:</label>
            <input
              id="firstName"
              {...register("firstName")}
              placeholder="Enter First Name"
              className="w-full border rounded-lg p-3"
            />

            {errors.firstName && (
              <p className="text-red-400">
                First name must be longer than two letters
              </p>
            )}
          </div>

          <div>
            <label htmlFor="lastName">Last name:</label>
            <input
              id="lastName"
              {...register("lastName")}
              placeholder="Enter Last Name"
              className="w-full border rounded-lg p-3"
            />

            {errors.lastName && (
              <p className="text-red-400">
                Last name must be longer than two letters
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              {...register("email")}
              placeholder="Enter Email"
              className="w-full border rounded-lg p-3"
            />

            {errors.email && (
              <p className="text-red-400">{errors.email.message}</p>
            )}
          </div>

          <div className="relative">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              {...register("password")}
              type={showPassword ? "text" : "password"}
              className="w-full border rounded-lg p-3"
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 text-gray-500 top-1/2 "
            >
              {showPassword ? <Eye /> : <EyeClosed />}
            </div>

            {errors.password && (
              <p className="text-red-400">{errors.password.message}</p>
            )}
          </div>

          <div className="relative">
            <label htmlFor="confirmPassword">Confirm password</label>
            <input
              id="confirmPassword"
              {...register("confirmPassword")}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="please confirm your password"
              className="w-full border rounded-lg p-3"
            />
            <div
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-2 text-gray-500 top-1/2 "
            >
              {showConfirmPassword ? <Eye /> : <EyeClosed />}
            </div>

            {errors.confirmPassword && (
              <p className="text-red-400">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            className="border w-full p-2 rounded-sm bg-white text-black hover:cursor-pointer hover:bg-zinc-300"
            disabled={isSubmitting}
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}
