import { Link, useSearch } from "@tanstack/react-router";
import {
  BriefcaseIcon,
  MapPinIcon,
  SearchIcon,
  WalletIcon,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { JobBadge } from "../components/JobBadge";
import { Layout } from "../components/Layout";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Skeleton } from "../components/ui/skeleton";
import { useJobs } from "../hooks/useJobs";
import type { JobFilters, JobType } from "../types";

const JOB_TYPES: JobType[] = ["Government", "Private", "Corporate"];
const PAGE_SIZE = 9;

function timeAgo(postedDate: bigint) {
  const diff = Date.now() - Number(postedDate);
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "Today";
  if (days === 1) return "1 day ago";
  return `${days} days ago`;
}

function JobCardSkeleton() {
  return (
    <div className="job-card flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <Skeleton className="h-5 w-48" />
        <Skeleton className="h-6 w-20 rounded-sm" />
      </div>
      <Skeleton className="h-4 w-32" />
      <div className="flex gap-4">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-28" />
      </div>
    </div>
  );
}

export function HomePage() {
  const searchParams = useSearch({ from: "/" });
  const [query, setQuery] = useState(searchParams.q ?? "");
  const [location, setLocation] = useState(searchParams.location ?? "");
  const [activeType, setActiveType] = useState<JobType | undefined>(
    searchParams.jobType,
  );
  const [page, setPage] = useState(searchParams.page ?? 1);

  const filters: JobFilters = {
    jobType: activeType,
    location: location || undefined,
    searchQuery: query || undefined,
    page,
    pageSize: PAGE_SIZE,
  };

  const { data, isFetching } = useJobs(filters);

  const totalPages = data ? Math.ceil(Number(data.total) / PAGE_SIZE) : 1;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
  };

  return (
    <Layout fullWidth>
      {/* Hero */}
      <section
        className="bg-primary py-14 px-4 sm:px-6 lg:px-8"
        data-ocid="hero-section"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            className="text-4xl sm:text-5xl font-display font-bold text-primary-foreground mb-4 leading-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Find Your Next Career Move
          </motion.h1>
          <motion.p
            className="text-primary-foreground/80 text-lg mb-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Fresh Government, Private & Corporate jobs published daily
          </motion.p>

          {/* Search bar */}
          <motion.form
            onSubmit={handleSearch}
            className="flex flex-col sm:flex-row gap-3 bg-card rounded-xl p-3 shadow-lg max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex-1 flex items-center gap-2 bg-background rounded-lg px-3">
              <SearchIcon className="h-4 w-4 text-muted-foreground shrink-0" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search job titles, keywords, or companies…"
                className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-0 text-sm"
                data-ocid="search-input"
              />
            </div>
            <div className="flex items-center gap-2 bg-background rounded-lg px-3 sm:w-52">
              <MapPinIcon className="h-4 w-4 text-muted-foreground shrink-0" />
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location"
                className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-0 text-sm"
                data-ocid="location-input"
              />
            </div>
            <Button
              type="submit"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-6 shrink-0"
              data-ocid="search-btn"
            >
              Search Jobs
            </Button>
          </motion.form>
        </div>
      </section>

      {/* Category Filter + Results */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Pills */}
        <div
          className="flex flex-wrap items-center gap-2 mb-6"
          data-ocid="category-filter"
        >
          <span className="text-sm font-medium text-muted-foreground mr-1">
            Filter by:
          </span>
          <button
            type="button"
            onClick={() => {
              setActiveType(undefined);
              setPage(1);
            }}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-smooth ${
              !activeType
                ? "bg-foreground text-background border-foreground"
                : "bg-card text-muted-foreground border-border hover:border-foreground hover:text-foreground"
            }`}
            data-ocid="filter-all"
          >
            All Jobs
          </button>
          {JOB_TYPES.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => {
                setActiveType(type);
                setPage(1);
              }}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-smooth ${
                activeType === type
                  ? type === "Government"
                    ? "badge-govt border-transparent"
                    : type === "Private"
                      ? "badge-private border-transparent"
                      : "badge-corporate border-transparent"
                  : "bg-card text-muted-foreground border-border hover:border-foreground hover:text-foreground"
              }`}
              data-ocid={`filter-${type.toLowerCase()}`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Results count */}
        {data && (
          <p className="text-sm text-muted-foreground mb-4">
            Showing{" "}
            <span className="font-semibold text-foreground">
              {data.jobs.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-foreground">
              {Number(data.total)}
            </span>{" "}
            jobs
            {activeType && (
              <>
                {" "}
                in{" "}
                <span className="font-semibold text-foreground">
                  {activeType}
                </span>
              </>
            )}
          </p>
        )}

        {/* Job Cards Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          data-ocid="jobs-grid"
        >
          {isFetching && !data
            ? Array.from({ length: 6 }, (_, i) => `skel-${i}`).map((k) => (
                <JobCardSkeleton key={k} />
              ))
            : data?.jobs.map((job, i) => (
                <motion.div
                  key={job.id.toString()}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                >
                  <Link
                    to="/jobs/$id"
                    params={{ id: job.id.toString() }}
                    className="job-card flex flex-col gap-3 block hover:no-underline group"
                    data-ocid={`job-card-${job.id}`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 min-w-0">
                        {job.title}
                      </h3>
                      <JobBadge type={job.jobType} className="shrink-0" />
                    </div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {job.company}
                    </p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground mt-auto">
                      <span className="flex items-center gap-1">
                        <MapPinIcon className="h-3 w-3" /> {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <WalletIcon className="h-3 w-3" /> {job.salaryRange}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-3 mt-1">
                      <span>{timeAgo(job.postedDate)}</span>
                      <span className="text-accent font-medium group-hover:underline">
                        View Details →
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
        </div>

        {/* Empty state */}
        {data && data.jobs.length === 0 && (
          <div
            className="text-center py-16 flex flex-col items-center gap-4"
            data-ocid="empty-state"
          >
            <BriefcaseIcon className="h-12 w-12 text-muted-foreground" />
            <h3 className="text-lg font-semibold text-foreground">
              No jobs found
            </h3>
            <p className="text-sm text-muted-foreground max-w-sm">
              Try adjusting your filters or search terms to find more
              opportunities.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setQuery("");
                setLocation("");
                setActiveType(undefined);
                setPage(1);
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div
            className="flex justify-center items-center gap-2 mt-10"
            data-ocid="pagination"
          >
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
              data-ocid="prev-page-btn"
            >
              Previous
            </Button>
            <span className="text-sm text-muted-foreground px-2">
              Page {page} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
              data-ocid="next-page-btn"
            >
              Next
            </Button>
          </div>
        )}
      </section>
    </Layout>
  );
}
