<template>
  <div class="bg-white">
      <div class="flex flex-col md:flex-row items-center h-full">
          <div class="bg-red-200 md:w-1/2 w-full h-32 md:h-[calc(100vh-80px)]">
              <img src="/images/contact.jpg" alt="" class="w-full object-cover h-full">
          </div>
          <div class="md:w-1/2 p-6 md:px-20">
              <template v-if="success">
                  <div id="toast-simple" class="flex items-center w-full p-4 space-x-4 text-gray-500 bg-white divide-x divide-gray-200 rounded-lg shadow space-x" role="alert">
                      <Icon name="pepicons-print:send" class="h-10 w-10 text-primary" />
                      <div class="pl-4 text-sm font-normal">
                          <h5 class="font-semibold">Message sent successfully.</h5>
                          <p>Thanks for sharing your details. We will get back to you as soon as possible.</p>
                          <button class="mt-4">
                              <NuxtLink to="/" class="text-sm bg-primary text-white rounded px-3 py-1">
                                  <Icon name="ic:sharp-keyboard-backspace" class="w-4 h-4" />
                                  back to home
                              </NuxtLink>
                          </button>
                      </div>
                  </div>
              </template>
              <template v-else>
                  <div>Contact Us</div>
                  <form 
                      class="flex flex-col gap-5"
                      @submit.prevent="saveData"
                  >
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
              </template>
          </div>
      </div>
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