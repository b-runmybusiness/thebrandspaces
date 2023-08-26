<template>
  <div>
    <div class="bg-white border border-gray-200 shadow-sm overflow-hidden">
      <!-- Header -->
      <div class="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200">
          <div>
              <h2 class="text-xl font-semibold text-gray-800 ">Category</h2>
              <p class="text-sm text-gray-600 dark:text-gray-400">Add category, edit and delete.</p>
          </div>

          <div>
              <div class="inline-flex gap-x-2">
                  <button class="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-gray-800 text-white text-sm" @click="addModal = !addModal">
                      <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M2.63452 7.50001L13.6345 7.5M8.13452 13V2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                      </svg>Add Category
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
                        <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 ">Title</span>
                    </div>
                </th>

                <th scope="col" class="px-6 py-3 text-left">
                    <div class="flex items-center gap-x-2">
                        <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 ">Slug</span>
                    </div>
                </th>

                <th scope="col" class="px-6 py-3 text-left">
                    <div class="flex items-center gap-x-2">
                        <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 ">Created</span>
                    </div>
                </th>
                <th scope="col" class="px-6 py-3 text-left">
                    <div class="flex items-center gap-x-2">
                        <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 ">Actions</span>
                    </div>
                </th>
            </tr>
        </thead>

        <tbody class="divide-y divide-gray-200">
            <tr v-for="category in categories" :key="category.id">
                <td class="h-px w-72 whitespace-nowrap">
                    <div class="px-6 py-3">
                        <span class="block text-sm text-gray-800 ">{{ category.id }}</span>
                    </div>
                </td>
                <td class="h-px w-px whitespace-nowrap">
                    <div class="pl-6 pr-6 py-3">
                        <div class="flex items-center gap-x-3">
                            <div class="grow">
                                <span class="block text-sm font-semibold text-gray-800 ">{{ category.title }}</span>
                            </div>
                        </div>
                    </div>
                </td>
                <td class="h-px w-72 whitespace-nowrap">
                    <div class="px-6 py-3">
                        <span class="block text-sm text-gray-800 ">{{ category.slug }}</span>
                    </div>
                </td>
                <td class="h-px w-px whitespace-nowrap">
                    <div class="px-6 py-3">
                        <span class="text-sm text-gray-500">{{ $dayjs(category.created_at).format('D MMM YYYY') }}</span>
                    </div>
                </td>
                <td class="h-px w-px whitespace-nowrap">
                    <div class="pr-6 py-1.5 space-x-3">
                        <a class="inline-flex items-center gap-x-1.5 text-sm text-blue-600 decoration-2 hover:underline font-medium" href="#">Edit</a>
                        <button class="inline-flex items-center gap-x-1.5 text-sm text-blue-600 decoration-2 hover:underline font-medium" @click="deleteData(category.id)">Delete</button>
                    </div>
                </td>
            </tr>
        </tbody>
      </table>

      <!-- Add New MOdal -->
      <section v-if="addModal" class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900/50">
        <div class="bg-white rounded-xl border p-6 max-w-sm w-full space-y-6">
          <div class="relative">
              <label class="text-xs font-bold">Category Title</label>
              <TextInput v-model="form.title" placeholder="Title" />
          </div>
          <!-- <div class="relative">
              <label class="text-xs font-bold">Category Slug</label>
              <TextInput v-model="form.slug" placeholder="Slug" />
          </div> -->
          <button class="bg-gray-900 text-white w-full rounded-lg py-3 text-sm" @click="saveData">Save Category</button>
          <button @click="addModal = !addModal" class="border w-full rounded-lg py-3 text-sm">Cancel</button>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup>
    import { useToast, POSITION } from "vue-toastification";
    const toast = useToast();

  definePageMeta({
    layout: 'admin',
    middleware: 'auth'
  })

  const supabase = useSupabaseClient()
  const user = useSupabaseUser()

  const addModal = ref(false)
  const loading = ref(false)

  const form = {
      title:          '',
      slug:    '',
  };

  const categories = ref([])

  const saveData = async () => {
        convertToSlug()
        try {
            loading.value = true;
            const { error } = await supabase
                .from('category')
                .insert({ 
                    title:   form.title,
                    slug:    form.slug,
                })   
        } catch (error) {
            console.log(error)
        } finally {
            loading.value = false;
            fetchData()
            addModal.value = false
            toast.success("Successfully Added", {
                timeout: 2000,
                position: POSITION.TOP_CENTER
            });
        }
  }

  const fetchData = async () => {
    const { data, error } = await supabase
      .from('category')
      .select()
      if(data){
        categories.value = data
      }
  }
  fetchData()

  // Delete Data
  const deleteData = async (id) => {
      await supabase
          .from('category')
          .delete()
          .eq('id', id) 
      fetchData()
  }
    const convertToSlug = () => {
        var theSlug = form.title
        theSlug = theSlug.toLowerCase();
        theSlug = theSlug.replace(/\s+/g, '-')
        theSlug = theSlug.replace(/&/g, 'and')
        form.slug = theSlug
    }
</script>



<style>

</style>
