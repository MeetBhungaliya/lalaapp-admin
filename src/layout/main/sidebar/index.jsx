import NavIcon from "@/components/common/NavIcon";
import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet";
import {
  ARROW_DOWN_ICON,
  CHART_ACTIVE_ICON,
  CHART_ICON,
  CROWN_ACTIVE_ICON,
  CROWN_ICON,
  LALA_LOGO,
  LOGOUT_ACTIVE_ICON,
  LOGOUT_ICON,
  PROFILE_ACTIVE_ICON,
  PROFILE_ICON,
  SUBSCRIPTION_ACTIVE_ICON,
  WORD_ACTIVE_ICON,
  WORD_ICON,
} from "@/lib/images";
import { cn } from "@/lib/utils";
import SignOutModal from "@/modal/SignOutModal";
import React, { useMemo, useState } from "react";
import { Link, useLocation } from "react-router";

const Sidebar = ({ isSidebar, setIsSidebar }) => {
  const { pathname } = useLocation();

  const [open, setOpen] = useState({
    open: false,
    data: null,
  });
  const [openSubMenu, setOpenSubMenu] = useState(false);

  const sidebar_menu = useMemo(
    () => [
      {
        name: "Statistics",
        to: "/statistics",
        icon: <NavIcon active={CHART_ACTIVE_ICON} base={CHART_ICON} />,
      },
      {
        name: "Users",
        to: "/users",
        icon: <NavIcon active={PROFILE_ACTIVE_ICON} base={PROFILE_ICON} />,
      },
      {
        name: "Words",
        icon: <NavIcon active={WORD_ACTIVE_ICON} base={WORD_ICON} />,
        children: [
          { name: "Letter Sounds", to: "/words/letter-sounds" },
          { name: "Words Pronunciation", to: "/words/word-pronounces" },
          { name: "Rhyming Words", to: "/words/rhyming" },
          { name: "Phoneme Isolation", to: "/words/phoneme" },
          { name: "Blending Letter Sounds", to: "/words/blending" },
          { name: "Segmenting Words", to: "/words/segmenting" },
        ],
      },
      {
        name: "Subscriptions",
        to: "/subscriptions",
        icon: <NavIcon active={SUBSCRIPTION_ACTIVE_ICON} base={CROWN_ICON} />,
      },
    ],
    []
  );
  return (
    <>
      <div className="min-w-[250px] xl:min-w-[270px] 2xl:min-w-[300px]  border-r border-[#FAFAFA] hidden lg:flex flex-col h-dvh bg-white  overflow-hidden ">
        <div
          className="flex justify-center items-center gap-x-3 py-5 mx-4 border-b border-[#F0F0F0]"
          style={{
            borderImage:
              "linear-gradient(90deg, rgba(126, 128, 140, 0) 0%, rgba(126, 128, 140, 0.3) 45%, rgba(126, 128, 140, 0) 100%)",
            borderImageSlice: 1,
          }}
        >
          <img className="w-[100px]" src={LALA_LOGO} alt="LALA_LOGO" />
        </div>
        <div className="flex flex-col justify-between h-full py-6">
          <div className="flex h-full flex-1 flex-col px-6 space-y-5">
            {sidebar_menu.map((item, index) =>
              item.children ? (
                <div
                  key={index}
                  className={`rounded-[10px] overflow-hidden ${
                    openSubMenu ? "bg-[#EFF9FF]" : "bg-ternary"
                  }`}
                >
                  <button
                    onClick={() => setOpenSubMenu(!openSubMenu)}
                    className={cn(
                      "flex items-center w-full px-4 py-3 font-medium text-[16px] group"
                    )}
                  >
                    <div>{item.icon}</div>
                    <span className="ml-2 text-[#282C3F]">{item.name}</span>
                    <img
                      src={ARROW_DOWN_ICON}
                      alt="ARROW_DOWN_ICON"
                      className={cn(
                        "ml-auto transition-transform",
                        openSubMenu && "rotate-180"
                      )}
                    />
                  </button>
                  {openSubMenu && (
                    <div className="ml-9 flex flex-col">
                      {item.children.map((sub, subIdx) => (
                        <Link
                          to={sub.to}
                          key={subIdx}
                          className={cn(
                            "px-4 py-2 text-[14px] font-normal text-[#3D4152] truncate",
                            {
                              "text-main font-semibold": pathname.includes(
                                sub.to
                              ),
                            }
                          )}
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to={item.to}
                  data-active={pathname.includes(item.to)}
                  key={index}
                  className={cn(
                    "flex group relative data-[active=true]:bg-main bg-ternary px-4 py-3 transition-all duration-200 items-center gap-x-2 rounded-[10px]"
                  )}
                >
                  <div>{item.icon}</div>
                  <div className="font-medium text-[16px] group-data-[active=true]:text-white text-[#3D4152] ">
                    {item.name}
                  </div>
                </Link>
              )
            )}
          </div>
          <button
            type="button"
            onClick={() =>
              setOpen({
                open: true,
                data: null,
              })
            }
            className="flex mx-6 group relative bg-ternary px-4 py-3.5  transition-all duration-200 cursor-pointer group items-center gap-x-2 rounded-[10px]"
          >
            <img src={LOGOUT_ICON} alt="LOGOUT_ICON" />
            <div className="font-medium text-[16px] text-[#3D4152]">
              Log Out
            </div>
          </button>
        </div>
      </div>
      <Sheet
        className=""
        open={isSidebar}
        onOpenChange={(e) => setIsSidebar(e)}
      >
        <SheetContent
          onOpenAutoFocus={(e) => e.preventDefault()}
          closeIcon={false}
          className="w-[300px] bg-white h-dvh p-0 pb-5 flex flex-col focus:ring-0 gap-y-0"
          side="left"
        >
          <SheetHeader asChild className="p-0">
            <div className="flex justify-center items-center gap-x-3 py-5  mx-4 border-b border-[#F0F0F0]">
              <h1 className="text-3xl font-bold">LOGO</h1>
            </div>
          </SheetHeader>
          <div className="flex flex-col justify-between h-full pt-4">
            <div className="flex h-full flex-1 flex-col px-4 space-y-3">
              {sidebar_menu.map((item, index) =>
                item.children ? (
                  <div
                    key={index}
                    className={`rounded-[10px] overflow-hidden ${
                      openSubMenu ? "bg-[#EFF9FF]" : "bg-ternary"
                    }`}
                  >
                    <button
                      onClick={() => setOpenSubMenu(!openSubMenu)}
                      className={cn(
                        "flex items-center w-full px-4 py-3 font-medium text-[16px] group"
                      )}
                    >
                      <div>{item.icon}</div>
                      <span className="ml-2 text-[#282C3F]">{item.name}</span>
                      <img
                        src={ARROW_DOWN_ICON}
                        alt="ARROW_DOWN_ICON"
                        className={cn(
                          "ml-auto transition-transform",
                          openSubMenu && "rotate-180"
                        )}
                      />
                    </button>
                    {openSubMenu && (
                      <div className="ml-9 flex flex-col">
                        {item.children.map((sub, subIdx) => (
                          <Link
                            to={sub.to}
                            key={subIdx}
                            className={cn(
                              "px-4 py-2 text-[14px] font-normal text-[#3D4152] truncate",
                              {
                                "text-main font-semibold": pathname.includes(
                                  sub.to
                                ),
                              }
                            )}
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.to}
                    data-active={pathname.includes(item.to)}
                    key={index}
                    className={cn(
                      "flex group relative data-[active=true]:bg-main bg-ternary px-4 py-3 transition-all duration-200 items-center gap-x-2 rounded-[10px]"
                    )}
                  >
                    <div>{item.icon}</div>
                    <div className="font-medium text-[16px] group-data-[active=true]:text-white text-[#3D4152] ">
                      {item.name}
                    </div>
                  </Link>
                )
              )}
            </div>
            <button
              type="button"
              onClick={() =>
                setOpen({
                  open: true,
                  data: null,
                })
              }
              className="flex mx-6 group relative bg-ternary px-4 py-3.5  transition-all duration-200 cursor-pointer group items-center gap-x-2 rounded-[10px]"
            >
              <img src={LOGOUT_ICON} alt="LOGOUT_ICON" />
              <div className="font-medium text-[16px] text-[#3D4152]">
                Log Out
              </div>
            </button>
          </div>
        </SheetContent>
      </Sheet>
      {open?.open && <SignOutModal open={open} setOpen={setOpen} />}
    </>
  );
};

export default Sidebar;
