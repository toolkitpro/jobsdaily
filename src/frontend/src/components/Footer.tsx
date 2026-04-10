import { Link } from "@tanstack/react-router";
import { BriefcaseIcon, ExternalLinkIcon } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();
  const utm = encodeURIComponent(
    typeof window !== "undefined" ? window.location.hostname : "jobsdaily",
  );

  return (
    <footer
      className="bg-card border-t border-border mt-auto"
      data-ocid="footer"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <BriefcaseIcon className="h-5 w-5 text-primary" />
              <span className="text-lg font-display font-bold text-foreground tracking-tight">
                JobsDaily
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your daily destination for Government, Private, and Corporate job
              opportunities across India.
            </p>
          </div>

          {/* Job Categories */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">
              Categories
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  to="/"
                  search={{
                    jobType: "Government",
                    location: "",
                    q: "",
                    page: undefined,
                  }}
                  className="hover:text-foreground transition-colors duration-200"
                >
                  Government Jobs
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  search={{
                    jobType: "Private",
                    location: "",
                    q: "",
                    page: undefined,
                  }}
                  className="hover:text-foreground transition-colors duration-200"
                >
                  Private Jobs
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  search={{
                    jobType: "Corporate",
                    location: "",
                    q: "",
                    page: undefined,
                  }}
                  className="hover:text-foreground transition-colors duration-200"
                >
                  Corporate Jobs
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  to="/"
                  search={{
                    jobType: undefined,
                    location: "",
                    q: "",
                    page: undefined,
                  }}
                  className="hover:text-foreground transition-colors duration-200"
                >
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link
                  to="/admin"
                  className="hover:text-foreground transition-colors duration-200"
                >
                  Admin Panel
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">
              Company
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  to="/"
                  search={{
                    jobType: undefined,
                    location: "",
                    q: "",
                    page: undefined,
                  }}
                  className="hover:text-foreground transition-colors duration-200"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  search={{
                    jobType: undefined,
                    location: "",
                    q: "",
                    page: undefined,
                  }}
                  className="hover:text-foreground transition-colors duration-200"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  search={{
                    jobType: undefined,
                    location: "",
                    q: "",
                    page: undefined,
                  }}
                  className="hover:text-foreground transition-colors duration-200"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <p>© {year}. All rights reserved.</p>
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${utm}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-foreground transition-colors duration-200"
          >
            Built with love using caffeine.ai
            <ExternalLinkIcon className="h-3 w-3" />
          </a>
        </div>
      </div>
    </footer>
  );
}
