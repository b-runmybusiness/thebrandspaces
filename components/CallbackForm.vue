<template>
  <div class="bg-white shadow p-6 rounded-xl">
        <h2 class="mb-4">Get A Callback For Pricing</h2>
        <form method="POST" @submit.prevent="saveData" class="flex flex-col gap-5">
            <div class="flex flex-col md:flex-row gap-5">
                <div class="w-full">
                        <input v-model="form.name" type='text' class='bg-zinc-100 border border-zinc-200 text-zinc-900 text-sm rounded-lg focus:outline-none focus:ring-0 focus:border-gray-200 block w-full p-3' placeholder='Name' required>
                    </div>
                    <div class="w-full">
                        <input v-model="form.contact" type='text' class='bg-zinc-100 border border-zinc-200 text-zinc-900 text-sm rounded-lg focus:outline-none focus:ring-0 focus:border-gray-200 block w-full p-3' placeholder='Mobile No.'>
                    </div>
                </div>
                <div class="w-full">
                    <input v-model="form.email" type='email' class='bg-zinc-100 border border-zinc-200 text-zinc-900 text-sm rounded-lg focus:outline-none focus:ring-0 focus:border-gray-200 block w-full p-3' placeholder='Email' required>
                </div>

                <div class="flex gap-5">
                    <div class="w-full">
                        <input v-model="form.state" type='text' class='bg-zinc-100 border border-zinc-200 text-zinc-900 text-sm rounded-lg focus:outline-none focus:ring-0 focus:border-gray-200 block w-full p-3' placeholder='State'>
                    </div>
                    <div class="w-full">
                        <input v-model="form.city" type='text' class='bg-zinc-100 border border-zinc-200 text-zinc-900 text-sm rounded-lg focus:outline-none focus:ring-0 focus:border-gray-200 block w-full p-3' placeholder='City'>
                    </div>
                </div>
                <textarea v-model="form.message" class='bg-zinc-100 border border-zinc-200 text-zinc-900 text-sm rounded-lg focus:outline-none focus:ring-0 focus:border-gray-200 block w-full p-2.5' placeholder='Any Message'></textarea>
                <button type="submit" class="bg-primary text-white p-3 rounded-lg w-full shadow-lg shadow-primary/50 flex items-center gap-2 justify-center">
                    <span v-if="loading" class="flex items-center gap-2 justify-center">
                        <Icon name="eos-icons:loading" class="w-5 h-5" />Sending...
                    </span>
                    <span v-else>Send Message</span>
                </button>
        </form>
    </div>
</template>

<script setup>  
   import { useToast, POSITION } from "vue-toastification";

    const toast = useToast();
    const supabase = useSupabaseClient()

    const loading = ref(false);
    const success = ref(false);
    const errorList = ref({})

    const form = {
        name: '',
        contact: '',
        email: '',
        state: '',
        city: '',
        message: '',
    }

    const saveData = async () => {
        loading.value = true;
        try {
            loading.value = true;
            const { error } = await supabase
                .from('contact')
                .insert({ 
                name:     form.name,
                contact:  form.contact,
                email:    form.email,
                state:    form.state,
                city:     form.city,
                message:  form.message,
                })   
        } catch (error) {
            console.log(error)
        } finally {
            loading.value = false;
            
            form.name = '',
            form.contact = '',
            form.email = '',
            form.state = '',
            form.city = '',
            form.message = '',

            toast.success("Message Sent Successfully", {
                timeout: 2000,
                position: POSITION.TOP_CENTER
            });
        }
    }
</script>

<style>

</style>