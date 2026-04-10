import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { JobType as BackendJobType, createActor } from "../backend";
import type {
  CreateJobArgs,
  Job,
  JobFilters,
  JobsPage,
  UpdateJobArgs,
} from "../types";

// Map frontend string-union JobType to backend enum JobType
function toBackendJobType(t: string): BackendJobType {
  if (t === "Private") return BackendJobType.Private;
  if (t === "Corporate") return BackendJobType.Corporate;
  return BackendJobType.Government;
}

// ---------------------------------------------------------------------------
// useJobs — fetches paginated, filtered jobs from the real backend canister.
// ---------------------------------------------------------------------------
export function useJobs(filters: JobFilters) {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<JobsPage>({
    queryKey: ["jobs", filters],
    queryFn: async () => {
      if (!actor) {
        return {
          jobs: [],
          total: BigInt(0),
          page: BigInt(filters.page),
          pageSize: BigInt(filters.pageSize),
        };
      }
      return actor.getJobs({
        jobType: filters.jobType
          ? toBackendJobType(filters.jobType)
          : undefined,
        location: filters.location,
        searchQuery: filters.searchQuery,
        page: BigInt(filters.page),
        pageSize: BigInt(filters.pageSize),
      });
    },
    enabled: !!actor && !actorFetching,
    placeholderData: (prev) => prev,
  });
}

// ---------------------------------------------------------------------------
// useJob — fetches a single job by id from the real backend canister.
// ---------------------------------------------------------------------------
export function useJob(id: bigint | null) {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<Job | null>({
    queryKey: ["job", id?.toString()],
    queryFn: async () => {
      if (!actor || id === null) return null;
      return actor.getJobById(id);
    },
    enabled: id !== null && !!actor && !actorFetching,
  });
}

// ---------------------------------------------------------------------------
// useCreateJob — creates a new job via the real backend canister.
// ---------------------------------------------------------------------------
export function useCreateJob() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);

  return useMutation<Job, Error, CreateJobArgs>({
    mutationFn: async (args) => {
      if (!actor) throw new Error("Backend actor not available");
      return actor.createJob({
        title: args.title,
        company: args.company,
        location: args.location,
        salaryRange: args.salaryRange,
        jobType: toBackendJobType(args.jobType),
        description: args.description,
        requirements: args.requirements,
        responsibilities: args.responsibilities,
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["jobs"] });
    },
  });
}

// ---------------------------------------------------------------------------
// useUpdateJob — updates an existing job via the real backend canister.
// ---------------------------------------------------------------------------
export function useUpdateJob() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);

  return useMutation<boolean, Error, UpdateJobArgs>({
    mutationFn: async (args) => {
      if (!actor) throw new Error("Backend actor not available");
      return actor.updateJob({
        id: args.id,
        title: args.title ?? "",
        company: args.company ?? "",
        location: args.location ?? "",
        salaryRange: args.salaryRange ?? "",
        jobType: toBackendJobType(args.jobType ?? "Government"),
        description: args.description ?? "",
        requirements: args.requirements ?? [],
        responsibilities: args.responsibilities ?? [],
        isActive: args.isActive ?? true,
      });
    },
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["jobs"] });
      qc.invalidateQueries({ queryKey: ["job", vars.id.toString()] });
    },
  });
}

// ---------------------------------------------------------------------------
// useDeleteJob — deletes a job via the real backend canister.
// ---------------------------------------------------------------------------
export function useDeleteJob() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);

  return useMutation<boolean, Error, bigint>({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Backend actor not available");
      return actor.deleteJob(id);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["jobs"] });
    },
  });
}
