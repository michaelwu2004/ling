import { TUserInsert } from "@/shared/types/user";
import { User } from "@supabase/supabase-js";
import { supabase } from "../supabase";

export const createUserWithEmail = async (username: string, email: string, user: User | null) => {
  if (!user) throw new Error("No user was provided.");

  const info: TUserInsert = {
    id: user.id,
    email,
    username
  }

  const { error } = await supabase
    .from('users')
    .insert(info);

  if (error) throw error;
}