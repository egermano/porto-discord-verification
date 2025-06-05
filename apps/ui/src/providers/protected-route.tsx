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
  } = useSession();

  if (isPending) {
    return <Spinner size="large" />;
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
