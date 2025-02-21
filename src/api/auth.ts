import { supabase } from "@/lib/supabaseClient"

// Login with Email and Password
export async function login(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

// Logout
export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

// Get current user loged in
export async function getUser() {
  const { data } = await supabase.auth.getUser();
  return data.user;
}