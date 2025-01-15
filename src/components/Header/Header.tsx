import Image from "next/image";
import { RiMenuFill, RiShoppingCart2Line, RiUserLine } from "@remixicon/react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="container mx-auto flex justify-between items-center px-3 py-2.5 lg:px-4 lg:py-5">
      <button
        type="button"
        aria-label="mobile menu open button"
        className="md:hidden">
        <RiMenuFill size={26} />
      </button>
      <Link href="/">
        <Image src="/logo.png" alt="logo image" width={126} height={34} />
      </Link>
      <nav className="hidden md:block">
        <ul className=" md:flex items-center gap-9">
          <li>
            <Link href="/" aria-label="Discovery page">
              Discovery
            </Link>
          </li>
          <li>
            <Link href="/" aria-label="About page">
              About
            </Link>
          </li>
          <li>
            <Link href="/" aria-label="Contact us page">
              Contact us
            </Link>
          </li>
        </ul>
      </nav>
      <div className="flex gap-3">
        <Link href="/login" aria-label="user button">
          <RiUserLine size={26} />
        </Link>
        <button type="button" aria-label="shopping cart button">
          <RiShoppingCart2Line size={26} />
        </button>
      </div>
    </header>
  );
};
export default Header;
