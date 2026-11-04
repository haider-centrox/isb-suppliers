import "server-only";

// No login for the POC. To turn on a password later, set ADMIN_PASSWORD in
// Netlify (Project configuration > Environment variables) and redeploy.
export function adminProtected() {
  return Boolean(process.env.ADMIN_PASSWORD);
}

export function isAdmin(req) {
  if (!adminProtected()) return true;
  return req.headers.get("x-admin-key") === process.env.ADMIN_PASSWORD;
}

export function unauthorized() {
  return Response.json({ error: "Password required" }, { status: 401 });
}
