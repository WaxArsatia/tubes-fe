import { Link } from "@tanstack/react-router";
import { LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { useCurrentUser, useLogout } from "@/data/auth";

function Header() {
  const { data: user } = useCurrentUser();
  const logout = useLogout();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout.mutate();
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-white shadow-sm backdrop-blur-sm bg-opacity-95">
      <div className="flex items-center justify-between h-16 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 transition-transform rounded-lg sm:gap-3 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:ring-offset-2"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div className="relative size-10 sm:size-12">
            <svg
              viewBox="0 0 64 64"
              className="size-full"
              aria-label="Rangkuman Logo"
            >
              <title>Rangkuman Logo</title>
              <circle cx="32" cy="32" r="32" fill="#0891B2" />
              <path
                d="M15.1 13.4h19.2v38.4H15.1z"
                fill="#FAFAFA"
                opacity="0.9"
              />
              <path
                d="M35.7 8.3l13.4 11.1-4.8 32.1-13.4-11.1 4.8-32.1z"
                fill="#F59E0B"
              />
            </svg>
          </div>
          <span className="text-lg font-bold whitespace-nowrap sm:text-xl text-cyan-600">
            Rangkuman
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="items-center hidden gap-2 md:flex">
          {user && (
            <Link
              to="/"
              className="px-4 py-2 text-base font-medium text-gray-700 transition-all rounded-lg hover:text-cyan-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:ring-offset-2"
            >
              History
            </Link>
          )}

          {user ? (
            <div className="flex items-center gap-2 ml-4">
              <span className="hidden text-sm font-medium text-gray-700 lg:inline">
                {user.name}
              </span>
              <div className="flex items-center justify-center overflow-hidden transition-transform rounded-full size-10 bg-linear-to-br from-cyan-400 to-cyan-600 ring-2 ring-cyan-100 hover:scale-110">
                <span className="text-base font-bold text-white">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-700 rounded-lg transition-all hover:text-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                title="Logout"
              >
                <LogOut className="size-4" />
                <span className="hidden xl:inline">Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/auth/login"
                className="px-5 py-2 text-sm font-medium text-gray-700 transition-all rounded-lg hover:text-cyan-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:ring-offset-2"
              >
                Sign In
              </Link>
              <Link
                to="/auth/register"
                className="px-5 py-2 text-sm font-semibold text-white transition-all rounded-lg shadow-sm bg-cyan-600 hover:bg-cyan-700 active:bg-cyan-800 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:ring-offset-2 hover:shadow-md"
              >
                Sign Up
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-gray-700 transition-colors rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-600"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? (
            <X className="size-6" />
          ) : (
            <Menu className="size-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="bg-white border-t border-gray-200 shadow-lg md:hidden">
          <nav className="px-4 py-4 space-y-2">
            {user && (
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 text-base font-medium text-gray-700 transition-colors rounded-lg hover:bg-gray-50 hover:text-cyan-600"
              >
                History
              </Link>
            )}

            {user ? (
              <div className="border-t border-gray-100">
                <div className="flex items-center gap-3 px-4 py-3">
                  <div className="flex items-center justify-center overflow-hidden rounded-full size-10 bg-linear-to-br from-cyan-400 to-cyan-600">
                    <span className="text-base font-bold text-white">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {user.name}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center justify-center w-full gap-2 px-4 py-3 text-base font-medium text-red-600 transition-colors rounded-lg hover:bg-red-50"
                >
                  <LogOut className="size-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="pt-2 space-y-2">
                <Link
                  to="/auth/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full px-4 py-3 text-base font-medium text-center text-gray-700 transition-colors rounded-lg hover:bg-gray-50 hover:text-cyan-600"
                >
                  Sign In
                </Link>
                <Link
                  to="/auth/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full px-4 py-3 text-base font-semibold text-center text-white transition-colors rounded-lg shadow-sm bg-cyan-600 hover:bg-cyan-700"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
