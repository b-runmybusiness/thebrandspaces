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
                                    <h2 class="text-xl font-semibold text-gray-800 ">Franchises</h2>
                                    <p class="text-sm text-gray-600 dark:text-gray-400">Add franchises, edit and more.</p>
                                </div>

                                <div>
                                    <div class="inline-flex gap-x-2">
                                        <NuxtLink to="/admin/add-franchise" class="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-gray-800 text-white text-sm">
                                            + Add Franchise
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
                                                <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 ">Investment Size</span>
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
                                    <tr v-for="franchise in franchises" :key="franchise.id">
                                        <td class="h-px w-px whitespace-nowrap">
                                            <div class="pl-6 pr-6 py-3">
                                                <div class="flex items-center gap-x-3">
                                                    <div class="grow">
                                                        <span class="block text-sm font-semibold text-gray-800 ">{{ franchise.title }}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="h-px w-72 whitespace-nowrap">
                                            <div class="px-6 py-3">
                                                <span class="block text-sm text-gray-800 ">{{ franchise.investment_size }}</span>
                                            </div>
                                        </td>
                                        <td class="h-px w-px whitespace-nowrap">
                                            <div class="px-6 py-3">
                                                <span class="inline-flex items-center gap-1.5 py-0.5 px-2 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" v-if="franchise.category">{{ franchise.category.title }}</span>
                                            </div>
                                        </td>
                                        <td class="h-px w-px whitespace-nowrap">
                                            <div class="px-6 py-3">
                                                <span class="text-sm text-gray-500">
                                                    {{ $dayjs(franchise.created_at).format('D MMM YYYY') }}</span>
                                            </div>
                                        </td>
                                        <td class="h-px w-px whitespace-nowrap">
                                            <div class="py-1.5 space-x-3">
                                                <button class="inline-flex items-center gap-x-1.5 text-xs text-zinc-600 px-1.5 py-1 rounded hover:bg-gray-100" @click="editData(franchise.id)">
                                                    <Icon name="material-symbols:edit-sharp" />
                                                    Edit
                                                </button>
                                                <button class="inline-flex items-center gap-x-1 text-xs bg-red-600 text-white rounded px-1.5 py-1" @click="deleteData(franchise.id)">
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
                                        <span class="font-semibold text-gray-800 ">{{ franchises.length }}</span> results
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

            <div>
                <!-- Basic Details -->
                <section class="mb-12 flex gap-6 md:flex-row flex-col px-6 md:px-0">
                    <div class="w-full rounded-xl md:shadow flex-col flex gap-6 md:p-6 w-full">
                        <div class="relative">
                            <label class="">Title</label>
                            <TextInput v-model="franchise.title" placeholder="Name" />
                        </div>
                        <div class="relative">
                            <label class="">About</label>
                            <TextArea v-model="franchise.description" rows="5" placeholder="About" />
                        </div>
                        <div class="grid md:grid-cols-2 gap-6">
                            <div class="relative">
                                <label class="">Area required</label>
                                <TextInput v-model="franchise.area_required" placeholder="Area Required" />
                            </div>
                            <div class="relative">
                                <label class="">Investment Size</label>
                                <select class="py-3 px-4 pr-9 block w-full border border-gray-200 rounded-md text-sm" v-model="franchise.investment_size">
                                    <option v-for="price in prices" :key="price">{{ price }}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Investment Details -->
                <section class="flex gap-6 flex-col md:flex-row px-6 md:px-0 mb-12">
                    <div class="w-full md:shadow rounded-xl flex-col flex gap-6">
                        <section class="md:p-6">
                            <div class="grid md:grid-cols-2 gap-6">
                                <div class="relative">
                                    <label class="">Company Started On (Year)</label>
                                    <TextInput v-model="franchise.establishment_year" placeholder="Establishment Year" />
                                </div>
                                <div class="relative">
                                    <label>Franchise Started On (Year)</label>
                                    <TextInput v-model="franchise.franchise_started_on" placeholder="Franchise Year" />
                                </div>
                            </div>
                        </section>
                        <hr>
                        <section class="md:p-6">
                            <div class="grid md:grid-cols-2 gap-6">
                                <div class="relative">
                                    <label>No. of Franchise Outlet</label>
                                    <TextInput v-model="franchise.number_of_outlet" placeholder="No. of Franchise Outlet" />
                                </div>
                                <div class="relative">
                                    <label>Floor area requirement (Sq.ft)</label>
                                    <TextInput v-model="franchise.floor_area_required" placeholder="Floor Area required" />
                                </div>
                                <div class="relative">
                                    <label>Preferred location of outlet</label>
                                    <TextInput v-model="franchise.preferred_location" placeholder="Highway, Malls, High Streets" />
                                </div>
                                <div class="relative">
                                    <label>Type of property required</label>
                                    <TextInput v-model="franchise.type_of_property_required" placeholder="Commercial etc.." />
                                </div>
                            </div>
                        </section>
                    </div>
                </section>

                <!-- Investment Details -->
                <section class="flex gap-6 flex-col md:flex-row px-6 md:px-0 mb-12">
                    <div class="w-full md:shadow rounded-xl flex-col flex gap-6">
                        <section class="md:p-6">
                            <h4 class="mb-4">Training Details</h4>
                            <div class="grid grid-cols-1 gap-6">
                                <div class="relative">
                                    <label class="">Detailed operating manuals for franchisees</label>
                                    <TextInput v-model="franchise.operating_manuals_for_franchisees" placeholder="Yes / No" />
                                </div>
                                <div class="relative">
                                    <label>Franchisee training location</label>
                                    <TextInput v-model="franchise.franchisee_training_location" placeholder="City name" />
                                </div>
                                <div class="relative">
                                    <label>Is field assistance available for franchisee?</label>
                                    <TextInput v-model="franchise.field_assistance_available_for_franchisee" placeholder="Yes/No" />
                                </div>
                                <div class="relative">
                                    <label>Expert guidance from Head Office to franchisee in opening the franchise</label>
                                    <TextInput v-model="franchise.expert_guidance" placeholder="Yes/No" />
                                </div>
                                <div class="relative">
                                    <label>Current IT System will be included in the franchise</label>
                                    <TextInput v-model="franchise.it_system_will_be_included" placeholder="Yes/No" />
                                </div>
                            </div>
                        </section>

                        <hr>

                        <section class="md:p-6">
                            <h4 class=" mb-4">Agreement & Terms Details</h4>
                            <div class="grid grid-cols-1 gap-6">
                                <div class="relative">
                                    <label class="">Do you have a standard franchise agreement?</label>
                                    <TextInput v-model="franchise.standard_franchise_agreement" placeholder="Yes / No" />
                                </div>
                                <div class="relative">
                                    <label>How long is the franchise term for?</label>
                                    <TextInput v-model="franchise.how_long_is_the_franchise_term" placeholder="Years" />
                                </div>
                                <div class="relative">
                                    <label>Is the term renewable?</label>
                                    <TextInput v-model="franchise.is_term_renewable" placeholder="Yes/No" />
                                </div>
                            </div>
                        </section>
                    </div>
                </section>

                <!-- Category -->
                <section class="mb-12 flex gap-6 md:flex-row flex-col px-6 md:px-0">
                    <div class="w-full rounded-xl md:shadow flex-col flex gap-6 md:p-6 w-full">
                        <div class="relative">
                            <label class="">Select Category</label>
                            <select class="bg-white border border-gray-200 p-3 rounded-lg w-full text-sm" v-model="franchise.category_id">
                                <option class="text-sm" v-for="category in categories" :key="category" :value="category.id">{{ category.title }}</option>
                            </select>
                        </div>
                    </div>
                </section>

                <!-- Image Gallery -->
                <section class="flex gap-6 md:flex-row flex-col px-6 md:px-0">
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
                            <figure v-for="(image, index) in franchise.images" :key="index" class="w-full relative overflow-hidden">
                                <img :src="`https://fcxbrpopspdlwnyangsb.supabase.co/storage/v1/object/public/gallery/${image}`" alt="" class="border w-full h-44 object-cover rounded-xl">
                                <button @click="deleteImage(index, image)" class="border rounded-lg bg-gray-900 text-white w-full py-1 text-xs">
                                    Delete
                                    <Icon name="material-symbols:delete-outline" class="h-4 w-4" />
                                </button>
                            </figure>
                        </div>
                    </div>
                </section>

                <section class="flex justify-end px-6 pb-12">
                    <button 
                        class="bg-gray-800 text-white py-3 px-12 rounded-lg mt-6 w-full md:w-auto flex items-center gap-2"
                        type="submit" 
                        @click="updateData(franchise.id)"
                    > 
                        <Icon v-if="loading" name="line-md:loading-twotone-loop" class="w-5 h-5" /> 
                        {{ loading ? 'Updating...' : 'Update Franchise'  }}
                    </button>
                </section>
            </div>
        </aside>
    </div>
</template>

<script setup>
    import { useToast, POSITION } from "vue-toastification";
    const toast = useToast();
    const supabase = useSupabaseClient()
    const user = useSupabaseUser()

    definePageMeta({
        layout: 'admin',
        middleware: 'auth'
    })

    const editSidebar = ref(false)
    const loading = ref(false)
    const categories = ref([])
    const franchises = ref([])
    const franchise = ref({})
    const limit = ref(8)
    const files = ref([])

    const fetchLeasings = async () => {
        try {
            let { data } = await supabase
            .from('franchise')
            .select(`
                id,
                title,
                investment_size,
                created_at,
                category(
                    title
                )
            `)
            .order('id', { ascending: false })
            .limit(limit.value)
            
            franchises.value = data
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
        // Get selected data
        const {data} = await supabase
            .from('franchise')
            .select()
            .eq('id', id)

        // Delete all images first
        for (let index = 0; index < data[0].images.length; index++) {
            const file = data[0].images[index];
            // run loop
            await supabase
                .storage
                .from('gallery')
                .remove(file)
        }

        // Delete Data
        await supabase
            .from('franchise')
            .delete()
            .eq('id', id)

        toast.error("franchises Deleted", {
            timeout: 2000,
            position: POSITION.TOP_CENTER
        });
        fetchLeasings()
    }

    const editData = async (id) => {
        let { data, error } = await supabase
            .from('franchise')
            .select(`
                'id',
                'title',
                'slug',
                'category_id',
                'description',
                'area_required',
                'investment_size',
                'number_of_outlet',
                'establishment_year',
                'operation_started_on',
                'franchise_started_on',
                'floor_area_required',
                'preferred_location',
                'type_of_property_required',
                'operating_manuals_for_franchisees',
                'franchisee_training_location',
                'field_assistance_available_for_franchisee',
                'expert_guidance',
                'it_system_will_be_included',
                'standard_franchise_agreement',
                'how_long_is_the_franchise_term',
                'is_term_renewable',
                'images'
                category(
                    title
                )
            `)
            .eq('id', id)
        franchise.value = data[0];
        editSidebar.value = true
    }

    const updateData = async (id) => {
        loading.value = true;
        convertToSlug()
        const { data, error } = await supabase
            .from('franchise')
            .update(
                { 
                    title : franchise.value.title,
                    slug : franchise.value.slug,
                    category_id : franchise.value.category_id,
                    description : franchise.value.description,
                    area_required : franchise.value.area_required,
                    investment_size : franchise.value.investment_size,
                    number_of_outlet : franchise.value.number_of_outlet,
                    establishment_year : franchise.value.establishment_year,
                    operation_started_on : franchise.value.operation_started_on,
                    franchise_started_on : franchise.value.franchise_started_on,
                    floor_area_required : franchise.value.floor_area_required,
                    preferred_location : franchise.value.preferred_location,
                    type_of_property_required : franchise.value.type_of_property_required,
                    operating_manuals_for_franchisees : franchise.value.operating_manuals_for_franchisees,
                    franchisee_training_location : franchise.value.franchisee_training_location,
                    field_assistance_available_for_franchisee : franchise.value.field_assistance_available_for_franchisee,
                    expert_guidance : franchise.value.expert_guidance,
                    it_system_will_be_included : franchise.value.it_system_will_be_included,
                    standard_franchise_agreement : franchise.value.standard_franchise_agreement,
                    how_long_is_the_franchise_term : franchise.value.how_long_is_the_franchise_term,
                    is_term_renewable : franchise.value.is_term_renewable,
                    images : franchise.value.images
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
        franchise.value.images.splice(index, 1)
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
                franchise.value.images.push(result)
            }
        } catch (error) {
            alert(error.message)
        } finally {
            
        }
    }
    const convertToSlug = () => {
        // cache the variable
        var theSlug = franchise.value.title

        // Convert To Lowercase
        theSlug = theSlug.toLowerCase();

        // Replace White Spaces With Dashes
        theSlug = theSlug.replace(/\s+/g, '-')

        // Replace Ampersand With Dash and Space
        theSlug = theSlug.replace(/&/g, 'and')
        // Result
        const result = Math.random().toString(36).substring(2,6);
        franchise.value.slug = result+'/'+theSlug
    }
</script>

<style scoped>
label{
    font-size: 14px;
}
</style>