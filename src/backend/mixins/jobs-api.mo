import List "mo:core/List";
import Time "mo:core/Time";
import Types "../types/jobs";
import JobsLib "../lib/jobs";
import AdminLib "../lib/admin";

mixin (
  jobs : List.List<Types.Job>,
  nextJobId : { var val : Nat },
  adminPrincipal : { var val : ?Principal },
) {
  public shared ({ caller }) func createJob(args : Types.CreateJobArgs) : async Types.Job {
    AdminLib.requireAdmin(adminPrincipal.val, caller);
    let id = nextJobId.val;
    nextJobId.val += 1;
    JobsLib.createJob(jobs, id, args, Time.now());
  };

  public shared ({ caller }) func updateJob(args : Types.UpdateJobArgs) : async Bool {
    AdminLib.requireAdmin(adminPrincipal.val, caller);
    JobsLib.updateJob(jobs, args);
  };

  public shared ({ caller }) func deleteJob(id : Types.JobId) : async Bool {
    AdminLib.requireAdmin(adminPrincipal.val, caller);
    JobsLib.deleteJob(jobs, id);
  };

  public query func getJobById(id : Types.JobId) : async ?Types.Job {
    JobsLib.getJobById(jobs, id);
  };

  public query func getJobs(filters : Types.JobFilters) : async Types.JobsPage {
    JobsLib.getJobs(jobs, filters);
  };
};
