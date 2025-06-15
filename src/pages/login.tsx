// pages/login.tsx
import { supabase } from '../lib/supabaseClient'

export default function Login() {
  const signIn = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'github' }) // or email
  }

  return <button onClick={signIn}>Sign In</button>
}