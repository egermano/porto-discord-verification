"use client";
import { Spinner } from "@/components/ui/spinner";
import { useSession } from "@/lib/auth";
import { useRouter } from "next/navigation";
import React, { PropsWithChildren } from "react";

interface ProtectedRouteProps {
  redirectTo?: string;
}

const ProtectedRoute: React.FC<PropsWithChildren<ProtectedRouteProps>> = ({
  children,
  redirectTo,
}) => {
  const router = useRouter();
  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch, //refetch the session
  } = useSession();

  if (isPending) {
    // TODO: add loading state
    // You can show a loading spinner or a message here
    return (
      <Spinner size="lg" className="bg-red dark:bg-green" loading={true}>
        Loading...
      </Spinner>
    );
  }

  if (error) {
    router.push(redirectTo || "/");
  }
  const isAuthenticated = !!session?.session;

  return isAuthenticated ? (
    <>{children}</>
  ) : (
    (router.push(redirectTo || "/"), null)
  );
};

export default ProtectedRoute;
