import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface JobsPage {
    total: bigint;
    jobs: Array<Job>;
    page: bigint;
    pageSize: bigint;
}
export type Timestamp = bigint;
export interface Job {
    id: JobId;
    title: string;
    responsibilities: Array<string>;
    jobType: JobType;
    postedDate: Timestamp;
    description: string;
    isActive: boolean;
    company: string;
    salaryRange: string;
    requirements: Array<string>;
    location: string;
}
export interface CreateJobArgs {
    title: string;
    responsibilities: Array<string>;
    jobType: JobType;
    description: string;
    company: string;
    salaryRange: string;
    requirements: Array<string>;
    location: string;
}
export type JobId = bigint;
export interface UpdateJobArgs {
    id: JobId;
    title: string;
    responsibilities: Array<string>;
    jobType: JobType;
    description: string;
    isActive: boolean;
    company: string;
    salaryRange: string;
    requirements: Array<string>;
    location: string;
}
export interface JobFilters {
    jobType?: JobType;
    page: bigint;
    pageSize: bigint;
    searchQuery?: string;
    location?: string;
}
export enum JobType {
    Private = "Private",
    Corporate = "Corporate",
    Government = "Government"
}
export interface backendInterface {
    createJob(args: CreateJobArgs): Promise<Job>;
    deleteJob(id: JobId): Promise<boolean>;
    getAdminPrincipal(): Promise<Principal | null>;
    getJobById(id: JobId): Promise<Job | null>;
    getJobs(filters: JobFilters): Promise<JobsPage>;
    isAdmin(): Promise<boolean>;
    setAdmin(newAdmin: Principal): Promise<void>;
    updateJob(args: UpdateJobArgs): Promise<boolean>;
}
