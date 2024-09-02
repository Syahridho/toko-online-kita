import FormAuth from "@/components/contrainer/FormAuth";
import AuthLayout from "@/components/layout/AuthLayout";
import Button from "@/components/UI/Button";
import FormInput from "@/components/UI/FormInput";

const LoginView = () => {
  return (
    <AuthLayout>
      <FormAuth
        title="Masuk"
        link="/auth/register"
        textLink="Belum punya akun? Daftar"
      >
        <FormInput type="email" id="email" placeholder="Email">
          Email
        </FormInput>
        <FormInput type="password" id="pasword" placeholder="***">
          Password
        </FormInput>
        <Button type="submit">Masuk</Button>
      </FormAuth>
    </AuthLayout>
  );
};

export default LoginView;
