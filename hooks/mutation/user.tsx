import { supabase } from "@/lib/supabase"
import { useMutation } from "@tanstack/react-query"

export const useSignInMutation = () => {
  const { mutate } = useMutation({
    mutationFn: async (form: any) => {
      return await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      })
    },
    onSuccess: (data) => {
      console.log("data: ", data)
    },
    onError: (error) => {
      console.log("error: ", error)
    },
  })
  return {
    mutate,
  }
}

export const useSignUpMutation = () => {
  const { mutate } = useMutation({
    mutationFn: async (form: any) => {
      console.log("form: ", form)
      return await supabase.auth.signUp({
        email: form.email,
        password: form.password,
      })
    },

    onSuccess: async (data) => {
      console.log("data: ", data)
    },
    onError: (error) => {
      console.log("error: ", error)
    },
  })
  return {
    mutate,
  }
}
