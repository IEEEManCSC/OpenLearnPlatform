// store/useAuthStore.ts
import { create } from "zustand";

interface GlobalState {
  username: string;
  email: string;
  password: string;
  discordUsername: string;
  trackId: string;
  terms: boolean;

  // actions
  setField: <K extends keyof GlobalState>(
    key: K,
    value: GlobalState[K],
  ) => void;
  reset: () => void;
}

const initialState = {
  username: "",
  email: "",
  password: "",
  discordUsername: "",
  trackId: "",
  terms: false,
};

export const useAuthStore = create<GlobalState>((set) => ({
  ...initialState,

  setField: (key, value) =>
    set((state) => ({
      ...state,
      [key]: value,
    })),

  reset: () => set(initialState),
}));
