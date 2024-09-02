import FormAuth from "@/components/contrainer/FormAuth";
import AuthLayout from "@/components/layout/AuthLayout";
import Button from "@/components/UI/Button";
import FormInput from "@/components/UI/FormInput";

const RegisterView = () => {
  return (
    <AuthLayout>
      <FormAuth
        title="Daftar"
        link="/auth/login"
        textLink="Sudah punya akun? Masuk"
      >
        <FormInput type="text" id="name" placeholder="Nama">
          Nama
        </FormInput>
        <FormInput type="email" id="email" placeholder="Email">
          Email
        </FormInput>
        <FormInput type="password" id="pasword" placeholder="***">
          Password
        </FormInput>
        <Button type="submit">Daftar</Button>
      </FormAuth>
    </AuthLayout>
  );
};

export default RegisterView;
