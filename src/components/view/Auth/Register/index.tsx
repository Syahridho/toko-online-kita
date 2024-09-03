import FormAuth from "@/components/contrainer/FormAuth";
import AuthLayout from "@/components/layout/AuthLayout";
import Button from "@/components/UI/Button";
import FormInput from "@/components/UI/FormInput";
import authServices from "@/services/auth";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

const RegisterView = () => {
  const { push } = useRouter();

  const [isLoading, setIsloading] = useState<boolean>(false);
  const [isError, setIsError] = useState<any>("");

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsloading(true);
    const form = event.target as HTMLFormElement;
    const data = {
      fullname: form.fullname.value,
      email: form.email.value,
      password: form.password.value,
    };

    console.log(data);

    const result = await authServices.registerAccount(data);

    try {
      if (result.status === 200) {
        form.reset();
        setIsloading(false);
        push("/auth/login");
      } else {
        setIsloading(false);
        setIsError("Akun sudah dipakai");
      }
    } catch (error) {
      setIsloading(false);
      console.log(error);
      setIsError(error);
    }
  };

  return (
    <AuthLayout>
      <FormAuth
        title="Daftar"
        link="/auth/login"
        textLink="Sudah punya akun? Masuk"
        onSubmit={(event: any) => handleRegister(event)}
      >
        <FormInput type="text" id="fullname" placeholder="Nama">
          Nama
        </FormInput>
        <FormInput type="email" id="email" placeholder="Email">
          Email
        </FormInput>
        <FormInput type="password" id="password" placeholder="***">
          Password
        </FormInput>
        {isError && <h1>{isError}</h1>}
        <Button type="submit">{isLoading ? "Loading..." : "Daftar"}</Button>
      </FormAuth>
    </AuthLayout>
  );
};

export default RegisterView;
