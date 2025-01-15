import { Outlet } from 'react-router-dom';
import { menuRoutes } from '../router/router';
import { SideBarMenuItem } from '../components';
import { useEffect, useState } from 'react';
import { ModalSignUp } from '../components/modal/ModalSignUp';

export const DashboardLayout = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('hs_theme') || 'auto';
    }
    return 'auto';
  });
  const [show, setShow] = useState(true);

  useEffect(() => {
    const html = document.documentElement;
  
    if (theme === 'dark') {
      html.classList.add('dark');
      html.classList.remove('light');
    } else if (theme === 'light') {
      html.classList.add('light');
      html.classList.remove('dark');
    } else {
      // Auto-detecta según el sistema
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        html.classList.add('dark');
        html.classList.remove('light');
      } else {
        html.classList.add('light');
        html.classList.remove('dark');
      }
    }

    if (theme !== 'auto') {
      localStorage.setItem('hs_theme', theme);
    } else {
      localStorage.removeItem('hs_theme');
    }
  }, [theme]);

  return (
    <main className="flex flex-row pt-7 dark:bg-black bg-[#f1f1f1]">
      <ModalSignUp show={show} setShow={setShow} />
      <nav className="hidden sm:flex flex-col ml-5 w-[370px] min-h-[calc(100vh-3.0rem)] bg-white dark:bg-[#2f2f2f] p-5 rounded-3xl">
        <div className="flex flex-col">
          <h1 className="font-bold text-lg lg:text-3xl bg-gradient-to-br text-[#202020] dark:text-white text-center">
            ReactGPT<span className="text-[#EC0932]">.</span>
          </h1>
          {theme !== 'dark' ? (
            <button
              type="button"
              className="block font-medium text-gray-800 rounded-full hover:bg-gray-200 focus:outline-none focus:bg-gray-200 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
              onClick={() => setTheme('dark')}
            >
              <span className="group inline-flex shrink-0 justify-center items-center size-9">
                <svg
                  className="shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                </svg>
              </span>
            </button>
          ) : (
            <button
              type="button"
              className="block font-medium text-gray-800 rounded-full hover:bg-gray-200 focus:outline-none focus:bg-gray-200 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
              onClick={() => setTheme('light')}
            >
              <span className="group inline-flex shrink-0 justify-center items-center size-9">
                <svg
                  className="shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="4"></circle>
                  <path d="M12 2v2"></path>
                  <path d="M12 20v2"></path>
                  <path d="m4.93 4.93 1.41 1.41"></path>
                  <path d="m17.66 17.66 1.41 1.41"></path>
                  <path d="M2 12h2"></path>
                  <path d="M20 12h2"></path>
                  <path d="m6.34 17.66-1.41 1.41"></path>
                  <path d="m19.07 4.93-1.41 1.41"></path>
                </svg>
              </span>
            </button>
          )}
        </div>
        {/* <span className="text-xl text-black">Bienvenido</span> */}

        <div className="border-[#EC0932] border my-3" />

        {menuRoutes.map((opt) => (
          <SideBarMenuItem key={opt.to} {...opt} />
        ))}
      </nav>

      <section className="mx-3 sm:mx-20 flex flex-col w-full h-[calc(100vh-50px)]  bg-white dark:bg-[#2f2f2f] p-5 rounded-3xl">
        <div className="flex flex-row h-full bg-[#F1F1F1] dark:bg-black">
          <div className="flex flex-col flex-auto h-full p-1">
            <Outlet />
          </div>
        </div>
      </section>
    </main>
  );
};
