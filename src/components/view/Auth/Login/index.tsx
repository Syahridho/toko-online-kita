import FormAuth from "@/components/contrainer/FormAuth";
import AuthLayout from "@/components/layout/AuthLayout";
import Button from "@/components/UI/Button";
import FormInput from "@/components/UI/FormInput";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

const LoginView = () => {
  const { query, push } = useRouter();
  const callbackUrl: any = query.callbackUrl || "/";

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<any>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setIsError(null);
    const form = event.target as HTMLFormElement;

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: form.email.value,
        password: form.password.value,
        callbackUrl,
      });
      if (!res?.error) {
        setIsLoading(false);
        form.reset();
        push(callbackUrl);
      } else {
        setIsLoading(false);
        setIsError("Email or password is incorrect");
      }
    } catch (error) {
      setIsLoading(false);
      setIsError("Login Failed, Please call support");
    }
  };
  return (
    <AuthLayout>
      <FormAuth
        title="Masuk"
        link="/auth/register"
        textLink="Belum punya akun? Daftar"
        onSubmit={(event: any) => handleSubmit(event)}
      >
        <FormInput type="email" id="email" placeholder="Email">
          Email
        </FormInput>
        <FormInput type="password" id="password" placeholder="***">
          Password
        </FormInput>
        {isError && <p className="text-red-500 text-sm">{isError}</p>}
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Masuk"}
        </Button>
      </FormAuth>
    </AuthLayout>
  );
};

export default LoginView;
