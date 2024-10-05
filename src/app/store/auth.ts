import { supabase } from "@/shared/api/supabase/supabase";
import { Session, User } from "@supabase/supabase-js";
import { defineStore } from "pinia";

interface IAuthState {
  session: Session | undefined | null,
  user: User | undefined | null
}

export const useAuthStore = defineStore('auth', {
  state: (): IAuthState => {
    return { session: null, user: undefined }
  },
  actions: {
    setUser(user: User | undefined | null = undefined) {
      this.user = user;
    },
    setSession(session: Session | undefined | null = null) {
      this.session = session;
    },
    async checkAuth() {
      try {
        const { data, error } = await supabase.auth.getSession();

        if (error) throw error;
        if (!data.session) return;

        this.session = data.session;
        this.user = data.session.user;
      } catch (e) {}
    },
    clearUser() {
      this.user = undefined;
      this.session = null;
    },
  },
  getters: {
    getUser(state) {
      return state.user;
    },
    getSession(state) {
      return state.session;
    },
    isLoggedIn(state) {
      return !!state.user
    }
  }
});