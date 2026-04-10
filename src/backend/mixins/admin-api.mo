import AdminLib "../lib/admin";
import Principal "mo:core/Principal";

mixin (adminPrincipal : { var val : ?Principal }) {
  public shared ({ caller }) func setAdmin(newAdmin : Principal) : async () {
    // First caller bootstraps; thereafter only existing admin can change it
    switch (adminPrincipal.val) {
      case null {
        // First call — bootstrap
        adminPrincipal.val := ?newAdmin;
      };
      case (?_) {
        AdminLib.requireAdmin(adminPrincipal.val, caller);
        adminPrincipal.val := ?newAdmin;
      };
    };
  };

  public query func getAdminPrincipal() : async ?Principal {
    adminPrincipal.val;
  };

  public query ({ caller }) func isAdmin() : async Bool {
    AdminLib.isAdmin(adminPrincipal.val, caller);
  };
};
