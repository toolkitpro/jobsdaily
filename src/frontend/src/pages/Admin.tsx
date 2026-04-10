import {
  BriefcaseIcon,
  EditIcon,
  LockIcon,
  PlusCircleIcon,
  TrashIcon,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { JobBadge } from "../components/JobBadge";
import { Layout } from "../components/Layout";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Skeleton } from "../components/ui/skeleton";
import { Textarea } from "../components/ui/textarea";
import { useAdmin } from "../hooks/useAdmin";
import {
  useCreateJob,
  useDeleteJob,
  useJobs,
  useUpdateJob,
} from "../hooks/useJobs";
import type { CreateJobArgs, Job, JobType } from "../types";

const JOB_TYPES: JobType[] = ["Government", "Private", "Corporate"];

interface JobFormState {
  title: string;
  company: string;
  location: string;
  salaryRange: string;
  jobType: JobType;
  description: string;
  requirements: string;
  responsibilities: string;
}

const DEFAULT_FORM: JobFormState = {
  title: "",
  company: "",
  location: "",
  salaryRange: "",
  jobType: "Government",
  description: "",
  requirements: "",
  responsibilities: "",
};

function JobFormModal({
  initial,
  onClose,
  onSubmit,
  isLoading,
  mode,
}: {
  initial?: JobFormState;
  onClose: () => void;
  onSubmit: (data: JobFormState) => void;
  isLoading: boolean;
  mode: "create" | "edit";
}) {
  const [form, setForm] = useState<JobFormState>(initial ?? DEFAULT_FORM);
  const set =
    (field: keyof JobFormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      data-ocid="job-form-modal"
    >
      <motion.div
        className="bg-card rounded-xl border border-border shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="text-lg font-display font-bold text-foreground">
            {mode === "create" ? "Post New Job" : "Edit Job"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground p-1 rounded-md hover:bg-muted transition-colors"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>
        <form
          className="p-6 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(form);
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="title">Job Title *</Label>
              <Input
                id="title"
                value={form.title}
                onChange={set("title")}
                required
                placeholder="e.g. Software Engineer"
                data-ocid="form-title"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="company">Company *</Label>
              <Input
                id="company"
                value={form.company}
                onChange={set("company")}
                required
                placeholder="e.g. Infosys"
                data-ocid="form-company"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={form.location}
                onChange={set("location")}
                required
                placeholder="e.g. Mumbai"
                data-ocid="form-location"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="salaryRange">Salary Range *</Label>
              <Input
                id="salaryRange"
                value={form.salaryRange}
                onChange={set("salaryRange")}
                required
                placeholder="e.g. ₹6,00,000 - ₹9,00,000"
                data-ocid="form-salary"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="jobType">Job Type *</Label>
            <Select
              value={form.jobType}
              onValueChange={(v) =>
                setForm((f) => ({ ...f, jobType: v as JobType }))
              }
            >
              <SelectTrigger id="jobType" data-ocid="form-jobtype">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {JOB_TYPES.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={form.description}
              onChange={set("description")}
              required
              rows={4}
              placeholder="Describe the role…"
              data-ocid="form-description"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="requirements">Requirements (one per line)</Label>
            <Textarea
              id="requirements"
              value={form.requirements}
              onChange={set("requirements")}
              rows={3}
              placeholder="B.Tech in CS&#10;3+ years experience"
              data-ocid="form-requirements"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="responsibilities">
              Responsibilities (one per line)
            </Label>
            <Textarea
              id="responsibilities"
              value={form.responsibilities}
              onChange={set("responsibilities")}
              rows={3}
              placeholder="Build scalable APIs&#10;Lead a team"
              data-ocid="form-responsibilities"
            />
          </div>
          <div className="flex gap-3 justify-end pt-2 border-t border-border">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
              disabled={isLoading}
              data-ocid="form-submit-btn"
            >
              {isLoading
                ? "Saving…"
                : mode === "create"
                  ? "Post Job"
                  : "Save Changes"}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export function AdminPage() {
  const { isAdmin, isLoggedIn, login, isLoggingIn, isInitializing } =
    useAdmin();
  const [showForm, setShowForm] = useState(false);
  const [editJob, setEditJob] = useState<Job | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<bigint | null>(null);

  const { data, isFetching } = useJobs({ page: 1, pageSize: 50 });
  const createJob = useCreateJob();
  const updateJob = useUpdateJob();
  const deleteJob = useDeleteJob();

  if (isInitializing) {
    return (
      <Layout>
        <div className="flex items-center justify-center py-24">
          <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
      </Layout>
    );
  }

  if (!isLoggedIn || !isAdmin) {
    return (
      <Layout>
        <div
          className="max-w-md mx-auto text-center py-20 flex flex-col items-center gap-5"
          data-ocid="admin-login-prompt"
        >
          <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
            <LockIcon className="h-7 w-7 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-display font-bold text-foreground">
            Admin Access Required
          </h2>
          <p className="text-muted-foreground text-sm">
            Log in with Internet Identity to access the admin panel and manage
            job postings.
          </p>
          <Button
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8"
            onClick={login}
            disabled={isLoggingIn}
            data-ocid="admin-login-btn"
          >
            {isLoggingIn ? "Logging in…" : "Login with Internet Identity"}
          </Button>
        </div>
      </Layout>
    );
  }

  const handleCreate = (form: JobFormState) => {
    const args: CreateJobArgs = {
      title: form.title,
      company: form.company,
      location: form.location,
      salaryRange: form.salaryRange,
      jobType: form.jobType,
      description: form.description,
      requirements: form.requirements
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      responsibilities: form.responsibilities
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
    };
    createJob.mutate(args, {
      onSuccess: () => {
        toast.success("Job posted successfully!");
        setShowForm(false);
      },
      onError: () => toast.error("Failed to post job. Please try again."),
    });
  };

  const handleUpdate = (form: JobFormState) => {
    if (!editJob) return;
    updateJob.mutate(
      {
        id: editJob.id,
        ...form,
        isActive: editJob.isActive,
        requirements: form.requirements
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
        responsibilities: form.responsibilities
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
      },
      {
        onSuccess: () => {
          toast.success("Job updated successfully!");
          setEditJob(null);
        },
        onError: () => toast.error("Failed to update job. Please try again."),
      },
    );
  };

  const handleDelete = (id: bigint) => {
    deleteJob.mutate(id, {
      onSuccess: () => {
        toast.success("Job deleted.");
        setDeleteConfirm(null);
      },
      onError: () => toast.error("Failed to delete job."),
    });
  };

  const openEditForm = (job: Job) => {
    setEditJob(job);
  };

  return (
    <Layout>
      <div data-ocid="admin-panel">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">
              Admin Panel
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Manage daily job postings
            </p>
          </div>
          <Button
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold self-start sm:self-auto"
            onClick={() => setShowForm(true)}
            data-ocid="post-job-btn"
          >
            <PlusCircleIcon className="h-4 w-4 mr-2" />
            Post New Job
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {(["All", "Government", "Private", "Corporate"] as const).map(
            (type) => {
              const count =
                type === "All"
                  ? (data?.jobs.length ?? 0)
                  : (data?.jobs.filter((j) => j.jobType === type).length ?? 0);
              return (
                <div
                  key={type}
                  className="bg-card border border-border rounded-lg p-4"
                  data-ocid={`stat-${type.toLowerCase()}`}
                >
                  <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">
                    {type}
                  </p>
                  <p className="text-2xl font-display font-bold text-foreground">
                    {isFetching ? "—" : count}
                  </p>
                </div>
              );
            },
          )}
        </div>

        {/* Job Table */}
        <div
          className="bg-card border border-border rounded-xl overflow-hidden"
          data-ocid="jobs-table"
        >
          <div className="px-6 py-4 border-b border-border flex items-center gap-2">
            <BriefcaseIcon className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-sm font-semibold text-foreground">
              All Job Postings
            </h2>
          </div>
          {isFetching ? (
            <div className="p-6 space-y-3">
              {Array.from({ length: 4 }, (_, i) => `skel-${i}`).map((k) => (
                <Skeleton key={k} className="h-14 w-full rounded-md" />
              ))}
            </div>
          ) : (
            <div className="divide-y divide-border">
              {data?.jobs.map((job) => (
                <div
                  key={job.id.toString()}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-muted/40 transition-colors"
                  data-ocid={`admin-job-row-${job.id}`}
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">
                      {job.title}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {job.company} · {job.location}
                    </p>
                  </div>
                  <JobBadge
                    type={job.jobType}
                    className="shrink-0 hidden sm:inline-flex"
                  />
                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground hover:text-foreground"
                      onClick={() => openEditForm(job)}
                      data-ocid={`edit-job-${job.id}`}
                    >
                      <EditIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground hover:text-destructive"
                      onClick={() => setDeleteConfirm(job.id)}
                      data-ocid={`delete-job-${job.id}`}
                    >
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {(!data || data.jobs.length === 0) && (
                <div
                  className="px-6 py-12 text-center text-muted-foreground text-sm"
                  data-ocid="admin-empty-state"
                >
                  No jobs posted yet. Click "Post New Job" to get started.
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Create Form Modal */}
      {showForm && (
        <JobFormModal
          mode="create"
          onClose={() => setShowForm(false)}
          onSubmit={handleCreate}
          isLoading={createJob.isPending}
        />
      )}

      {/* Edit Form Modal */}
      {editJob && (
        <JobFormModal
          mode="edit"
          initial={{
            title: editJob.title,
            company: editJob.company,
            location: editJob.location,
            salaryRange: editJob.salaryRange,
            jobType: editJob.jobType,
            description: editJob.description,
            requirements: editJob.requirements.join("\n"),
            responsibilities: editJob.responsibilities.join("\n"),
          }}
          onClose={() => setEditJob(null)}
          onSubmit={handleUpdate}
          isLoading={updateJob.isPending}
        />
      )}

      {/* Delete Confirm */}
      {deleteConfirm !== null && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          data-ocid="delete-confirm-modal"
        >
          <div className="bg-card rounded-xl border border-border shadow-xl p-6 max-w-sm w-full">
            <h3 className="text-base font-display font-bold text-foreground mb-2">
              Delete Job Posting?
            </h3>
            <p className="text-sm text-muted-foreground mb-5">
              This action cannot be undone. The job will be permanently removed.
            </p>
            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={() => setDeleteConfirm(null)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleDelete(deleteConfirm)}
                disabled={deleteJob.isPending}
                data-ocid="confirm-delete-btn"
              >
                {deleteJob.isPending ? "Deleting…" : "Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
