"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, type LoginInput } from "@/validations";
import toast from "react-hot-toast";
import { loginAction } from "@/actions/auth.actions";
import { Eye, EyeClosed } from "lucide-react";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  function onSubmit(data: LoginInput) {
    startTransition(async () => {
      const result = await loginAction(data);

      if (!result?.success) {
        toast.error(result.message);
        console.log("Failure result:: ", result);
        return;
      }

      toast.success(result.message);
      console.log("success result:: ", result);
    });
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 max-w-md w-full shadow-sm shadow-zinc-600 border-zinc-600 border-[0.5px] p-2 rounded-lg"
    >
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          {...register("email")}
          placeholder="Enter Email"
          className="w-full border rounded-lg p-3"
        />

        {errors.email && <p className="text-red-400">{errors.email.message}</p>}
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

      <button
        className="border w-full p-2 rounded-sm bg-white text-black hover:cursor-pointer hover:bg-zinc-300"
        disabled={isPending}
      >
        {isPending ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}

export default LoginForm;
