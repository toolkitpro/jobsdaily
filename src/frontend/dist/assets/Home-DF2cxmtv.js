import { u as useSearch, r as reactExports, j as jsxRuntimeExports, L as Link } from "./index-DnsDxaON.js";
import { c as createLucideIcon, u as useJobs, L as Layout, m as motion, B as Button, J as JobBadge, a as Briefcase, S as Skeleton } from "./useJobs-CrnWt-AV.js";
import { I as Input } from "./input-CmEOMXZo.js";
import { M as MapPin, W as Wallet } from "./wallet-Dmdgx2Ax.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode);
const JOB_TYPES = ["Government", "Private", "Corporate"];
const PAGE_SIZE = 9;
function timeAgo(postedDate) {
  const diff = Date.now() - Number(postedDate);
  const days = Math.floor(diff / 864e5);
  if (days === 0) return "Today";
  if (days === 1) return "1 day ago";
  return `${days} days ago`;
}
function JobCardSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "job-card flex flex-col gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-48" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-20 rounded-sm" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-32" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-28" })
    ] })
  ] });
}
function HomePage() {
  const searchParams = useSearch({ from: "/" });
  const [query, setQuery] = reactExports.useState(searchParams.q ?? "");
  const [location, setLocation] = reactExports.useState(searchParams.location ?? "");
  const [activeType, setActiveType] = reactExports.useState(
    searchParams.jobType
  );
  const [page, setPage] = reactExports.useState(searchParams.page ?? 1);
  const filters = {
    jobType: activeType,
    location: location || void 0,
    searchQuery: query || void 0,
    page,
    pageSize: PAGE_SIZE
  };
  const { data, isFetching } = useJobs(filters);
  const totalPages = data ? Math.ceil(Number(data.total) / PAGE_SIZE) : 1;
  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { fullWidth: true, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "bg-primary py-14 px-4 sm:px-6 lg:px-8",
        "data-ocid": "hero-section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.h1,
            {
              className: "text-4xl sm:text-5xl font-display font-bold text-primary-foreground mb-4 leading-tight",
              initial: { opacity: 0, y: -20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.5 },
              children: "Find Your Next Career Move"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.p,
            {
              className: "text-primary-foreground/80 text-lg mb-8",
              initial: { opacity: 0, y: -10 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.5, delay: 0.1 },
              children: "Fresh Government, Private & Corporate jobs published daily"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.form,
            {
              onSubmit: handleSearch,
              className: "flex flex-col sm:flex-row gap-3 bg-card rounded-xl p-3 shadow-lg max-w-3xl mx-auto",
              initial: { opacity: 0, y: 10 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.5, delay: 0.2 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex items-center gap-2 bg-background rounded-lg px-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4 text-muted-foreground shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      value: query,
                      onChange: (e) => setQuery(e.target.value),
                      placeholder: "Search job titles, keywords, or companies…",
                      className: "border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-0 text-sm",
                      "data-ocid": "search-input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-background rounded-lg px-3 sm:w-52", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4 text-muted-foreground shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      value: location,
                      onChange: (e) => setLocation(e.target.value),
                      placeholder: "Location",
                      className: "border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-0 text-sm",
                      "data-ocid": "location-input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "submit",
                    className: "bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-6 shrink-0",
                    "data-ocid": "search-btn",
                    children: "Search Jobs"
                  }
                )
              ]
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-wrap items-center gap-2 mb-6",
          "data-ocid": "category-filter",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-muted-foreground mr-1", children: "Filter by:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => {
                  setActiveType(void 0);
                  setPage(1);
                },
                className: `px-4 py-1.5 rounded-full text-sm font-medium border transition-smooth ${!activeType ? "bg-foreground text-background border-foreground" : "bg-card text-muted-foreground border-border hover:border-foreground hover:text-foreground"}`,
                "data-ocid": "filter-all",
                children: "All Jobs"
              }
            ),
            JOB_TYPES.map((type) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => {
                  setActiveType(type);
                  setPage(1);
                },
                className: `px-4 py-1.5 rounded-full text-sm font-medium border transition-smooth ${activeType === type ? type === "Government" ? "badge-govt border-transparent" : type === "Private" ? "badge-private border-transparent" : "badge-corporate border-transparent" : "bg-card text-muted-foreground border-border hover:border-foreground hover:text-foreground"}`,
                "data-ocid": `filter-${type.toLowerCase()}`,
                children: type
              },
              type
            ))
          ]
        }
      ),
      data && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mb-4", children: [
        "Showing",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: data.jobs.length }),
        " ",
        "of",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: Number(data.total) }),
        " ",
        "jobs",
        activeType && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          " ",
          "in",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: activeType })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5",
          "data-ocid": "jobs-grid",
          children: isFetching && !data ? Array.from({ length: 6 }, (_, i) => `skel-${i}`).map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(JobCardSkeleton, {}, k)) : data == null ? void 0 : data.jobs.map((job, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 16 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.3, delay: i * 0.06 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  to: "/jobs/$id",
                  params: { id: job.id.toString() },
                  className: "job-card flex flex-col gap-3 block hover:no-underline group",
                  "data-ocid": `job-card-${job.id}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 min-w-0", children: job.title }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(JobBadge, { type: job.jobType, className: "shrink-0" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-muted-foreground", children: job.company }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground mt-auto", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3" }),
                        " ",
                        job.location
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "h-3 w-3" }),
                        " ",
                        job.salaryRange
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-3 mt-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: timeAgo(job.postedDate) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent font-medium group-hover:underline", children: "View Details →" })
                    ] })
                  ]
                }
              )
            },
            job.id.toString()
          ))
        }
      ),
      data && data.jobs.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "text-center py-16 flex flex-col items-center gap-4",
          "data-ocid": "empty-state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "h-12 w-12 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-foreground", children: "No jobs found" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-sm", children: "Try adjusting your filters or search terms to find more opportunities." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                onClick: () => {
                  setQuery("");
                  setLocation("");
                  setActiveType(void 0);
                  setPage(1);
                },
                children: "Clear Filters"
              }
            )
          ]
        }
      ),
      totalPages > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex justify-center items-center gap-2 mt-10",
          "data-ocid": "pagination",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "sm",
                disabled: page <= 1,
                onClick: () => setPage((p) => p - 1),
                "data-ocid": "prev-page-btn",
                children: "Previous"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground px-2", children: [
              "Page ",
              page,
              " of ",
              totalPages
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "sm",
                disabled: page >= totalPages,
                onClick: () => setPage((p) => p + 1),
                "data-ocid": "next-page-btn",
                children: "Next"
              }
            )
          ]
        }
      )
    ] })
  ] });
}
export {
  HomePage
};
