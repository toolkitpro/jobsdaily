import Common "common";

module {
  public type JobId = Common.JobId;
  public type Timestamp = Common.Timestamp;

  public type JobType = {
    #Government;
    #Private;
    #Corporate;
  };

  public type Job = {
    id : JobId;
    title : Text;
    company : Text;
    location : Text;
    salaryRange : Text;
    jobType : JobType;
    description : Text;
    requirements : [Text];
    responsibilities : [Text];
    postedDate : Timestamp;
    isActive : Bool;
  };

  public type CreateJobArgs = {
    title : Text;
    company : Text;
    location : Text;
    salaryRange : Text;
    jobType : JobType;
    description : Text;
    requirements : [Text];
    responsibilities : [Text];
  };

  public type UpdateJobArgs = {
    id : JobId;
    title : Text;
    company : Text;
    location : Text;
    salaryRange : Text;
    jobType : JobType;
    description : Text;
    requirements : [Text];
    responsibilities : [Text];
    isActive : Bool;
  };

  public type JobFilters = {
    jobType : ?JobType;
    location : ?Text;
    searchQuery : ?Text;
    page : Nat;
    pageSize : Nat;
  };

  public type JobsPage = {
    jobs : [Job];
    total : Nat;
    page : Nat;
    pageSize : Nat;
  };
};
