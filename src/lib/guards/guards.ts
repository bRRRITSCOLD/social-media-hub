export function roles(userRoles: string[], authorizedRoles: string[]) {
  // map over user roles and determine
  // if the user is apart of any
  // authorized/appropriate roles
  const authorized: boolean[] = userRoles
    ? userRoles
      .map((userRole: string) => {
        if (authorizedRoles.includes('*') || authorizedRoles.includes(userRole)) {
          return true;
        }
        return false;
      })
      .filter((result: boolean) => result !== true)
    : [];
  // if not authorized throw applicable error
  if (authorized.length === 0) return false;
  // return explicitly
  return true;
}
