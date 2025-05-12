import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Logo from "public/logo.svg?react";
import { Bell, Menu } from "lucide-react";
import Sidebar from "./Sidebar";
type propType = {
  activelink: string,
  setActiveLink: React.Dispatch<React.SetStateAction<string>>,
}

const Nav = ({ activelink,setActiveLink }: propType) => {

  return (
    <header className="sticky top-0 z-50 mx-auto flex justify-center bg-white mb-3">
      <div className="relative flex w-full items-center justify-between gap-10 rounded-b-2xl px-8 py-3">
        {/* Logo */}
        <div className="flex xl:gap-28 gap-20 items-center">
          <Link to="/" className="relative h-10 w-28 md:h-14 md:w-36">
            <Logo className="object-contain h-full w-full" />
          </Link>
          {/* Desktop nav */}
          <nav className="hidden lg:block text-2xl font-semibold capitalize ">
            {activelink}
          </nav>
        </div>

        {/* Join + Mobile sheet trigger */}
        <div className="flex items-center gap-3">
          <div className="sm:flex gap-5 items-center hidden ">
            <Bell />
            <div className="flex items-center gap-2">
              <p className="rounded-full w-10 h-10 bg-gray-200"></p>
              <p>Name</p>
            </div>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                size="icon"
                className="h-10 w-10 bg-transparent text-3xl hover:bg-lightOrange sm:hidden"
              >
                <Menu size={25} color="black" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              {/* Mobile menu items */}
              <nav className="">
                <Sidebar setActiveLink={setActiveLink} activeLink={activelink} mobile={true}/>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Nav;
