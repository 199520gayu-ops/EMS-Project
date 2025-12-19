import React from "react";

/**
 * RoleGuard renders children only if current user role is included.
 * Usage: <RoleGuard allowed={['HR']} user={user}><Component/></RoleGuard>
 */
export default function RoleGuard({ allowed = [], user, children }) {
  if (!user) return <div className="p-6">Not authorized</div>;
  if (!allowed.includes(user.role)) return <div className="p-6">Access denied</div>;
  return children;
}