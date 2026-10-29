import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router";
import authStore from "../../store/authStore";

const AdminLayout = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { checkLogin } = authStore();
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Profile", path: "/profile" },
    { name: "Settings", path: "/settings" },
    { name: "Menus", path: "/admin/create" },
  ];

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-600">
            MyApp
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-sm font-medium text-gray-600 transition hover:text-blue-600"
              >
                {link.name}
              </Link>
            ))}

            <button
              type="button"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 md:hidden"
          >
            {menuOpen ? (
              <span className="text-2xl">✕</span>
            ) : (
              <span className="text-2xl">☰</span>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="border-t border-gray-200 bg-white px-4 py-4 md:hidden">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-3 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                >
                  {link.name}
                </Link>
              ))}

              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="mt-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-medium text-white hover:bg-blue-700"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Dynamic Child Content */}
      <main className="mx-auto w-full max-w-7xl min-w-0 p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
