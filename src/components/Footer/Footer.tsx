import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white font-serif">
      <div className="container mx-auto px-3 pt-10 pb-14 lg:px-4 lg:pt-12 lg:pb-16 divider md:flex md:justify-between">
        <div className="md:flex md:flex-col md:w-5/12">
          <Link href="/">
            <Image
              src="/logo-white.png"
              alt="logo image"
              width={126}
              height={34}
            />
          </Link>
          <p className="mt-4">
            Your natural candle made for your home and for your wellness.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-12 gap-y-5 mt-4 md:mt-0 md:flex-row lg:gap-20 xl:gap-26">
          <div className="w-[calc(100%/2-1.5rem)] md:w-auto">
            <h3 className="text-green-500 mb-3 font-medium">Discover</h3>
            <ul className="flex flex-col gap-2 text-sm lg:text-base">
              <li>
                <Link href="/">New season</Link>
              </li>
              <li>
                <Link href="/">Most searched</Link>
              </li>
              <li>
                <Link href="/">Most selled</Link>
              </li>
            </ul>
          </div>
          <div className="w-[calc(100%/2-1.5rem)] md:w-auto">
            <h3 className="text-green-500 mb-3 font-medium">About</h3>
            <ul className="flex flex-col gap-2 text-sm lg:text-base">
              <li>
                <Link href="/">Help</Link>
              </li>
              <li>
                <Link href="/">Shipping</Link>
              </li>
              <li>
                <Link href="/">Affiliate</Link>
              </li>
            </ul>
          </div>
          <div className="w-[calc(100%/2-1.5rem)] md:w-auto">
            <h3 className="text-green-500 mb-3 font-medium">Info</h3>
            <ul className="flex flex-col gap-2 text-sm lg:text-base">
              <li>
                <Link href="/">Contact us</Link>
              </li>
              <li>
                <Link href="/">Privacy Policies</Link>
              </li>
              <li>
                <Link href="/">Terms & Conditions</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <p className="text-center bg-gray-300 text-slate-500 p-3 lg:p-4 font-serif text-xs lg:text-sm">
        &copy; {new Date().getFullYear()} Candleaf. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
