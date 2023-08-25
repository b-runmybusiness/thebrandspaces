<template>
    <div>
        <header class="px-8 flex items-center justify-between border-b py-3">
            <NuxtLink to="/admin/franchise" class="py-1 rounded text-sm flex items-center gap-1">
                <Icon name="ic:outline-keyboard-backspace" />
                back
            </NuxtLink>
            <h3 class="font-bold"># Add Franchise</h3>
        </header>
        
        <div class="w-full h-full max-w-6xl mx-auto py-6 md:pl-10">
                
            <!-- Basic Details -->
            <section class="mb-12 flex gap-6 md:flex-row flex-col px-6 md:px-0">
                <div class="md:w-[30%]">
                    <h5 class="">Create a new Franchise</h5>
                    <p class="text-sm text-gray-500 dark:text-gray-300">Title, Short description, featured image...</p>
                </div>
                <div class="md:w-[70%] rounded-xl md:shadow flex-col flex gap-6 md:p-6 w-full">
                    <div class="relative">
                        <label class="">Title</label>
                        <TextInput v-model="form.title" placeholder="Name" />
                    </div>
                    <div class="relative">
                        <label class="">About</label>
                        <TextArea v-model="form.description" rows="5" placeholder="About" />
                    </div>
                    <div class="grid md:grid-cols-2 gap-6">
                        <div class="relative">
                            <label class="">Area required</label>
                            <TextInput v-model="form.area_required" placeholder="Area Required" />
                        </div>
                        <div class="relative">
                            <label class="">Investment Size</label>
                            <select class="py-3 px-4 pr-9 block w-full border border-gray-200 rounded-md text-sm" v-model="form.investment_size">
                                <option v-for="price in prices" :key="price">{{ price }}</option>
                            </select>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Investment Details -->
            <section class="flex gap-6 flex-col md:flex-row px-6 md:px-0 mb-12">
                <div class="md:w-[30%]">
                    <h4 class="dark:text-gray-200">Franchise Details</h4>
                    <p class="text-gray-500 dark:text-gray-300">Floor area, Property Type, Location...</p>
                </div>
                <div class="md:w-[70%] md:shadow rounded-xl flex-col flex gap-6">
                    <section class="md:p-6">
                        <div class="grid md:grid-cols-2 gap-6">
                            <div class="relative">
                                <label class="">Company Started On (Year)</label>
                                <TextInput v-model="form.establishment_year" placeholder="Establishment Year" />
                            </div>
                            <div class="relative">
                                <label>Franchise Started On (Year)</label>
                                <TextInput v-model="form.franchise_started_on" placeholder="Franchise Year" />
                            </div>
                        </div>
                    </section>
                    <hr>
                    <section class="md:p-6">
                        <div class="grid md:grid-cols-2 gap-6">
                            <div class="relative">
                                <label>No. of Franchise Outlet</label>
                                <TextInput v-model="form.number_of_outlet" placeholder="No. of Franchise Outlet" />
                            </div>
                            <div class="relative">
                                <label>Floor area requirement (Sq.ft)</label>
                                <TextInput v-model="form.floor_area_required" placeholder="Floor Area required" />
                            </div>
                            <div class="relative">
                                <label>Preferred location of outlet</label>
                                <TextInput v-model="form.preferred_location" placeholder="Highway, Malls, High Streets" />
                            </div>
                            <div class="relative">
                                <label>Type of property required</label>
                                <TextInput v-model="form.type_of_property_required" placeholder="Commercial etc.." />
                            </div>
                        </div>
                    </section>
                </div>
            </section>

            <!-- Investment Details -->
            <section class="flex gap-6 flex-col md:flex-row px-6 md:px-0 mb-12">
                <div class="md:w-[30%]">
                    <h4 class=" dark:text-gray-200">Training &amp; Agreements</h4>
                    <p class="text-gray-500 dark:text-gray-300">Training location, agreement...</p>
                </div>
                <div class="md:w-[70%] md:shadow rounded-xl flex-col flex gap-6">
                    <section class="md:p-6">
                        <h4 class="mb-4">Training Details</h4>
                        <div class="grid grid-cols-1 gap-6">
                            <div class="relative">
                                <label class="">Detailed operating manuals for franchisees</label>
                                <TextInput v-model="form.operating_manuals_for_franchisees" placeholder="Yes / No" />
                            </div>
                            <div class="relative">
                                <label>Franchisee training location</label>
                                <TextInput v-model="form.franchisee_training_location" placeholder="City name" />
                            </div>
                            <div class="relative">
                                <label>Is field assistance available for franchisee?</label>
                                <TextInput v-model="form.field_assistance_available_for_franchisee" placeholder="Yes/No" />
                            </div>
                            <div class="relative">
                                <label>Expert guidance from Head Office to franchisee in opening the franchise</label>
                                <TextInput v-model="form.expert_guidance" placeholder="Yes/No" />
                            </div>
                            <div class="relative">
                                <label>Current IT System will be included in the franchise</label>
                                <TextInput v-model="form.it_system_will_be_included" placeholder="Yes/No" />
                            </div>
                        </div>
                    </section>

                    <hr>

                    <section class="md:p-6">
                        <h4 class=" mb-4">Agreement & Terms Details</h4>
                        <div class="grid grid-cols-1 gap-6">
                            <div class="relative">
                                <label class="">Do you have a standard franchise agreement?</label>
                                <TextInput v-model="form.standard_franchise_agreement" placeholder="Yes / No" />
                            </div>
                            <div class="relative">
                                <label>How long is the franchise term for?</label>
                                <TextInput v-model="form.how_long_is_the_franchise_term" placeholder="Years" />
                            </div>
                            <div class="relative">
                                <label>Is the term renewable?</label>
                                <TextInput v-model="form.is_term_renewable" placeholder="Yes/No" />
                            </div>
                        </div>
                    </section>
                </div>
            </section>

            <!-- Category -->
            <section class="mb-12 flex gap-6 md:flex-row flex-col px-6 md:px-0">
                <div class="md:w-[30%]">
                    <h5 class="">Select Category</h5>
                    <p class="text-sm text-gray-500 dark:text-gray-300">Categories like showroom, studio, SOHO</p>
                </div>
                <div class="md:w-[70%] rounded-xl md:shadow flex-col flex gap-6 md:p-6 w-full">
                    <div class="relative">
                        <label class="">Select Category</label>
                        <select class="bg-white border border-gray-200 p-3 rounded-lg w-full text-sm" v-model="form.category_id">
                            <option class="text-sm" v-for="category in categories" :key="category" :value="category.id">{{ category.title }}</option>
                        </select>
                    </div>
                </div>
            </section>

            <!-- Image Gallery -->
            <section class="flex gap-6 md:flex-row flex-col px-6 md:px-0">
                <div class="md:w-[30%]">
                    <h5 class="dark:text-gray-200">Image Gallery</h5>
                    <p class="text-sm text-gray-500 dark:text-gray-300">Upload Upto 10 Image. <br/> <small>Format must be .jpg, .jpeg, .png</small></p>
                </div>
                <div class="md:w-[70%] shadow rounded-xl flex-col flex gap-6 p-6">
                    <section class="flex gap-6 md:flex-row flex-col">
                        <div class="w-full flex-col flex gap-6">
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
                                <figure v-for="(image, index) in preview" :key="index" class="w-full relative overflow-hidden">
                                    <img :src="`https://srkaxgtxygietqipfctd.supabase.co/storage/v1/object/public/gallery/${image}`" alt="" class="border w-full h-44 object-cover rounded-xl">
                                    <button @click="deleteImage(index, image)" class="border rounded-lg bg-gray-900 text-white w-full py-1 text-xs">
                                        Delete
                                        <Icon name="material-symbols:delete-outline" class="h-4 w-4" />
                                    </button>
                                </figure>
                            </div>
                        </div>
                    </section>
                </div>
            </section>

            <section class="flex justify-end px-6 pb-12">
                <button 
                    class="bg-gray-800 text-white py-3 px-12 rounded-lg mt-6 w-full md:w-auto flex items-center gap-2"
                    type="submit" 
                    @click.prevent="saveData"
                > 
                    <Icon v-if="loading" name="line-md:loading-twotone-loop" class="w-5 h-5" /> 
                    {{ loading ? 'Saving...' : 'Add Franchise'  }}
                </button>
            </section>

        </div>
        
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

    const loading = ref(false)
    const categories = ref([])

    const src = ref('')
    const files = ref([])
 
    const preview = ref([])

    const slug = ref('')

    const prices = [
        '10,000 - 50,000',
        '50,000 - 2 Lac',
        '2 Lac - 5 Lac',
        '5 Lac - 10 Lac',
        '10 Lac - 20 Lac',
        '20 Lac - 30 Lac',
        '30 Lac - 50 Lac',
        '50 Lac - 1 Cr',
        '1 Cr - 2 Cr',
        '2 Cr - 5 Cr',
        'Above 5 Cr',
    ]

    const form = { 
        title: '',
        slug: slug.value,
        category_id:    '',
        description: '',
        area_required: '',
        investment_size: '',
        number_of_outlet: '',
        establishment_year: '',
        operation_started_on: '',
        franchise_started_on: '',
        floor_area_required: '',
        preferred_location: '',
        type_of_property_required: '',
        operating_manuals_for_franchisees: '',
        franchisee_training_location: '',
        field_assistance_available_for_franchisee: '',
        expert_guidance: '',
        it_system_will_be_included: '',
        standard_franchise_agreement: '',
        how_long_is_the_franchise_term: '',
        is_term_renewable: '',
        images:  preview.value,
    };

    const saveData = async () => {
        convertToSlug()
        try {
            loading.value = true;
            const { error } = await supabase
                .from('franchise')
                .insert({ 
                    title:                              form.title,
                    slug:                               slug.value,
                    category_id:                        form.category_id,
                    description:                        form.description,
                    area_required:                      form.area_required,
                    investment_size:                    form.investment_size,
                    number_of_outlet:                   form.number_of_outlet,
                    establishment_year:                 form.establishment_year,
                    operation_started_on:               form.operation_started_on,
                    franchise_started_on:               form.franchise_started_on,
                    floor_area_required:                form.floor_area_required,
                    preferred_location:                 form.preferred_location,
                    type_of_property_required:          form.type_of_property_required,
                    operating_manuals_for_franchisees:  form.operating_manuals_for_franchisees,
                    franchisee_training_location:       form.franchisee_training_location,
                    field_assistance_available_for_franchisee: form.field_assistance_available_for_franchisee,
                    expert_guidance:                    form.expert_guidance,
                    it_system_will_be_included:         form.it_system_will_be_included,
                    standard_franchise_agreement:       form.standard_franchise_agreement,
                    how_long_is_the_franchise_term:     form.how_long_is_the_franchise_term,
                    is_term_renewable:                  form.is_term_renewable,
                    images:                             form.images,
                })   
        } catch (error) {
            console.log(error)
        } finally {
            loading.value = false;
            
            form.title = '',
            form.category_id = '',
            form.description = '',
            form.area_required = '',
            form.investment_size = '',
            form.number_of_outlet = '',
            form.establishment_year = '',
            form.operation_started_on = '',
            form.franchise_started_on = '',
            form.floor_area_required = '',
            form.preferred_location = '',
            form.type_of_property_required = '',
            form.operating_manuals_for_franchisees = '',
            form.franchisee_training_location = '',
            form.field_assistance_available_for_franchisee = '',
            form.expert_guidance = '',
            form.it_system_will_be_included = '',
            form.standard_franchise_agreement = '',
            form.how_long_is_the_franchise_term = '',
            form.is_term_renewable = '',
            form.images = [],
            preview.value = []

            toast.success("Successfully Added", {
                timeout: 2000,
                position: POSITION.TOP_CENTER
            });
        }
    }

    const { data, error } = await supabase
        .from('category')
        .select()
        if(data){
            categories.value = data
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
                preview.value.push(result)
            }
        } catch (error) {
            alert(error.message)
        } finally {
            
        }
    }

    const deleteImage = async (index, file) => {
        preview.value.splice(index, 1)
        const { data, error } = await supabase
            .storage
            .from('gallery')
            .remove(file)
    }
    
    const convertToSlug = () => {
        // cache the variable
        var theSlug = form.title

        // Convert To Lowercase
        theSlug = theSlug.toLowerCase();

        // Replace White Spaces With Dashes
        theSlug = theSlug.replace(/\s+/g, '-')

        // Replace Ampersand With Dash and Space
        theSlug = theSlug.replace(/&/g, 'and')
        // Result
        const result = Math.random().toString(36).substring(2,6);
        form.slug = result+'-'+theSlug
    }

</script>

<style scoped>
label{
    font-size: 13px;
}
</style>