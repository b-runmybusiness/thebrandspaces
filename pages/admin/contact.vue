<template>
  <div>
    <div class="bg-white border border-gray-200 shadow-sm overflow-hidden">
      <!-- Header -->
      <div class="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200">
          <div>
              <h2 class="text-xl font-semibold text-gray-800 ">Contact Leads</h2>
              <p class="text-sm text-gray-600 dark:text-gray-400">Add category, edit and delete.</p>
          </div>

          <div>
              <div class="inline-flex gap-x-2">
                  <button class="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-gray-800 text-white text-sm">
                    <Icon name="ic:outline-file-download" class="w-5 h-5" />  
                    Download CSV
                  </button>
              </div>
          </div>
      </div>
      <!-- End Header -->

      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
            <tr>
                <th scope="col" class="pl-6 pr-6 py-3 text-left">
                    <div class="flex items-center gap-x-2">
                        <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 ">
                        ID
                        </span>
                    </div>
                </th>

                <th scope="col" class="px-6 py-3 text-left">
                    <div class="flex items-center gap-x-2">
                        <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 ">Name</span>
                    </div>
                </th>

                <th scope="col" class="px-6 py-3 text-left">
                    <div class="flex items-center gap-x-2">
                        <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 ">Email</span>
                    </div>
                </th>

                <th scope="col" class="px-6 py-3 text-left">
                    <div class="flex items-center gap-x-2">
                        <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 ">Message</span>
                    </div>
                </th>

                <th scope="col" class="px-6 py-3 text-left">
                    <div class="flex items-center gap-x-2">
                        <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 ">Received</span>
                    </div>
                </th>
            </tr>
        </thead>

        <tbody class="divide-y divide-gray-200">
            <tr v-for="contact in contacts" :key="contact.id">
                <td class="h-px w-72 whitespace-nowrap">
                    <div class="px-6 py-3">
                        <span class="block text-sm text-gray-800 ">{{ contact.id }}</span>
                    </div>
                </td>
                <td class="h-px w-px whitespace-nowrap">
                    <div class="pl-6 pr-6 py-3">
                        <div class="flex items-center gap-x-3">
                            <div class="grow">
                                <span class="block text-sm font-semibold text-gray-800 ">{{ contact.name }}</span>
                            </div>
                        </div>
                    </div>
                </td>
                <td class="h-px w-72 whitespace-nowrap">
                    <div class="px-6 py-3">
                        <span class="block text-sm text-gray-800 ">{{ contact.email }}</span>
                    </div>
                </td>
                <td class="h-px w-72 whitespace-nowrap">
                    <div class="px-6 py-3">
                        <span class="block text-sm text-gray-800 ">{{ contact.message }}</span>
                    </div>
                </td>
                <td class="h-px w-px whitespace-nowrap">
                    <div class="px-6 py-3">
                        <span class="text-sm text-gray-500">{{ $dayjs(contact.created_at).format('D MMM YYYY') }}</span>
                    </div>
                </td>
                <td class="h-px w-px whitespace-nowrap">
                    <div class="pr-6 py-1.5 space-x-3">
                        <button class="inline-flex items-center gap-x-1.5 text-sm text-blue-600 decoration-2 hover:underline font-medium" @click="deleteData(contact.id)"><Icon name="material-symbols:delete-outline" class="w-4 h-4" /></button>
                    </div>
                </td>
            </tr>
        </tbody>
      </table>

    </div>
  </div>
</template>

<script setup>
  definePageMeta({
    layout: 'admin',
    middleware: 'auth'
  })

  const supabase = useSupabaseClient()
  
  const loading = ref(false)

  const contacts = ref([])

  const fetchData = async () => {
    const { data, error } = await supabase
      .from('contact')
      .select()
    
      contacts.value = data
  }
  fetchData()

  // Delete Data
  const deleteData = async (id) => {
      await supabase
          .from('contact')
          .delete()
          .eq('id', id) 
      fetchData()
  }
</script>



<style>

</style>
