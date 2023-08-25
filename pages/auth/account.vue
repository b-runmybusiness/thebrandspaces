<script setup>
    definePageMeta({
        layout: 'admin',
        middleware: 'auth',
    })

    const supabase = useSupabaseClient()
    const user = useSupabaseUser()

    const loading = ref(true)
    const username = ref('')
    const website = ref('')
    const avatar_path = ref('')
    
    const form = {
      name : '',
      email : '',
      contact : '',
      bio: '',
      company_name: '',
      company_address: '',
    }

    let { data } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', user.value.id)
        .single()
        if (data) {
            username.value = data.username
            website.value = data.website
            avatar_path.value = data.avatar_url
        }

    loading.value = false

    async function updateProfile() {
        try {
            loading.value = true
            const user = useSupabaseUser()

            const updates = { 
                id: user.value.id,
                username: username.value,
                website: website.value,
                avatar_url: avatar_path.value,
                updated_at: new Date(),
            }

            let { error } = await supabase.from('profiles').upsert(updates, {
                returning: 'minimal', // Don't return the value after inserting
            })
            if (error) throw error
        } catch (error) {
            alert(error.message)
        } finally {
            loading.value = false
        }
    }

</script>

<template>
    <div class="p-12">
        <form class="form-widget" @submit.prevent="updateProfile">
            <div class="w-full flex flex-col md:flex-row gap-6 mb-6">
                <div class="md:w-[35%] w-full md:p-5 p-3 bg-white shadow rounded-3xl flex flex-col justify-center items-center">
                    <div class="border-2 border-dashed rounded-3xl p-1.5">
                        <Avatar v-model:path="avatar_path" @upload="updateProfile" />
                    </div>
                    <span class="text-gray-400 dark:text-gray-800 text-sm text-center mt-6">Allowed *.jpeg, *.jpg, *.png <br/> max size of 3 MB</span>
                </div>
                <div class="p-5 sm:p-8 bg-white shadow rounded-3xl md:w-[65%] w-full">
                    <section>
                        <header>
                            <h2 class="text-lg font-medium text-gray-900">Profile Information</h2>

                            <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                Update your account's profile information and email address.
                            </p>
                        </header>

                        <div class="mt-6 space-y-6">
                            <div>
                                <label>Email</label>

                                <TextInput
                                    id="name"
                                    type="email"
                                    class="mt-1 block w-full"
                                    v-model="user.email"
                                    disabled
                                />
                            </div>

                            <div>
                                <label>Username</label>
                                <TextInput
                                    id="name"
                                    type="text"
                                    class="mt-1 block w-full text-gray-900"
                                    v-model="username"
                                />
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            <div class="flex justify-end">
                <input
                    type="submit"
                    class="button primary block bg-zinc-900 text-white px-12 py-2 rounded-lg mt-6"
                    :value="loading ? 'Loading ...' : 'Update'"
                    :disabled="loading"
                />
            </div>

        </form>
    </div>

</template>