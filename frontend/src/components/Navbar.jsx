import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, Settings, User, Info } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="bg-base-100/95 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg shadow-sm">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          {/* Logo Section */}
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="flex items-center hover:opacity-80 transition-all group"
            >
              <div className="relative">
                <img
                  src="/Orbitto.png"
                  alt="Orbiito Logo"
                  className="w-20 h-9 object-contain group-hover:scale-105 transition-transform duration-200"
                />
                <div className="absolute inset-0 bg-primary/5 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Orbitto
              </h1>
            </Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-1.5">
            {/* About - Always visible for everyone */}
            <Link 
              to="/about" 
              className="btn btn-sm gap-2 hover:scale-105 transition-all duration-200 hover:shadow-md"
            >
              <Info className="w-4 h-4" />
              <span className="hidden sm:inline">About</span>
            </Link>

            {/* Settings - Always visible */}
            <Link
              to={"/settings"}
              className="btn btn-sm gap-2 hover:scale-105 transition-all duration-200 hover:shadow-md"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {/* Profile & Logout - Only when logged in */}
            {authUser && (
              <>
                <Link 
                  to={"/profile"} 
                  className="btn btn-sm gap-2 hover:scale-105 transition-all duration-200 hover:shadow-md"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button 
                  className="btn btn-sm gap-2 hover:bg-error/10 hover:text-error hover:scale-105 transition-all duration-200" 
                  onClick={logout}
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;