<template>
    <div class="relative min-h-screen">

        <div v-if="loading" class='max-w-6xl w-full mx-auto bg-gray-100 rounded-xl'>
            <div class='flex flex-col w-full animate-pulse h-full'>
                <div class='md:h-[70vh] w-full rounded-xl bg-zinc-200'></div>
                <div class='h-full w-full flex flex-col p-6 gap-4'>
                    <div class='h-4 bg-zinc-200 rounded-full w-full'></div>
                    <div class='h-4 bg-zinc-200 rounded-full w-full'></div>
                    <div class='h-4 bg-zinc-200 rounded-full w-full'></div>
                    <div class='h-4 bg-zinc-200 rounded-full w-full'></div>
                </div>
            </div>
        </div>

        <section v-else class="max-w-6xl w-full mx-auto">

            <section class="relative" v-if="franchise">
                <img v-if="franchise.images" :src="URL+franchise.images[0]" preload class="w-full md:h-[70vh] object-cover" />
                <img v-else src="/placeholder.jpg" alt="runmybusiness-placeholder-image" class="w-full md:h-[70vh] object-cover" preload />
                <button class="absolute top-3 left-4 bg-white/75 px-2 py-1.5 rounded text-xs text-gray-900 items-center flex gap-1" @click.prevent="$router.back()">
                    <Icon name="ic:sharp-keyboard-backspace" class="w-5 h-5" />
                </button>
                <button
                    type="button"
                    @click="openModal"
                    class="rounded-md bg-black/50 px-4 py-2 text-sm font-medium text-white  absolute bottom-2 right-2">
                    View more
                </button>
            </section>

            <!-- gallery viewer -->
            <TransitionRoot appear :show="imagePreviewer" as="template">
                <Dialog as="div" @close="closeModal" class="relative z-10">
                    <TransitionChild
                        as="template"
                        enter="duration-300 ease-out"
                        enter-from="opacity-0"
                        enter-to="opacity-100"
                        leave="duration-200 ease-in"
                        leave-from="opacity-100"
                        leave-to="opacity-0"
                    >
                        <div class="fixed inset-0 bg-black/50 backdrop-blur-sm" />
                    </TransitionChild>

                    <div class="fixed inset-0 overflow-y-auto">
                        <div class="flex min-h-full items-center justify-center text-center w-auto cursor-pointer">
                            <TransitionChild
                                as="template"
                                enter="duration-300 ease-out"
                                enter-from="opacity-0 scale-95"
                                enter-to="opacity-100 scale-100"
                                leave="duration-200 ease-in"
                                leave-from="opacity-100 scale-100"
                                leave-to="opacity-0 scale-95"
                            >
                                <DialogPanel class="w-auto transform overflow-hidden text-left h-full align-middle transition-all">
                                    <Swiper
                                        :modules="[SwiperAutoplay, SwiperEffectCreative]"
                                        :slides-per-view="0.9"
                                        :loop="false"
                                        class="overflow-hidden h-full w-auto"
                                    >
                                        <SwiperSlide 
                                            v-for="image in franchise.images"
                                            :key="image"
                                            class="h-full w-full object-contain"
                                        >
                                            <div class='card-media h-full w-full object-contain'>
                                                <img :src="URL+image" :alt="franchise.title" class="h-full w-full object-contain" preload  />
                                            </div>
                                        </SwiperSlide>
                                    </Swiper>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                        <button @click="closeModal" class="absolute top-0 right-0 z-40 bg-zinc-300 px-6 py-1 rounded-bl-xl">X</button>
                    </div>
                </Dialog>
            </TransitionRoot>

            <div class="flex flex-col md:flex-row py-6 md:gap-6">
                <div class="md:w-[65%]">
                    <!-- Basic -->
                    <section class="section about">
                        <h1 class="text-2xl mb-4">{{ franchise.title }}</h1>
                        <p  class="text-sm">{{ franchise.description }}</p>
                    </section>

                    <!-- Brief columns -->
                    <section class="section">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="flex items-center gap-3">
                                <button class="border rounded-xl w-16 h-16">
                                    <Icon name="lucide:bed-double" class="w-5 h-5" />
                                </button>
                                <div>
                                    <div class="font-semibold">Area Required</div>
                                    <div class="text-sm text-zinc-600">{{ franchise.area_required }} Sq.ft</div>
                                </div>
                            </div>
                            <div class="flex items-center gap-3">
                                <button class="border rounded-xl w-16 h-16">
                                    <Icon name="lucide:bed-double" class="w-5 h-5" />
                                </button>
                                <div>
                                    <div class="font-semibold">Investment Size</div>
                                    <div class="text-sm text-zinc-600">{{ franchise.investment_size }}</div>
                                </div>
                            </div>
                            <div class="flex items-center gap-3">
                                <button class="border rounded-xl w-16 h-16">
                                    <Icon name="lucide:bed-double" class="w-5 h-5" />
                                </button>
                                <div>
                                    <div class="font-semibold">No. of Franchise Outlet</div>
                                    <div class="text-sm text-zinc-600">{{ franchise.number_of_outlet }}</div>
                                </div>
                            </div>
                            <div class="flex items-center gap-3">
                                <button class="border rounded-xl w-16 h-16">
                                    <Icon name="lucide:bed-double" class="w-5 h-5" />
                                </button>
                                <div>
                                    <div class="font-semibold">Establishment Year</div>
                                    <div class="text-sm text-zinc-600">{{ franchise.establishment_year }}</div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <!-- Investment Details -->
                    <section class="section">
                        <h2 class="uppercase font-bold text-xl border-b pb-3 mb-6">Investment Details</h2>
                        <!-- Franchise Details -->
                        <div class="mb-6">
                            <h3 class="font-bold mb-2">Franchise Details</h3>
                            <div class="flex justify-between text-sm py-1">
                                <div>Operations Commenced On</div>
                                <div>{{ franchise.establishment_year }}</div>
                            </div>
                            <div class="flex justify-between text-sm py-1">
                                <div>Franchise Stared On</div>
                                <div>{{ franchise.franchise_started_on }}</div>
                            </div>
                        </div>
                    </section>

                    <!-- Property Details -->
                    <section class="section">
                        <h3 class="font-bold mb-2 border-b pb-3">Property Details</h3>
                        <div class="flex justify-between text-sm py-1 w-full">
                            <div class="w-full">Type of property required for this franchise opportunity</div>
                            <div class="w-full text-right">{{ franchise.type_of_property_required }}</div>
                        </div>
                        <div class="flex justify-between text-sm py-1 w-full">
                            <div class="w-full">Floor area requirement</div>
                            <div class="w-full text-right">{{ franchise.floor_area_required }} Sq.ft</div>
                        </div>
                        <div class="flex justify-between text-sm py-1 w-full">
                            <div class="w-full">Preferred location of unit franchise outlet</div>
                            <div class="w-full text-right">{{ franchise.preferred_location }}</div>
                        </div>
                    </section>

                    <!-- Training Details -->
                    <section class="section">
                        <h3 class="font-bold mb-2 border-b pb-3">Training Details</h3>
                        <div class="flex justify-between text-sm py-1 w-full">
                            <div class="w-full">Detailed operating manuals for franchisees</div>
                            <div class="w-full text-right">{{ franchise.operating_manuals_for_franchisees }}</div>
                        </div>
                        <div class="flex justify-between text-sm py-1 w-full">
                            <div class="w-full">Franchisee training location</div>
                            <div class="w-full text-right">{{ franchise.franchisee_training_location }}</div>
                        </div>
                        <div class="flex justify-between text-sm py-1 w-full">
                            <div class="w-full">Is field assistance available for franchisee?</div>
                            <div class="w-full text-right">{{ franchise.field_assistance_available_for_franchisee }}</div>
                        </div>
                        <div class="flex justify-between text-sm py-1 w-full">
                            <div class="w-full">Expert guidance from Head Office to franchisee in opening the franchise</div>
                            <div class="w-full text-right">{{ franchise.expert_guidance }}</div>
                        </div>
                        <div class="flex justify-between text-sm py-1 w-full">
                            <div class="w-full">Current IT System will be included in the franchise</div>
                            <div class="w-full text-right">{{ franchise.it_system_will_be_included }}</div>
                        </div>
                    </section>

                    <!-- Agreement and Terms Details -->
                    <section class="section">
                        <h3 class="font-bold mb-2 border-b pb-3">Agreement &amp; Terms Details</h3>
                        <div class="flex justify-between text-sm py-1 w-full">
                            <div class="w-full">Do you have a standard franchise agreement?</div>
                            <div class="w-full text-right">{{ franchise.standard_franchise_agreement }}</div>
                        </div>
                        <div class="flex justify-between text-sm py-1 w-full">
                            <div class="w-full">How long is the franchise term for?</div>
                            <div class="w-full text-right">{{ franchise.how_long_is_the_franchise_term }} Years</div>
                        </div>
                        <div class="flex justify-between text-sm py-1 w-full">
                            <div class="w-full">Is the term renewable?</div>
                            <div class="w-full text-right">{{ franchise.is_term_renewable }}</div>
                        </div>
                    </section>
                </div>

                <!-- Contact form - aside -->
                <aside class="hidden md:block w-[35%]">
                    <CallbackForm />
                </aside>
            </div>

            <!-- mobile-contactForm-button -->
            <button class="fixed bottom-2 right-2 md:hidden rounded-xl h-12 w-12 flex items-center justify-center bg-[#DA251D] text-white" @click="contactForm = true">
                <Icon name="ic:twotone-wechat" class="w-8 h-8" />
            </button>
        </section>
        
        <!-- mobile Contact form - Mobile Screen Only -->
        <section class="fixed md:hidden top-16 border-t-2 left-0 bottom-0 w-full h-screen bg-white" v-if="contactForm">
            <div class="bg-white p-6 rounded-xl">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="">Insta Apply</h2>
                    <button @click="contactForm = false" class="text-xs bg-zinc-700 text-white w-6 h-6 rounded flex items-center justify-center">
                        <Icon name="material-symbols:close-rounded" />
                    </button>
                </div>
                <CallbackForm />
            </div>
        </section>

    </div>
</template>

<script setup>
    import {
        TransitionRoot,
        TransitionChild,
        Dialog,
        DialogPanel,
        DialogTitle,
    } from '@headlessui/vue'
    const supabase = useSupabaseClient()

    const route = useRoute();
    
    const URL = "https://fcxbrpopspdlwnyangsb.supabase.co/storage/v1/object/public/gallery/";

    const contactForm = ref(false)
    const visibleRef = ref(false)

    const franchise = ref({})
    const imagePreviewer = ref(false)

    function closeModal() {
        imagePreviewer.value = false
    }
    function openModal() {
        imagePreviewer.value = true
    }

    const fetchData = async () => {
        const {data} = await supabase
            .from('franchise')
            .select(`
                id,
                title,                           
                slug,                               
                category_id,                        
                description,                        
                area_required,                      
                investment_size,                    
                number_of_outlet,                   
                establishment_year,                 
                operation_started_on,               
                franchise_started_on,               
                floor_area_required,                
                preferred_location,                 
                type_of_property_required,          
                operating_manuals_for_franchisees,  
                franchisee_training_location,       
                field_assistance_available_for_franchisee, 
                expert_guidance,                    
                it_system_will_be_included,         
                standard_franchise_agreement,       
                how_long_is_the_franchise_term,     
                is_term_renewable,                  
                images,                             
                category(
                    title
                )
            `)
            .eq('slug', route.params.slug)
        franchise.value = data[0]
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
        /* width: 600px;
        height: 300px; */
        width: 100%;
        height: 100%;
    }
</style>