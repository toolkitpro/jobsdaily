import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeftIcon,
  BriefcaseIcon,
  CalendarIcon,
  MapPinIcon,
  WalletIcon,
} from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { JobBadge } from "../components/JobBadge";
import { Layout } from "../components/Layout";
import { Button } from "../components/ui/button";
import { Skeleton } from "../components/ui/skeleton";
import { useJob } from "../hooks/useJobs";

function timeAgo(postedDate: bigint) {
  const diff = Date.now() - Number(postedDate);
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "Today";
  if (days === 1) return "1 day ago";
  return `${days} days ago`;
}

export function JobDetailPage() {
  const { id } = useParams({ from: "/jobs/$id" });
  const { data: job, isLoading } = useJob(id ? BigInt(id) : null);

  if (isLoading) {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto space-y-4 py-6">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-6 w-40" />
          <div className="flex gap-4">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-32" />
          </div>
          <Skeleton className="h-48 w-full" />
        </div>
      </Layout>
    );
  }

  if (!job) {
    return (
      <Layout>
        <div
          className="max-w-3xl mx-auto text-center py-20 flex flex-col items-center gap-4"
          data-ocid="job-not-found"
        >
          <BriefcaseIcon className="h-12 w-12 text-muted-foreground" />
          <h2 className="text-2xl font-display font-bold text-foreground">
            Job not found
          </h2>
          <p className="text-muted-foreground">
            This job may have been removed or the link is invalid.
          </p>
          <Link
            to="/"
            search={{
              jobType: undefined,
              location: "",
              q: "",
              page: undefined,
            }}
          >
            <Button variant="default">Browse All Jobs</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto py-4" data-ocid="job-detail">
        {/* Back */}
        <Link
          to="/"
          search={{ jobType: undefined, location: "", q: "", page: undefined }}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          data-ocid="back-to-jobs"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back to Jobs
        </Link>

        <motion.div
          className="bg-card rounded-xl border border-border p-6 sm:p-8 shadow-sm"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-6">
            <div>
              <h1 className="text-2xl font-display font-bold text-foreground mb-1">
                {job.title}
              </h1>
              <p className="text-base font-medium text-muted-foreground">
                {job.company}
              </p>
            </div>
            <JobBadge type={job.jobType} className="self-start shrink-0" />
          </div>

          {/* Meta */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground mb-6 pb-6 border-b border-border">
            <span className="flex items-center gap-1.5">
              <MapPinIcon className="h-4 w-4 text-accent" />
              {job.location}
            </span>
            <span className="flex items-center gap-1.5">
              <WalletIcon className="h-4 w-4 text-accent" />
              {job.salaryRange}
            </span>
            <span className="flex items-center gap-1.5">
              <CalendarIcon className="h-4 w-4 text-accent" />
              Posted {timeAgo(job.postedDate)}
            </span>
          </div>

          {/* Description */}
          <section className="mb-6" data-ocid="job-description">
            <h2 className="text-lg font-semibold font-display text-foreground mb-3">
              Job Description
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {job.description}
            </p>
          </section>

          {/* Responsibilities */}
          {job.responsibilities.length > 0 && (
            <section className="mb-6" data-ocid="job-responsibilities">
              <h2 className="text-lg font-semibold font-display text-foreground mb-3">
                Key Responsibilities
              </h2>
              <ul className="space-y-2">
                {job.responsibilities.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Requirements */}
          {job.requirements.length > 0 && (
            <section className="mb-8" data-ocid="job-requirements">
              <h2 className="text-lg font-semibold font-display text-foreground mb-3">
                Requirements
              </h2>
              <ul className="space-y-2">
                {job.requirements.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* CTA */}
          <div
            className="flex gap-3 pt-2 border-t border-border"
            data-ocid="apply-section"
          >
            <Button
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold flex-1 sm:flex-none"
              data-ocid="apply-btn"
              onClick={() => {
                navigator.clipboard
                  .writeText(window.location.href)
                  .then(() =>
                    toast.success("Job link copied! Share it to apply."),
                  )
                  .catch(() =>
                    toast.info("Copy this page URL to share the job."),
                  );
              }}
            >
              Apply Now
            </Button>
            <Link
              to="/"
              search={{
                jobType: undefined,
                location: "",
                q: "",
                page: undefined,
              }}
            >
              <Button variant="outline" data-ocid="browse-more-btn">
                Browse More Jobs
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
