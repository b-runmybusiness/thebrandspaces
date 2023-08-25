<template>
    <div class="h-screen overflow-hidden">
        <nav class='w-full py-3 border-b'>
            <div class='w-full px-4 flex justify-between mx-auto'>
                <div class='logo flex gap-3 items-center'>
                    <div class='font-medium text-lg'>TheBrandSpaces</div>
                </div>
                
                <div class="flex items-center gap-2">
                    <template v-if="user">
                        <NuxtLink class='rounded px-3 py-1 text-sm flex items-center gap-1' to="/admin/dashboard">
                            <Icon name="carbon:dashboard" class="h-4 w-4" />
                            Dashboard
                        </NuxtLink>
                        <button class='rounded-lg px-3 py-1 text-sm flex items-center gap-1 border' @click="signOut">
                            <Icon name="ri:logout-circle-r-line" />
                            Logout
                        </button>
                    </template>
                    <NuxtLink class='rounded px-3 py-1 text-sm' to="/auth" v-else>Login</NuxtLink>
                </div>
            </div>
        </nav>
        <div class="w-full h-full flex">
            <aside class="h-[calc(100vh-52px)] overflow-y-auto w-[20%] border-r">
                <div class="h-full py-4 overflow-y-auto">
                    <ul class="">
                        <li v-for="link in links" :key="link" class="hover:bg-gray-100 py-2 px-3">
                            <NuxtLink :to="link.route" class="flex items-center p-2 text-gray-900 rounded-lg group">
                                <Icon :name="link.icon" class="group-hover:text-teal-700" />
                                <span class="ml-3 text-sm text-gray-600 group-hover:text-gray-900">{{ link.title }}</span>
                            </NuxtLink>
                        </li>
                    </ul>

                    <hr class="my-5" />

                    <ul class="">
                        <li class="hover:bg-gray-100 py-2 px-3">
                            <NuxtLink  to="/admin/category" class="flex items-center p-2 text-gray-900 rounded-lg group">
                                <Icon name="material-symbols:category-outline-rounded" class="group-hover:text-teal-700" />
                                <span class="ml-3 text-sm text-gray-600 group-hover:text-gray-900">Categories</span>
                            </NuxtLink>
                        </li>
                        <li class="hover:bg-gray-100 py-2 px-3">
                            <NuxtLink  to="/admin/contact" class="flex items-center p-2 text-gray-900 rounded-lg group">
                                <Icon name="material-symbols:mail-outline" class="group-hover:text-teal-700" />
                                <span class="ml-3 text-sm text-gray-600 group-hover:text-gray-900">Contact Leads</span>
                            </NuxtLink>
                        </li>
                    </ul>

                    <hr class="my-5" />

                    <ul class="">
                        <li class="hover:bg-gray-100 py-2 px-3">
                            <NuxtLink  to="/auth/account" class="flex items-center p-2 text-gray-900 rounded-lg group">
                                <Icon name="material-symbols:frame-person" class="group-hover:text-teal-700" />
                                <span class="ml-3 text-sm text-gray-600 group-hover:text-gray-900">Profile</span>
                            </NuxtLink>
                        </li>
                    </ul>
                </div>
            </aside>
            <main class="h-[calc(100vh-52px)] overflow-y-auto w-[80%]">
                <slot />
            </main>
        </div>
    </div>
</template>

<script setup>
    const user = useSupabaseUser()
    const supabase = useSupabaseClient()

    const links = ref([
        {title: 'Dashboard', icon: 'carbon:dashboard', route:'/admin/dashboard'},
        {title: 'Leasings', icon: 'ph:buildings-duotone', route:'/admin/leasing'},
        {title: 'Franchises', icon: 'solar:shop-2-line-duotone', route:'/admin/franchise'},
        // {title: 'Blog', icon: 'material-symbols:category-outline-rounded', route:'/admin/blog'},
    ])
    const loading = ref(false)

    async function signOut() {
        try {
            loading.value = true
            let { error } = await supabase.auth.signOut()
            if (error) throw error
            user.value = null
        } catch (error) {
            alert(error.message)
        } finally {
            loading.value = false
            return navigateTo('/')
        }
    }
</script>

<style>

</style>