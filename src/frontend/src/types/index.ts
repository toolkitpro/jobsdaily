export type JobType = "Government" | "Private" | "Corporate";

export interface Job {
  id: bigint;
  title: string;
  company: string;
  location: string;
  salaryRange: string;
  jobType: JobType;
  description: string;
  requirements: string[];
  responsibilities: string[];
  postedDate: bigint;
  isActive: boolean;
}

export interface JobFilters {
  jobType?: JobType;
  location?: string;
  searchQuery?: string;
  page: number;
  pageSize: number;
}

export interface JobsPage {
  jobs: Job[];
  total: bigint;
  page: bigint;
  pageSize: bigint;
}

export interface CreateJobArgs {
  title: string;
  company: string;
  location: string;
  salaryRange: string;
  jobType: JobType;
  description: string;
  requirements: string[];
  responsibilities: string[];
}

export interface UpdateJobArgs {
  id: bigint;
  title?: string;
  company?: string;
  location?: string;
  salaryRange?: string;
  jobType?: JobType;
  description?: string;
  requirements?: string[];
  responsibilities?: string[];
  isActive?: boolean;
}
