<template>
  <div class="max-w-sm shadow rounded-xl mx-auto">
    <h2 class="px-10 pt-6 text-center">Sign in to your account</h2>
    <div class="p-10 space-y-5">
      <input type="text" class="inputField border px-5 py-2 rounded-xl w-full" placeholder="Email" v-model="email">
      <input type="text" class="inputField border px-5 py-2 rounded-xl w-full" placeholder="Password" v-model="password">
      <button @click="signInWithEmail" class="w-full bg-zinc-900 text-white px-6 py-2.5 rounded-xl">{{ loginloading ? 'Loading...' : 'Login' }}</button>
      <button class="text-sm text-center w-full hover:underline" @click="resetPassword">Forgot Password</button>
    </div>

    <hr/>

    <div>
      <button 
        @click.prevent="handleLogin"
        class="w-full py-4 text-sm hover:bg-zinc-100"
      >{{ loading ? 'Loading...' : 'Send magic link' }}</button>
    </div>
    
  </div>
</template>

<script setup>
  const supabase = useSupabaseClient()
  const loading = ref(false)
  const loginloading = ref(false)
  const user = useSupabaseUser()

  const email = ref('franchisedestiny@gmail.com')
  const password = ref('password')

  const handleLogin = async () => {
    try {
      loading.value = true
      const { error } = await supabase.auth.signInWithOtp({ email: email.value })
      if (error) throw error
      alert('Check your email for the login link!')
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      loading.value = false
    }
  }

  async function signInWithEmail() {
    try {
      loginloading.value = true
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value,
      }) 
      console.log(data)
      console.log(error)
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      loginloading.value = false
      return navigateTo('/admin/dashboard');
    }
  }

  const resetPassword = async () => {
    await supabase.auth.resetPasswordForEmail(email.value, {
      redirectTo: 'http://localhost:3000/auth/update-password',
    })
  }

  watch(user, () => {
    if (user.value) {
      return navigateTo('/')
    }
  }, { immediate: true })

  
</script>



<style>

</style>
