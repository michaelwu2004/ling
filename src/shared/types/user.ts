import { Database } from "./supabase"

export type TUserInsert = Database['public']['Tables']['users']['Insert'];

export interface IAdditionalUserInfo {
  email: string,
  username: string
}