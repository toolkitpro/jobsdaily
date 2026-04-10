import List "mo:core/List";
import Types "../types/jobs";

module {
  public type Job = Types.Job;
  public type JobId = Types.JobId;
  public type JobFilters = Types.JobFilters;
  public type JobsPage = Types.JobsPage;
  public type CreateJobArgs = Types.CreateJobArgs;
  public type UpdateJobArgs = Types.UpdateJobArgs;

  public func createJob(
    jobs : List.List<Job>,
    nextId : Nat,
    args : CreateJobArgs,
    now : Int,
  ) : Job {
    let job : Job = {
      id = nextId;
      title = args.title;
      company = args.company;
      location = args.location;
      salaryRange = args.salaryRange;
      jobType = args.jobType;
      description = args.description;
      requirements = args.requirements;
      responsibilities = args.responsibilities;
      postedDate = now;
      isActive = true;
    };
    jobs.add(job);
    job;
  };

  public func updateJob(jobs : List.List<Job>, args : UpdateJobArgs) : Bool {
    var found = false;
    jobs.mapInPlace(
      func(job) {
        if (job.id == args.id) {
          found := true;
          {
            job with
            title = args.title;
            company = args.company;
            location = args.location;
            salaryRange = args.salaryRange;
            jobType = args.jobType;
            description = args.description;
            requirements = args.requirements;
            responsibilities = args.responsibilities;
            isActive = args.isActive;
          };
        } else {
          job;
        };
      }
    );
    found;
  };

  public func deleteJob(jobs : List.List<Job>, id : JobId) : Bool {
    let sizeBefore = jobs.size();
    let filtered = jobs.filter(func(job) { job.id != id });
    jobs.clear();
    jobs.append(filtered);
    jobs.size() < sizeBefore;
  };

  public func getJobById(jobs : List.List<Job>, id : JobId) : ?Job {
    jobs.find(func(job) { job.id == id });
  };

  public func getJobs(jobs : List.List<Job>, filters : JobFilters) : JobsPage {
    // Apply filters
    let filtered = jobs.filter(func(job) {
      let matchesJobType = switch (filters.jobType) {
        case (?jt) { job.jobType == jt };
        case null { true };
      };
      let matchesLocation = switch (filters.location) {
        case (?loc) {
          let jobLoc = job.location.toLower();
          let filterLoc = loc.toLower();
          jobLoc.contains(#text filterLoc);
        };
        case null { true };
      };
      let matchesSearch = switch (filters.searchQuery) {
        case (?q) {
          let searchTerm = q.toLower();
          let titleLower = job.title.toLower();
          let companyLower = job.company.toLower();
          titleLower.contains(#text searchTerm) or companyLower.contains(#text searchTerm);
        };
        case null { true };
      };
      matchesJobType and matchesLocation and matchesSearch and job.isActive;
    });

    let total = filtered.size();
    let pageSize = if (filters.pageSize == 0) { 10 } else { filters.pageSize };
    let page = filters.page;
    let start = page * pageSize;

    let pageJobs = if (start >= total) {
      [];
    } else {
      let end = if (start + pageSize > total) { total } else { start + pageSize };
      filtered.sliceToArray(start.toInt(), end.toInt());
    };

    {
      jobs = pageJobs;
      total = total;
      page = page;
      pageSize = pageSize;
    };
  };
};
