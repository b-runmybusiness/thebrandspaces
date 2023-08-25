<template>
    <div class="w-full h-full">

        <!-- Table Section -->
        <div class="w-full">
            <!-- Card -->
            <div class="flex flex-col">
                <div class="overflow-x-auto">
                    <div class="min-w-full inline-block align-middle">
                        <div class="bg-white overflow-hidden">
                            <!-- Header -->
                            <div class="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200">
                                <div>
                                    <h2 class="text-xl font-semibold text-gray-800 ">Leasings</h2>
                                    <p class="text-sm text-gray-600 dark:text-gray-400">Add leasings, edit and more.</p>
                                </div>

                                <div>
                                    <div class="inline-flex gap-x-2">
                                        <NuxtLink to="/admin/add-leasing" class="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-gray-800 text-white text-sm">
                                            + Add Leasing
                                        </NuxtLink>
                                    </div>
                                </div>
                            </div>
                            <!-- End Header -->

                            <!-- Table -->
                            <table class="min-w-full divide-y divide-gray-200">
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th scope="col" class="pl-6 pr-6 py-3 text-left">
                                            <div class="flex items-center gap-x-2">
                                                <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 ">
                                                Title
                                                </span>
                                            </div>
                                        </th>

                                        <th scope="col" class="px-6 py-3 text-left">
                                            <div class="flex items-center gap-x-2">
                                                <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 ">Address</span>
                                            </div>
                                        </th>

                                        <th scope="col" class="px-6 py-3 text-left">
                                            <div class="flex items-center gap-x-2">
                                                <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 ">Category</span>
                                            </div>
                                        </th>

                                        <th scope="col" class="px-6 py-3 text-left">
                                            <div class="flex items-center gap-x-2">
                                                <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 ">Created</span>
                                            </div>
                                        </th>
                                        <th scope="col" class="pr-8 py-3 text-right">
                                            <div class="flex items-center justify-end gap-x-2">
                                                <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 ">Actions</span>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>

                                <tbody class="divide-y divide-gray-200">
                                    <tr v-for="leasing in leasings" :key="leasing.id">
                                        <td class="h-px w-px whitespace-nowrap">
                                            <div class="pl-6 pr-6 py-3">
                                                <div class="flex items-center gap-x-3">
                                                    <div class="grow">
                                                        <span class="block text-sm font-semibold text-gray-800 ">{{ leasing.title }}</span>
                                                        <span class="block text-sm text-gray-500">{{ leasing.location }}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="h-px w-72 whitespace-nowrap">
                                            <div class="px-6 py-3">
                                                <span class="block text-sm text-gray-800 ">{{ leasing.address }}</span>
                                            </div>
                                        </td>
                                        <td class="h-px w-px whitespace-nowrap">
                                            <div class="px-6 py-3">
                                                <span class="inline-flex items-center gap-1.5 py-0.5 px-2 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" v-if="leasing.category">{{ leasing.category.title }}</span>
                                            </div>
                                        </td>
                                        <td class="h-px w-px whitespace-nowrap">
                                            <div class="px-6 py-3">
                                                <span class="text-sm text-gray-500">
                                                    {{ $dayjs(leasing.created_at).format('D MMM YYYY') }}</span>
                                            </div>
                                        </td>
                                        <td class="h-px w-px whitespace-nowrap">
                                            <div class="py-1.5 space-x-3">
                                                <button class="inline-flex items-center gap-x-1.5 text-xs text-zinc-600 px-1.5 py-1 rounded hover:bg-gray-100" @click="editData(leasing.id)">
                                                    <Icon name="material-symbols:edit-sharp" />
                                                    Edit
                                                </button>
                                                <button class="inline-flex items-center gap-x-1 text-xs bg-red-600 text-white rounded px-1.5 py-1" @click="deleteData(leasing.id)">
                                                    <Icon name="material-symbols:delete-outline" />
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <!-- End Table -->

                            <!-- Footer -->
                            <div class="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200">
                                <div>
                                    <p class="text-sm text-gray-600 dark:text-gray-400">
                                        <span class="font-semibold text-gray-800 ">{{ leasings.length }}</span> results
                                    </p>
                                </div>
                                <div>
                                    <div class="inline-flex gap-x-2">
                                        <button type="button" class="py-2 px-3 flex justify-center items-center gap-1 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-100 transition-all text-sm" @click="loadMore">
                                            Load more
                                            <Icon name="material-symbols:fitbit-arrow-downward-rounded" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <!-- End Footer -->
                        </div>
                    </div>
                </div>
            </div>
            <!-- End Card -->
        </div>
        <!-- End Table Section -->

        <aside class="bg-white fixed right-0 top-0 h-screen overflow-y-auto w-[60vw] shadow-xl" v-if="editSidebar">
            <header class="flex items-center">
                <button class="p-4 bg-gray-200" @click="editSidebar = !editSidebar"><Icon name="material-symbols:close" /></button>
            </header>

            <div class="grid md:grid-cols-2 gap-8 p-12">
                <section class="w-full space-y-6">
                    <div class="relative">
                        <label class="">Select Category</label>
                        <select class="bg-white border border-gray-200 p-3 rounded-lg w-full text-sm" v-model="leasing.category_id">
                            <option class="text-sm" v-for="category in categories" :key="category" :value="category.id">{{ category.title }}</option>
                        </select>
                    </div>
                    <div class="relative">
                        <label class="">Title</label>
                        <TextInput v-model="leasing.title" placeholder="Name" />
                    </div>
                    <div class="relative">
                        <label class="">Description</label>
                        <TextArea v-model="leasing.description" rows="5" placeholder="Description" />
                    </div>
                </section>
                <section class="w-full">
                    <div class="rounded-xl flex-col flex w-full">
                        <div class="grid grid-cols-1 gap-5">
                            <div class="relative">
                                <label class="">Property Status</label>
                                <select class="bg-white border border-gray-200 p-3 rounded-lg w-full text-sm" v-model="leasing.propertyStatus">
                                    <option value="under construction" selected>Under Construction</option>
                                    <option value="ready to move">Ready To Move</option>
                                </select>
                            </div>
                            <div class="relative">
                                <label>Property Type</label>
                                <select class="bg-white border border-gray-200 p-3 rounded-lg w-full text-sm" v-model="leasing.propertyType">
                                    <option value="residential" selected>Residential</option>
                                    <option value="commercial">Commercial</option>
                                </select>
                            </div>
                            <div class="relative">
                                <label class="">City Name</label>
                                <TextInput v-model="leasing.location" placeholder="City Name" />
                            </div>
                            <div class="relative">
                                <label class="">Complete Address</label>
                                <TextInput v-model="leasing.address" placeholder="Complete Address" />
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <!-- Image Gallery -->
            <section class="flex gap-6 md:flex-row flex-col p-12">
                <div class="w-full border rounded-xl flex-col flex gap-6 p-6">
                    <div class="flex justify-between items-center">
                        <h5 class="font-semibold">Images</h5>
                        <label for="upload" class="">
                            <span class="flex items-center gap-1 text-xs border px-2 py-1 rounded-lg cursor-pointer">
                                <Icon name="solar:upload-square-line-duotone" class="w-4 h-4" />
                                Select Image
                            </span>
                        </label>
                        <input id="upload" type="file" @change="uploadImages" multiple class="w-full upload hidden" />
                    </div>
                    <div class="grid grid-cols-4 gap-4">
                        <figure v-for="(image, index) in leasing.images" :key="index" class="w-full relative overflow-hidden">
                            <img :src="`https://srkaxgtxygietqipfctd.supabase.co/storage/v1/object/public/gallery/${image}`" alt="" class="border w-full h-44 object-cover rounded-xl">
                            <button @click="deleteImage(index, image)" class="border rounded-lg bg-gray-900 text-white w-full py-1 text-xs">
                                Delete
                                <Icon name="material-symbols:delete-outline" class="h-4 w-4" />
                            </button>
                        </figure>
                    </div>
                </div>
            </section>

            <section class="flex justify-end px-12 pb-12">
                <button 
                    class="bg-gray-800 text-white py-3 px-12 rounded-lg mt-6 w-full md:w-auto flex items-center gap-2"
                    type="submit" 
                    @click="updateData(leasing.id)"
                > 
                    <Icon v-if="loading" name="line-md:loading-twotone-loop" class="w-5 h-5" /> 
                    {{ loading ? 'Saving...' : 'Update Leasing'  }}
                </button>
            </section>
        </aside>
    </div>
</template>

<script setup>
    import { useToast, POSITION } from "vue-toastification";
    const toast = useToast();
    const supabase = useSupabaseClient()

    definePageMeta({
        layout: 'admin',
        middleware: 'auth'
    })

    const editSidebar = ref(false)
    const loading = ref(false)
    const categories = ref([])
    const leasings = ref([])
    const leasing = ref({})
    const limit = ref(8)
    const files = ref([])

    const fetchLeasings = async () => {
        try {
            let { data } = await supabase
            .from('leasing')
            .select(`
                id,
                title,
                address,
                created_at,
                category(
                    title
                )
            `)
            .order('id', { ascending: false })
            .limit(limit.value)
            
            leasings.value = data
        } catch (error) {
            console.log(error)
        } finally {}
    }
    fetchLeasings()

    const loadMore = () => {
        limit.value += 4
        fetchLeasings()
    }

    const { data, error } = await supabase
        .from('category')
        .select()
        if(data){
            categories.value = data
        }

    // Delete Data
    const deleteData = async (id) => {
        await supabase
            .from('leasing')
            .delete()
            .eq('id', id)
        toast.error("Leasing Deleted", {
            timeout: 2000,
            position: POSITION.TOP_CENTER
        });
        fetchLeasings()
    }

    const editData = async (id) => {
        let { data, error } = await supabase
            .from('leasing')
            .select(`
                'id',
                'title',
                'slug',
                'description',
                'propertyType',
                'propertyStatus',
                'location',
                'address',
                'images'
                category(
                    title
                )
            `)
            .eq('id', id)
        leasing.value = data[0];
        editSidebar.value = true
    }

    const updateData = async (id) => {
        loading.value = true;
        convertToSlug()
        const { data, error } = await supabase
            .from('leasing')
            .update(
                { 
                    title: leasing.value.title,
                    slug: leasing.value.slug,
                    description: leasing.value.description,
                    propertyType: leasing.value.propertyType,
                    propertyStatus: leasing.value.propertyStatus,
                    location: leasing.value.location,
                    address: leasing.value.address,
                    images: leasing.value.images,
                    category_id: leasing.value.category_id,
                }
            )
            .eq('id', id)
            .select()

        loading.value = false;
        toast.success("Successfully Added", {
            timeout: 2000,
            position: POSITION.TOP_CENTER
        });
        fetchLeasings()
        editSidebar.value = false;
    }

    const deleteImage = async (index, file) => {
        leasing.value.images.splice(index, 1)
        const { data, error } = await supabase
            .storage
            .from('gallery')
            .remove(file)
    }
    const uploadImages = async (evt) => {
        files.value = evt.target.files
        try {
            if(!files.value || files.value.length === 0){
                throw new Error('You must have at least one image to upload')
            }

            for (let index = 0; index < files.value.length; index++) {
                const file = files.value[index];
                const fileExt = file.name.split('.').pop()
                const fileName = `${Math.random()}.${fileExt}`
                const filePath = `${fileName}`

                let {error: uploadError} = await supabase.storage.from('gallery').upload(filePath, file)

                if(uploadError) throw uploadError

                // preview image
                const { data } = supabase.storage.from('gallery').getPublicUrl(filePath)
                if(error) throw error

                let str = data.publicUrl.split("/");
                let result = str[str.length - 1];
                // console.log(result)
                leasing.value.images.push(result)
            }
        } catch (error) {
            alert(error.message)
        } finally {
            
        }
    }
    const convertToSlug = () => {
        // cache the variable
        var theSlug = leasing.value.title

        // Convert To Lowercase
        theSlug = theSlug.toLowerCase();

        // Replace White Spaces With Dashes
        theSlug = theSlug.replace(/\s+/g, '-')

        // Replace Ampersand With Dash and Space
        theSlug = theSlug.replace(/&/g, 'and')
        // Result
        const result = Math.random().toString(36).substring(2,6);
        leasing.value.slug = result+'/'+theSlug
    }
</script>

<style scoped>
label{
    font-size: 14px;
}
</style>