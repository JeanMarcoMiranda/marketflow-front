import { supabase } from "@/lib/supabaseClient";
import { User, userSchema } from "../data/userSchema";

export async function fetchUsers(): Promise<User[]> {
  const { data: authUsers, error: authError } =
    await supabase.auth.admin.listUsers();

  if (authError)
    throw new Error(`Error fetching auth users: ${authError.message}`);

  const { data: customUsers, error: customError } = await supabase
    .from("Users")
    .select("id, name, role");

  if (customError)
    throw new Error(`Error fetching custom users: ${customError.message}`);

  const mergedUsers: User[] = authUsers.users.map((authUser) => {
    const customUser = customUsers?.find((cu) => cu.id === authUser.id);
    return userSchema.parse({
      id: authUser.id,
      email: authUser.email || "",
      name: customUser?.name || "Unnamed",
      role: customUser?.role || "customer",
    });
  });

  return mergedUsers;
}

export async function fetchUserById(id: string): Promise<User> {
  const { data, error } = await supabase
    .from("User")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(`Error fetching user: ${error.message}`);

  return userSchema.parse(data);
}
