import Link from "next/link";
import { useRouter } from "next/router";
import { AiOutlineHome } from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";
import { CgNotes } from "react-icons/cg";
import { MdOutlineShoppingCart } from "react-icons/md";

const NavItems = [
  {
    title: "Home",
    url: "/",
    icons: <AiOutlineHome />,
  },
  {
    title: "Orders",
    url: "/orders",
    icons: <CgNotes />,
  },
  {
    title: "Profile",
    url: "/profile",
    icons: <BsPersonCircle />,
  },
];

const Navbar = () => {
  const { pathname } = useRouter();
  return (
    <div className="flex justify-around items-center max-w-[500px] w-full mx-auto fixed bottom-0 left-1/2 transform -translate-x-1/2 bg-gray-100">
      {NavItems.map((item: any, index: number) => (
        <Link
          key={index}
          href={item.url}
          className={`p-4 text-2xl ${
            pathname === item.url ? "text-slate-8000" : "text-slate-400"
          }`}
        >
          {item.icons}
        </Link>
      ))}
    </div>
  );
};

export default Navbar;
