import { useEffect, useMemo } from "react";
import { Redirect } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

export function Logout() {
  const appCtx = useAppContext();
  const appProps = useMemo(
    () => ({
      isLoading: appCtx.isLoading,
      logoutHandler: appCtx.logoutHandler,
    }),
    [appCtx]
  );
  useEffect(() => {
    appProps.logoutHandler();
  }, [appProps]);

  return appProps.isLoading ? <></> : <Redirect to="/" />;
}
