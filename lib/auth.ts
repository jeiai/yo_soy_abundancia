export type DemoUser = {
  id: string;
  name: string;
  email: string;
  role: "member" | "admin";
};

export const demoUser: DemoUser = {
  id: "demo-user-1",
  name: "Miembro Demo",
  email: "demo@yosoyabundancia.com",
  role: "admin"
};

export async function getCurrentUser() {
  // Punto de integración para NextAuth, Clerk o Supabase Auth.
  return demoUser;
}
