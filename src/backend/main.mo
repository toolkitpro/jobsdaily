import List "mo:core/List";
import Types "types/jobs";
import JobsLib "lib/jobs";
import JobsApi "mixins/jobs-api";
import AdminApi "mixins/admin-api";

actor {
  let jobs = List.empty<Types.Job>();
  let nextJobId : Nat = 1;

  let nextJobIdRef = { var val = nextJobId };
  let adminPrincipalRef = { var val : ?Principal = null };

  // Pre-populate sample jobs for demo
  do {
    let sampleJobs : [Types.CreateJobArgs] = [
      {
        title = "Software Engineer";
        company = "Tech Solutions Pvt Ltd";
        location = "Bangalore";
        salaryRange = "₹8L - ₹15L per annum";
        jobType = #Private;
        description = "We are looking for a skilled Software Engineer to join our growing team. You will design, develop, and maintain high-quality software solutions.";
        requirements = ["B.Tech/B.E. in Computer Science", "2+ years of experience", "Proficiency in JavaScript/TypeScript", "Knowledge of React and Node.js"];
        responsibilities = ["Develop and maintain web applications", "Collaborate with cross-functional teams", "Write clean, maintainable code", "Participate in code reviews"];
      },
      {
        title = "Civil Services Officer (IAS)";
        company = "Union Public Service Commission";
        location = "New Delhi";
        salaryRange = "₹56,100 - ₹2,50,000 per month";
        jobType = #Government;
        description = "Join the prestigious Indian Administrative Service. UPSC invites applications from eligible candidates for Civil Services Examination.";
        requirements = ["Indian citizen", "Age 21-32 years", "Bachelor's degree from recognized university", "UPSC Civil Services Examination clearance"];
        responsibilities = ["Implement government policies", "Manage district administration", "Public grievance redressal", "Development project oversight"];
      },
      {
        title = "Bank Probationary Officer";
        company = "State Bank of India";
        location = "Mumbai";
        salaryRange = "₹41,960 - ₹63,840 per month";
        jobType = #Government;
        description = "SBI invites applications for the post of Probationary Officers. Selected candidates will be posted at various branches across India.";
        requirements = ["Graduate in any discipline", "Age 21-30 years", "IBPS PO exam cleared", "Basic computer knowledge"];
        responsibilities = ["Customer service and account management", "Loan processing and appraisal", "Cash handling and transactions", "Branch operations management"];
      },
      {
        title = "Marketing Manager";
        company = "Reliance Industries Limited";
        location = "Mumbai";
        salaryRange = "₹12L - ₹22L per annum";
        jobType = #Corporate;
        description = "Reliance is seeking an experienced Marketing Manager to lead brand campaigns and drive business growth across our product lines.";
        requirements = ["MBA in Marketing", "5+ years of marketing experience", "Proven track record in campaign management", "Strong analytical skills"];
        responsibilities = ["Develop and execute marketing strategies", "Manage brand identity and communication", "Lead digital marketing initiatives", "Monitor and report on campaign performance"];
      },
      {
        title = "Data Analyst";
        company = "Infosys BPM";
        location = "Hyderabad";
        salaryRange = "₹5L - ₹10L per annum";
        jobType = #Corporate;
        description = "Infosys BPM is looking for Data Analysts to support business intelligence and reporting functions for global clients.";
        requirements = ["Bachelor's degree in Statistics/Math/Computer Science", "1-3 years experience", "Proficiency in SQL and Excel", "Knowledge of Power BI or Tableau"];
        responsibilities = ["Analyze large datasets to extract insights", "Create dashboards and reports", "Collaborate with business teams", "Ensure data accuracy and integrity"];
      },
      {
        title = "Railway Station Master";
        company = "Indian Railways (RRB)";
        location = "Chennai";
        salaryRange = "₹35,400 - ₹1,12,400 per month";
        jobType = #Government;
        description = "Railway Recruitment Board invites applications for Station Master posts. Join the backbone of India's transport system.";
        requirements = ["Graduate in any discipline", "Age 18-36 years", "RRB NTPC exam clearance", "Good communication skills"];
        responsibilities = ["Manage station operations and train movements", "Ensure passenger safety", "Coordinate with control room", "Supervise station staff"];
      },
      {
        title = "HR Executive";
        company = "Tata Consultancy Services";
        location = "Pune";
        salaryRange = "₹4L - ₹8L per annum";
        jobType = #Corporate;
        description = "TCS is hiring HR Executives to support talent acquisition, employee engagement, and HR operations across business units.";
        requirements = ["MBA/PGDM in HR", "0-2 years experience", "Strong interpersonal skills", "Familiarity with HR software"];
        responsibilities = ["Assist in recruitment and onboarding", "Handle employee queries and grievances", "Support performance management process", "Maintain HR records and compliance"];
      },
      {
        title = "Sales Executive";
        company = "Flipkart Pvt Ltd";
        location = "Gurgaon";
        salaryRange = "₹3.5L - ₹6L per annum";
        jobType = #Private;
        description = "Flipkart is expanding its seller ecosystem and needs Sales Executives to onboard new sellers and grow GMV in their territory.";
        requirements = ["Graduate in any field", "0-3 years sales experience", "Strong negotiation skills", "Willingness to travel"];
        responsibilities = ["Identify and onboard new sellers", "Achieve monthly sales targets", "Build and maintain seller relationships", "Provide product training to sellers"];
      },
    ];

    for (args in sampleJobs.vals()) {
      let id = nextJobIdRef.val;
      nextJobIdRef.val += 1;
      let _ = JobsLib.createJob(jobs, id, args, 1_744_243_200_000_000_000);
    };
  };

  include AdminApi(adminPrincipalRef);
  include JobsApi(jobs, nextJobIdRef, adminPrincipalRef);
};
