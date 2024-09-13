"use client";
import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Image,
  Input,
  Link,
  Button,
} from "@nextui-org/react";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState(null);
  const togglePassword = () => setShowPassword(!showPassword);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    const response = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (response?.error) return setError("Credenciales incorrectas");

    if (response?.ok) {
      reset();
      router.push("/");
    }
  });

  return (
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
      <Card className="px-8 max-w-[350px] w-full">
        <CardHeader className="flex justify-center">
          <Image src="/aproillogo.webp" alt="Aproil" width={250} />
        </CardHeader>

        <CardBody className="flex flex-col gap-4">
          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <Input
            label="Correo electrónico"
            variant="bordered"
            color="default"
            value={watch("email")}
            {...register("email", {
              required: "Este campo es requerido",
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                message: "El correo electrónico no es válido",
              },
            })}
            isInvalid={errors.email ? true : false}
            errorMessage={errors.email?.message}
          />

          <Input
            label="Contraseña"
            variant="bordered"
            color="default"
            value={watch("password")}
            {...register("password", {
              required: "Este campo es requerido",
            })}
            type={showPassword ? "text" : "password"}
            isInvalid={errors.password ? true : false}
            errorMessage={errors.password?.message}
            endContent={
              <Button
                variant="light"
                color="default"
                isIconOnly
                onClick={togglePassword}
              >
                {showPassword ? <LuEyeOff /> : <LuEye />}
              </Button>
            }
          />
        </CardBody>

        <CardFooter className="flex gap-4 justify-between items-center">
          <Link
            anchorIcon
            size="sm"
            color="foreground"
            href="/auth/forgot-password"
          >
            ¿Olvidaste tu contraseña?
          </Link>
          <Button color="primary" size="sm" variant="shadow" onClick={onSubmit}>
            Iniciar sesión
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Login;
