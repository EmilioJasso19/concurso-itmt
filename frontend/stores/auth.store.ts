import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import axios from '@/lib/axios'

type User = {
  id: number
  name: string
  email: string
  role: 'admin' | 'academica' | 'prefecto'
}

type LoginForm = {
  email: string
  password: string
}

type AuthState = {
  user: User | null
  token: string | null

  form: LoginForm
  loading: boolean
  error: string | null

  setField: (field: keyof LoginForm, value: string) => void
  login: () => Promise<void>
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,

      form: {
        email: '',
        password: '',
      },

      loading: false,
      error: null,

      setField: (field, value) =>
        set((state) => ({
          form: {
            ...state.form,
            [field]: value,
          },
        })),

      login: async () => {
        const { form } = get()

        set({ loading: true, error: null })

        try {
          const res = await axios.post('/auth/login', form)

          const { token, user } = res.data

          set({
            token,
            user,
          })

        } catch (err: any) {
          set({
            error: err.response?.data?.message || 'Error al iniciar sesión',
          })
        } finally {
          set({ loading: false })
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
        })
      },
    }),
    {
      name: 'auth-storage', // localStorage
    }
  )
)