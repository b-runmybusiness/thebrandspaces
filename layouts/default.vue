<template>
    <div class="h-screen overflow-hidden">
        <nav class='bg-white w-full shadow-sm overflow-hidden'>
            <div class='w-full flex justify-between max-w-6xl mx-auto h-12 md:h-[80px]'>
                <AppLogo />
                <div class="flex items-center">
                    <NavLinks class="hidden md:flex" />
                    <MenuLinks />
                </div>
            </div>
        </nav>
        <div class="w-full h-[calc(100vh-55px)] overflow-y-auto">
            <slot />
            <div class="border-t">
                <app-footer />
            </div>
        </div>
    </div>
</template>

<script setup>
    const user = useSupabaseUser()
    const supabase = useSupabaseClient()

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