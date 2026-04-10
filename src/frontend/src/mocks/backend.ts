import type { backendInterface, Job, JobsPage, JobType } from "../backend";
import type { Principal } from "@icp-sdk/core/principal";

const sampleJobs: Job[] = [
  {
    id: BigInt(1),
    title: "Software Engineer",
    company: "Tech Solutions Pvt Ltd",
    location: "Bangalore",
    salaryRange: "₹8L - ₹15L per annum",
    jobType: "Private" as unknown as JobType,
    description:
      "We are looking for a skilled Software Engineer to join our growing team. You will design, develop, and maintain high-quality software solutions.",
    requirements: [
      "B.Tech/B.E. in Computer Science",
      "2+ years of experience",
      "Proficiency in JavaScript/TypeScript",
      "Knowledge of React and Node.js",
    ],
    responsibilities: [
      "Develop and maintain web applications",
      "Collaborate with cross-functional teams",
      "Write clean, maintainable code",
      "Participate in code reviews",
    ],
    postedDate: BigInt(1744243200000000000),
    isActive: true,
  },
  {
    id: BigInt(2),
    title: "Civil Services Officer (IAS)",
    company: "Union Public Service Commission",
    location: "New Delhi",
    salaryRange: "₹56,100 - ₹2,50,000 per month",
    jobType: "Government" as unknown as JobType,
    description:
      "Join the prestigious Indian Administrative Service. UPSC invites applications from eligible candidates for Civil Services Examination.",
    requirements: [
      "Indian citizen",
      "Age 21-32 years",
      "Bachelor's degree from recognized university",
      "UPSC Civil Services Examination clearance",
    ],
    responsibilities: [
      "Implement government policies",
      "Manage district administration",
      "Public grievance redressal",
      "Development project oversight",
    ],
    postedDate: BigInt(1744243200000000000),
    isActive: true,
  },
  {
    id: BigInt(3),
    title: "Bank Probationary Officer",
    company: "State Bank of India",
    location: "Mumbai",
    salaryRange: "₹41,960 - ₹63,840 per month",
    jobType: "Government" as unknown as JobType,
    description:
      "SBI invites applications for the post of Probationary Officers. Selected candidates will be posted at various branches across India.",
    requirements: [
      "Graduate in any discipline",
      "Age 21-30 years",
      "IBPS PO exam cleared",
      "Basic computer knowledge",
    ],
    responsibilities: [
      "Customer service and account management",
      "Loan processing and appraisal",
      "Cash handling and transactions",
      "Branch operations management",
    ],
    postedDate: BigInt(1744243200000000000),
    isActive: true,
  },
  {
    id: BigInt(4),
    title: "Marketing Manager",
    company: "Reliance Industries Limited",
    location: "Mumbai",
    salaryRange: "₹12L - ₹22L per annum",
    jobType: "Corporate" as unknown as JobType,
    description:
      "Reliance is seeking an experienced Marketing Manager to lead brand campaigns and drive business growth across our product lines.",
    requirements: [
      "MBA in Marketing",
      "5+ years of marketing experience",
      "Proven track record in campaign management",
      "Strong analytical skills",
    ],
    responsibilities: [
      "Develop and execute marketing strategies",
      "Manage brand identity and communication",
      "Lead digital marketing initiatives",
      "Monitor and report on campaign performance",
    ],
    postedDate: BigInt(1744243200000000000),
    isActive: true,
  },
  {
    id: BigInt(5),
    title: "Data Analyst",
    company: "Infosys BPM",
    location: "Hyderabad",
    salaryRange: "₹5L - ₹10L per annum",
    jobType: "Corporate" as unknown as JobType,
    description:
      "Infosys BPM is looking for Data Analysts to support business intelligence and reporting functions for global clients.",
    requirements: [
      "Bachelor's degree in Statistics/Math/Computer Science",
      "1-3 years experience",
      "Proficiency in SQL and Excel",
      "Knowledge of Power BI or Tableau",
    ],
    responsibilities: [
      "Analyze large datasets to extract insights",
      "Create dashboards and reports",
      "Collaborate with business teams",
      "Ensure data accuracy and integrity",
    ],
    postedDate: BigInt(1744243200000000000),
    isActive: true,
  },
  {
    id: BigInt(6),
    title: "Sales Executive",
    company: "Flipkart Pvt Ltd",
    location: "Gurgaon",
    salaryRange: "₹3.5L - ₹6L per annum",
    jobType: "Private" as unknown as JobType,
    description:
      "Flipkart is expanding its seller ecosystem and needs Sales Executives to onboard new sellers and grow GMV in their territory.",
    requirements: [
      "Graduate in any field",
      "0-3 years sales experience",
      "Strong negotiation skills",
      "Willingness to travel",
    ],
    responsibilities: [
      "Identify and onboard new sellers",
      "Achieve monthly sales targets",
      "Build and maintain seller relationships",
      "Provide product training to sellers",
    ],
    postedDate: BigInt(1744243200000000000),
    isActive: true,
  },
];

export const mockBackend: backendInterface = {
  createJob: async (args) => ({
    id: BigInt(99),
    ...args,
    postedDate: BigInt(Date.now()) * BigInt(1_000_000),
    isActive: true,
  }),
  deleteJob: async () => true,
  getAdminPrincipal: async () => null,
  getJobById: async (id) => sampleJobs.find((j) => j.id === id) ?? null,
  getJobs: async (filters): Promise<JobsPage> => {
    let filtered = sampleJobs.filter((j) => j.isActive);
    if (filters.jobType) {
      filtered = filtered.filter((j) => j.jobType === filters.jobType);
    }
    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.company.toLowerCase().includes(q) ||
          j.location.toLowerCase().includes(q)
      );
    }
    if (filters.location) {
      const loc = filters.location.toLowerCase();
      filtered = filtered.filter((j) =>
        j.location.toLowerCase().includes(loc)
      );
    }
    const page = Number(filters.page);
    const pageSize = Number(filters.pageSize);
    const start = (page - 1) * pageSize;
    const paginated = filtered.slice(start, start + pageSize);
    return {
      jobs: paginated,
      total: BigInt(filtered.length),
      page: filters.page,
      pageSize: filters.pageSize,
    };
  },
  isAdmin: async () => true,
  setAdmin: async () => undefined,
  updateJob: async () => true,
};
