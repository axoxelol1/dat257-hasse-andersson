import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import { Logotype } from "./Logotype";
import LargeLoginwindow from "./LargeLoginwindow";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";

/*
  * This is the header component.
  * It is used to display the logo and the navigation bar.
  * It also contains the login window.
*/

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [logInOpen, setLogInOpen] = useState(false);

  function NavTab({link, label, icon}: {link: string, label: string, icon: string}) {
    const router = useRouter();
    const isActive = router.pathname === link;

    return (
      <div className={(isActive ? "border-b-2 border-black" : "")+ " flex h-full"}>
        <a href={link} className="flex justify-center items-center text-black hover:-translate-y-0.5 transition-transform px-3 text-xl font-medium ">
          <Icon className="mr-2" icon={icon} height={24} width={24}/> {label}
        </a>
      </div>
    );
  }
  
  function MobileNavTab({link, label, icon}: {link: string, label: string, icon: string}) {
    const router = useRouter();
    const isActive = router.pathname === link;
    
    return (
      <div className={"flex h-full"}>
        <a href={link} className="flex justify-center items-center text-black hover:-translate-y-0.5 transition-transform px-3 text-xl font-medium ">
          <Icon className="mr-2" icon={icon} height={24} width={24}/>
          {label}
          {isActive && <Icon className="ml-2" icon="octicon:dot-fill-16" height={24} width={24}/>}
        </a>
      </div>
    );
  }

  return (
    <div className="mb-4 w-full">
      <nav>
        <div className="w-full px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex flex-row h-full items-center grow">
              <div className="flex-shrink-0">
                <Logotype/>
              </div>
              <div className="hidden h-full md:block grow">
                <div className="ml-10 h-full flex place-content-end align-middle">
                  <NavTab link={"/"} label={"Timeline"} icon={"octicon:home-16"}/>
                  <NavTab link={"/calendar"} label={"Calendar"} icon={"octicon:calendar-16"}/>
                  <NavTab link={"/dashboard"} label={"Dashboard"} icon={"octicon:table-16"}/>
                  <LargeLoginwindow />
                </div>
              </div>
            </div>
            {/* Mobile below */}
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {(ref) => (
            <div className="md:hidden" id="mobile-menu">
              <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <MobileNavTab link={"/"} label={"Timeline"} icon={"octicon:home-16"}/>
                <MobileNavTab link={"/calendar"} label={"Calendar"} icon={"octicon:calendar-16"}/>
                <MobileNavTab link={"/dashboard"} label={"Dashboard"} icon={"octicon:table-16"}/>
                <div>
                  <button onClick={() => setLogInOpen(!logInOpen)} type="button" className="flex justify-center items-center text-black hover:-translate-y-0.5 transition-transform px-3 text-xl font-medium">
                    {logInOpen ? (<Icon className="mr-2" icon="octicon:chevron-down-16" height={24} width={24}/>) : (<Icon className="mr-2" icon="octicon:chevron-right-16" height={24} width={24}/>)}
                    Login
                  </button>
                  {logInOpen && (
                    <div className="flex mx-6 flex-col">
                      <p>Username</p>
                      <input type="text" className="border border-gray-300 p-2 rounded-md" />
                      <p>Password</p>
                      <input type="password" className="border border-gray-300 p-2 rounded-md" />
                      <button type="button" className="my-2 py-2 flex justify-center items-center text-white bg-gray-900 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                        <span>Login</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </Transition>
      </nav>
    </div>
  );
}

export default Header;
