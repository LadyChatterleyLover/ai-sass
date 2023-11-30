import { create } from 'zustand'

type Mode = 'light' | 'dark'

interface State {
  mode: Mode
  setMode: (val: Mode) => void
}

export const useThemeStore = create<State>(set => ({
  mode: 'light',
  setMode: val => {
    set({ mode: val })
  },
}))
