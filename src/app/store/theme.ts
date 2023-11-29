import { create } from 'zustand'

type Mode = 'light' | 'dark'

interface State {
  mode: Mode
  setMode: (val: Mode) => void
}

export const useThemeStore = create<State>(set => ({
  mode: (localStorage.getItem('mode') as Mode) ?? 'light',
  setMode(val) {
    set({
      mode: val,
    })
    localStorage.setItem('mode', val)
  },
}))
