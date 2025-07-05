import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Logo from "public/logo.svg?react";
import { Bell, Menu } from "lucide-react";
import Sidebar from "./Sidebar";

type propType = {
  activelink: string;
  setActiveLink: React.Dispatch<React.SetStateAction<string>>;
};

const Nav = ({ activelink, setActiveLink }: propType) => {
  return (
    <header className="sticky top-0 z-50 mx-auto mb-3 flex justify-center bg-white">
      <div className="relative flex w-full items-center justify-between gap-10 rounded-b-2xl px-5 py-3 md:px-8">
        {/* Logo */}
        <div className="flex items-center gap-20">
          <Link to="/" className="relative h-10 w-28 md:h-14 md:w-36">
            <Logo className="h-full w-full object-contain" />
          </Link>
          {/* Desktop nav */}
          <nav className="hidden text-2xl font-semibold capitalize lg:block">
            {activelink}
          </nav>
        </div>
        {/* Join + Mobile sheet trigger */}
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-5 sm:flex">
            <Bell />
            <div className="flex items-center gap-2">
              <p className="bg-secondary h-10 w-10 rounded-full"></p>
              <p>Name</p>
            </div>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                size="icon"
                className="hover:bg-lightOrange h-10 w-10 cursor-pointer bg-transparent text-3xl shadow-none sm:hidden"
              >
                <Menu size={25} color="black" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              {/* Mobile menu items */}
              <nav className="">
                <Sidebar
                  setActiveLink={setActiveLink}
                  activeLink={activelink}
                  mobile={true}
                />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Nav;
