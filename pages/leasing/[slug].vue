<template>
    <div class="relative min-h-screen">

        <!-- <div class='max-w-6xl w-full mx-auto bg-gray-100 rounded-xl'>
            <div class='flex flex-col w-full animate-pulse h-full'>
                <div class='md:h-[70vh] w-full rounded-xl bg-zinc-200'></div>
                <div class='h-full w-full flex flex-col p-6 gap-4'>
                    <div class='h-4 bg-zinc-200 rounded-full w-full'></div>
                    <div class='h-4 bg-zinc-200 rounded-full w-full'></div>
                    <div class='h-4 bg-zinc-200 rounded-full w-full'></div>
                    <div class='h-4 bg-zinc-200 rounded-full w-full'></div>
                </div>
            </div>
        </div> -->

        <section class="max-w-6xl w-full mx-auto" v-if="leasing">
            <!-- <template v-if="leasing.images.length">
                <figure 
                    class="rounded-xl overflow-hidden md:h-[60vh] relative" 
                    v-for="image in leasing.images.slice(0, 1)"
                    :key="image.id"
                >
                    <img 
                        :src="URL+image.path" :alt="leasing.title"
                        lazy-src="/placeholder.png"
                        class="w-full h-full object-cover">
                
                    <div @click="showMultiple" class="cursor-pointer absolute md:right-6 md:bottom-6 right-2 bottom-2 rounded-lg overflow-hidden bg-gray-900/50 text-gray-100 flex items-center justify-center h-10 w-20" v-if="leasing.images.length === 1">
                        {{leasing.images.length}}+
                    </div>
                </figure>
            </template> -->

            <section class="relative">
                <template v-if="leasing.images">
                    <img :src="`https://srkaxgtxygietqipfctd.supabase.co/storage/v1/object/public/gallery/${leasing.images[0]}`" preload class="w-full md:h-[70vh] object-cover" />
                </template>
                <img v-else src="/placeholder.jpg" alt="runmybusiness-placeholder-image" class="w-full md:h-[70vh] object-cover" preload />
                <button class="absolute top-3 left-4 bg-white/75 px-2 py-1.5 rounded text-xs text-gray-900 items-center flex gap-1" @click.prevent="$router.back()">
                    <Icon name="ic:sharp-keyboard-backspace" class="w-5 h-5" />
                </button>
            </section>

            <div class="flex flex-col md:flex-row py-6 md:gap-10">
                <div class="md:w-[65%]">
                    <!-- Basic -->
                    <section class="section about">
                        <h1 class="text-2xl mb-4">{{ leasing.title }}</h1>
                        <p  class="text-sm">{{ leasing.description }}</p>
                    </section>

                    <!-- Brief columns -->
                    <section class="section">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="flex items-center gap-3">
                                <button class="border rounded-xl w-16 h-16">
                                    <Icon name="lucide:bed-double" class="w-5 h-5" />
                                </button>
                                <div>
                                    <div class="font-semibold">Property Type</div>
                                    <div class="text-sm text-zinc-600">{{ leasing.propertyType }}</div>
                                </div>
                            </div>
                            <div class="flex items-center gap-3">
                                <button class="border rounded-xl w-16 h-16">
                                    <Icon name="lucide:bed-double" class="w-5 h-5" />
                                </button>
                                <div>
                                    <div class="font-semibold">Property Status</div>
                                    <div class="text-sm text-zinc-600">{{leasing.propertyStatus}}</div>
                                </div>
                            </div>
                            <div class="flex items-center gap-3">
                                <button class="border rounded-xl w-16 h-16">
                                    <Icon name="lucide:bed-double" class="w-5 h-5" />
                                </button>
                                <div>
                                    <div class="font-semibold">Category</div>
                                    <div class="text-sm text-zinc-600" v-if="leasing.category">{{ leasing.category.title }}</div>
                                </div>
                            </div>
                            <div class="flex items-center gap-3">
                                <button class="border rounded-xl w-16 h-16">
                                    <Icon name="lucide:bed-double" class="w-5 h-5" />
                                </button>
                                <div>
                                    <div class="font-semibold">Location</div>
                                    <div class="text-sm text-zinc-600">{{ leasing.location }}</div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <!-- Property Details -->
                    <section class="section">
                        <h3 class="font-bold mb-2 border-b pb-3">Address</h3>
                        <p>{{ leasing.address }}</p>
                    </section>
                </div>

                <!-- Contact form - aside -->
                <aside class="hidden md:block w-[35%]">
                    <CallbackForm />
                </aside>
            </div>

            <!-- mobile-contactForm-button -->
            <button class="fixed bottom-2 right-2 md:hidden rounded-xl h-12 w-12 flex items-center justify-center bg-primary text-white" @click="contactForm = true">
                <Icon name="ic:twotone-wechat" class="w-8 h-8" />
            </button>
        </section>
        </div>

        <!-- mobile Contact form - Mobile Screen Only -->
        <section class="fixed md:hidden top-0 left-0 bottom-0 w-full h-screen z-40 bg-white" v-if="contactForm">
        <div class="bg-white p-4">
            <div class="flex justify-end items-center mb-6 ">
                <button @click="contactForm = false" class="text-xs bg-zinc-700 text-white w-8 h-8 rounded flex items-center justify-center">
                    <Icon name="material-symbols:close-rounded" />
                </button>
            </div>
            <CallbackForm />
        </div>
        </section>
</template>

<script setup>
    const route = useRoute();
    const supabase = useSupabaseClient()
    
    const leasing = ref({})

    const fetchData = async () => {
        const {data} = await supabase
            .from('leasing')
            .select(`
                id,
                title,
                slug,
                description,
                location,
                propertyType,
                propertyStatus,
                address,
                images,
                created_at,
                category(
                    title
                )
            `)
            .eq('slug', route.params.slug)
        leasing.value = data[0]
    }
    fetchData()
</script>

<style scoped>
.section{
        margin-bottom: 26px;
        background: #ffffff;
        border-radius: 12px;
        padding: 20px;
    }
    .swiper {
        width: 600px;
        height: 300px;
    }
</style>