import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";

module {
  public func isAdmin(adminPrincipal : ?Principal, caller : Principal) : Bool {
    switch (adminPrincipal) {
      case (?admin) { Principal.equal(admin, caller) };
      case null { false };
    };
  };

  public func requireAdmin(adminPrincipal : ?Principal, caller : Principal) {
    if (not isAdmin(adminPrincipal, caller)) {
      Runtime.trap("Unauthorized: caller is not admin");
    };
  };
};
