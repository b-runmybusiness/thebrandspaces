<template>
    <div>
        <input type="text" class="w-full border px-5 py-2 rounded-xl" v-model="newPassword">
        <button class='bg-blue-700 text-sm text-white font-medium px-6 py-4 rounded-xl hover:-translate-y-2 transition duration-700 ease-in-out hover:shadow-lg hover:shadow-blue-700 w-full' @click.prevent="updatePassword()">Active</button>
    </div>
</template>

<script setup>
    const supabase = useSupabaseClient()

    const newPassword = ref('')

    const updatePassword = async () => {
        console.log('hello')
        await supabase.auth.updateUser({ password: newPassword.value })
    }
</script>

<style>

</style>