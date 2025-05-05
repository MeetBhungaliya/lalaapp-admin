import SearchFeild from "@/components/common/SearchFeild";
import { DEFUALT_USER } from "@/lib/images";
import React from "react";
import { HiMenuAlt1 } from "react-icons/hi";
import { useLocation } from "react-router";

const Header = ({ setIsSidebar }) => {
  const { pathname } = useLocation();
  const headings = [{ path: "/statistics", heading: "Statistics" }];
  return (
    <header className="flex px-3 lg:px-7 bg-white">
      <div className="flex justify-between items-center w-full  py-[13.5px]">
        <div className="flex items-center gap-x-3">
          <div className="lg:hidden">
            <HiMenuAlt1
              onClick={() => setIsSidebar((prev) => !prev)}
              className="text-main text-2xl"
            />
          </div>
          <h3 className="text-primary font-semibold sm:text-[30px] capitalize">
            {headings.find(
              (route) =>
                pathname.includes(route.path) || pathname.startsWith(route.path)
            )?.heading ?? "Not Found"}
          </h3>
        </div>
        {/* <div className='flex items-center gap-2'>
                    <div className='xl:w-[400px] w-full'>
                        <SearchFeild />
                    </div>
                    <div className='flex items-center justify-center sm:size-[50px] size-[40px] bg-ternary rounded-full'>
                        <img src={DEFUALT_USER} alt="DEFUALT_USER" className='sm:size-[35px] size-[30px]' />
                    </div>
                </div> */}
      </div>
    </header>
  );
};

export default Header;
