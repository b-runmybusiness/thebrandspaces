<template>
    <div>
        <div class="">
            <header class="px-8 flex items-center justify-between border-b py-3">
                <NuxtLink to="/admin/leasing" class="py-1 rounded text-sm flex items-center gap-1">
                    <Icon name="ic:outline-keyboard-backspace" />
                    back
                </NuxtLink>
                <h3 class="font-bold"># Add Leasing</h3>
            </header>
            <div class="grid md:grid-cols-2 gap-8 p-8">
                <section class="w-full space-y-6">
                    <div class="relative">
                        <label class="">Select Category</label>
                        <select class="bg-white border border-gray-200 p-3 rounded-lg w-full text-sm" v-model="form.category_id">
                            <option class="text-sm" v-for="category in categories" :key="category" :value="category.id">{{ category.title }}</option>
                        </select>
                    </div>
                    <div class="relative">
                        <label class="">Title</label>
                        <TextInput v-model="form.title" placeholder="Name" />
                    </div>
                    <div class="relative">
                        <label class="">Description</label>
                        <TextArea v-model="form.description" rows="5" placeholder="Description" />
                    </div>
                </section>
                <section class="w-full">
                    <div class="rounded-xl flex-col flex w-full">
                        <div class="grid grid-cols-1 gap-5">
                            <div class="relative">
                                <label class="">Property Status</label>
                                <select class="bg-white border border-gray-200 p-3 rounded-lg w-full text-sm" v-model="form.propertyStatus">
                                    <option value="under construction" selected>Under Construction</option>
                                    <option value="ready to move">Ready To Move</option>
                                </select>
                            </div>
                            <div class="relative">
                                <label>Property Type</label>
                                <select class="bg-white border border-gray-200 p-3 rounded-lg w-full text-sm" v-model="form.propertyType">
                                    <option value="residential" selected>Residential</option>
                                    <option value="commercial">Commercial</option>
                                </select>
                            </div>
                            <div class="relative">
                                <label class="">City Name</label>
                                <TextInput v-model="form.location" placeholder="City Name" />
                            </div>
                            <div class="relative">
                                <label class="">Complete Address</label>
                                <TextInput v-model="form.address" placeholder="Complete Address" />
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

            <section class="flex justify-end px-12">
                <button 
                    class="bg-gray-800 text-white py-3 px-12 rounded-lg mt-6 w-full md:w-auto flex items-center gap-2"
                    type="submit" 
                    @click.prevent="saveData"
                > 
                    <Icon v-if="loading" name="line-md:loading-twotone-loop" class="w-5 h-5" /> 
                    {{ loading ? 'Saving...' : 'Add Leasing'  }}
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

    const form = {
        title:          '',
        slug:          slug.value,
        description:    '',
        propertyType:   '',
        propertyStatus: '',
        category_id:    '',
        category_title: '',
        location:       '',
        address:        '',
        images:         preview.value,
        user_id: user.value.id,
    };

    const saveData = async () => {
        convertToSlug()
        try {
            loading.value = true;
            const { error } = await supabase
                .from('leasing')
                .insert({ 
                    title:          form.title,
                    slug:           form.slug,
                    description:    form.description,
                    propertyType:   form.propertyType,
                    propertyStatus: form.propertyStatus,
                    category_id:    form.category_id,
                    category_title: form.category_title,
                    location:       form.location,
                    address:        form.address,
                    images:         form.images,
                })   
        } catch (error) {
            console.log(error)
        } finally {
            loading.value = false;
            
            form.title = '',
            form.description = '',
            form.propertyType = '',
            form.propertyStatus = '',
            form.category_id = '',
            form.category_title = '',
            form.location = '',
            form.address = ''
            form.images = []
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

<style>

</style>