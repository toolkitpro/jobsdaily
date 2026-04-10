import { Link, useNavigate } from "@tanstack/react-router";
import {
  BriefcaseIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  XIcon,
} from "lucide-react";
import { useState } from "react";
import { useAdmin } from "../hooks/useAdmin";
import { Button } from "./ui/button";

const NAV_LINK_CLASS =
  "text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200";
const NAV_LINK_ACTIVE_CLASS = "text-sm font-medium text-foreground";
const MOBILE_NAV_CLASS =
  "block px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors";

const DEFAULT_SEARCH = {
  jobType: undefined,
  location: "",
  q: "",
  page: undefined,
} as const;

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAdmin, isLoggedIn, login, logout, isLoggingIn } = useAdmin();
  const navigate = useNavigate();

  const handleAdminClick = () => {
    if (isLoggedIn && isAdmin) {
      navigate({ to: "/admin" });
    } else {
      login();
    }
  };

  return (
    <header
      className="bg-card border-b border-border shadow-sm sticky top-0 z-50"
      data-ocid="header"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            search={DEFAULT_SEARCH}
            className="flex items-center gap-2 shrink-0"
            data-ocid="logo"
          >
            <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
              <BriefcaseIcon className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-xl font-display font-bold text-foreground tracking-tight">
              JobsDaily
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex items-center gap-6"
            aria-label="Main navigation"
          >
            <Link
              to="/"
              search={DEFAULT_SEARCH}
              className={NAV_LINK_CLASS}
              activeProps={{ className: NAV_LINK_ACTIVE_CLASS }}
              data-ocid="nav-home"
            >
              Home
            </Link>
            <Link
              to="/"
              search={DEFAULT_SEARCH}
              className={NAV_LINK_CLASS}
              activeProps={{ className: NAV_LINK_ACTIVE_CLASS }}
              data-ocid="nav-browse-jobs"
            >
              Browse Jobs
            </Link>
          </nav>

          {/* Admin CTA */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn && isAdmin ? (
              <div className="flex items-center gap-2">
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => navigate({ to: "/admin" })}
                  data-ocid="admin-panel-btn"
                >
                  Admin Panel
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="text-muted-foreground"
                  data-ocid="logout-btn"
                >
                  <LogOutIcon className="h-4 w-4 mr-1" />
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                variant="default"
                size="sm"
                onClick={handleAdminClick}
                disabled={isLoggingIn}
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
                data-ocid="admin-login-btn"
              >
                <LogInIcon className="h-4 w-4 mr-1.5" />
                {isLoggingIn ? "Logging in…" : "Admin Login"}
              </Button>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            data-ocid="mobile-menu-btn"
          >
            {mobileOpen ? (
              <XIcon className="h-5 w-5" />
            ) : (
              <MenuIcon className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div
            className="md:hidden border-t border-border pb-4 pt-2 space-y-1"
            data-ocid="mobile-menu"
          >
            <Link
              to="/"
              search={DEFAULT_SEARCH}
              onClick={() => setMobileOpen(false)}
              className={MOBILE_NAV_CLASS}
              data-ocid="mobile-nav-home"
            >
              Home
            </Link>
            <Link
              to="/"
              search={DEFAULT_SEARCH}
              onClick={() => setMobileOpen(false)}
              className={MOBILE_NAV_CLASS}
              data-ocid="mobile-nav-browse-jobs"
            >
              Browse Jobs
            </Link>

            <div className="px-3 pt-2">
              {isLoggedIn && isAdmin ? (
                <div className="flex flex-col gap-2">
                  <Button
                    variant="default"
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      setMobileOpen(false);
                      navigate({ to: "/admin" });
                    }}
                    data-ocid="mobile-admin-panel-btn"
                  >
                    Admin Panel
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      setMobileOpen(false);
                      logout();
                    }}
                    data-ocid="mobile-logout-btn"
                  >
                    <LogOutIcon className="h-4 w-4 mr-1" />
                    Logout
                  </Button>
                </div>
              ) : (
                <Button
                  variant="default"
                  size="sm"
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                  onClick={() => {
                    setMobileOpen(false);
                    handleAdminClick();
                  }}
                  disabled={isLoggingIn}
                  data-ocid="mobile-admin-login-btn"
                >
                  <LogInIcon className="h-4 w-4 mr-1.5" />
                  {isLoggingIn ? "Logging in…" : "Admin Login"}
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
