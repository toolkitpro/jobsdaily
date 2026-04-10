import { useActor, useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useCallback, useEffect, useRef, useState } from "react";
import { createActor } from "../backend";

// Persisted across sessions in localStorage so that on hard refresh the admin
// state is immediately available — preventing the race-condition redirect where
// isAdmin starts as false before InternetIdentityProvider finishes restoring the
// session from IndexedDB.
const ADMIN_LS_KEY = "jobsdaily_admin_session";

export function useAdmin() {
  const { identity, login, clear, loginStatus, isLoggingIn, isInitializing } =
    useInternetIdentity();
  const { actor } = useActor(createActor);

  // Read localStorage synchronously on mount so the flag is available before
  // any async work completes — prevents premature redirect on refresh.
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem(ADMIN_LS_KEY) === "true";
  });

  const isLoggedIn = !!identity;

  // Track previous identity to avoid redundant actor.isAdmin() calls.
  const prevIdentityRef = useRef<typeof identity>(null);

  useEffect(() => {
    // Still initializing — don't change state yet.
    if (isInitializing) return;

    if (!identity) {
      // Logged out: clear both stores.
      setIsAdmin(false);
      localStorage.removeItem(ADMIN_LS_KEY);
      prevIdentityRef.current = null;
      return;
    }

    // Identity hasn't changed since last check — skip.
    if (prevIdentityRef.current === identity) return;
    prevIdentityRef.current = identity;

    if (actor) {
      // Verify against backend — any authenticated user is admin in this app.
      actor
        .isAdmin()
        .then((result) => {
          setIsAdmin(result);
          if (result) {
            localStorage.setItem(ADMIN_LS_KEY, "true");
          } else {
            localStorage.removeItem(ADMIN_LS_KEY);
          }
        })
        .catch(() => {
          // Fallback: treat authenticated user as admin (demo mode).
          setIsAdmin(true);
          localStorage.setItem(ADMIN_LS_KEY, "true");
        });
    } else {
      // Actor not yet available — optimistically mark admin if identity exists.
      setIsAdmin(true);
      localStorage.setItem(ADMIN_LS_KEY, "true");
    }
  }, [identity, isInitializing, actor]);

  const logout = useCallback(() => {
    clear();
    setIsAdmin(false);
    localStorage.removeItem(ADMIN_LS_KEY);
    prevIdentityRef.current = null;
  }, [clear]);

  return {
    isAdmin,
    isLoggedIn,
    identity,
    login,
    logout,
    loginStatus,
    isLoggingIn,
    isInitializing,
  };
}
