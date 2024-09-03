import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import Button from "@/components/UI/Button";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

type PropTypes = {
  children: React.ReactNode;
  title?: string;
  link: string;
  textLink: string;
  onSubmit?: Function | any;
};

const FormAuth = (props: PropTypes) => {
  const { children, title, link, textLink, onSubmit } = props;

  const { query } = useRouter();

  const callbackUrl: any = query.callbackUrl || "/";

  return (
    <div className="flex flex-col justify-center rounded-md p-8 sm:p-12 sm:shadow sm:border">
      <h1 className="font-bold text-2xl mb-3 text-center">{title}</h1>
      <form className="flex flex-col gap-2 w-full" onSubmit={onSubmit}>
        {children}
      </form>
      <h1 className="text-center text-sm my-2">
        {textLink}{" "}
        <Link href={link} className="text-blue-800 italic underline">
          sini
        </Link>
      </h1>
      <div className="flex items-center justify-center gap-4 text-sm my-4">
        <hr className="w-full" />
        <span>Atau</span>
        <hr className="w-full" />
      </div>
      <div>
        <Button
          type="button"
          className="flex items-center justify-center gap-4 w-full border py-2 rounded-md !bg-slate-200 !text-slate-600 hover:!bg-slate-300 "
          onClick={() => signIn("google", { callbackUrl, redirect: false })}
        >
          <FcGoogle />
          Masuk Dengan Google
        </Button>
      </div>
    </div>
  );
};

export default FormAuth;
