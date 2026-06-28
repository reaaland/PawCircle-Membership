import { supabase } from "../lib/supabase";

export async function signUp(email, password) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  return { data, error };
}

export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return { data, error };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();

  return { error };
}

export async function getCurrentSession() {
  const { data, error } = await supabase.auth.getSession();

  export async function resetPassword(email) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "https://www.pawcirclemembership.com/update-password",
  });

  return { data, error };
}

  return { data, error };
}