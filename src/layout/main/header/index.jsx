import React from "react";
import { HiMenuAlt1 } from "react-icons/hi";
import { useLocation } from "react-router";

const Header = ({ setIsSidebar }) => {
  const { pathname } = useLocation();
  const headings = [
    { path: "/statistics", heading: "Statistics" },
    { path: "/users", heading: "Users" },
    { path: "/words/letter-sounds", heading: "Letter Sounds" },
    { path: "/words/word-pronounces", heading: "Words Pronunciation" },
    { path: "/words/phoneme_isolation", heading: "Phoneme Isolation" },
    { path: "/words/segmenting_words", heading: "Segmenting Words" },
    { path: "/words/rhyming", heading: "Rhyming Words" },
    { path: "/words/blending_letter_sounds", heading: "Blending Letter Sounds" },
    { path: "/subscriptions", heading: "Subscriptions" },
  ];
  return (
    <header className="flex px-3 lg:px-7 py-4 bg-white">
      <div className="flex justify-between items-center w-full  py-[13.5px]">
        <div className="flex items-center gap-x-3">
          <div className="lg:hidden">
            <HiMenuAlt1
              onClick={() => setIsSidebar((prev) => !prev)}
              className="text-main text-2xl"
            />
          </div>
          <h3 className="text-primary font-semibold sm:text-[30px] text-2xl capitalize">
            {headings.find(
              (route) =>
                pathname.includes(route.path) || pathname.startsWith(route.path)
            )?.heading ?? "Not Found"}
          </h3>
        </div>
      </div>
    </header>
  );
};

export default Header;
