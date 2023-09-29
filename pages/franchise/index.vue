<template>
    <!-- All franchise -->
    <section class="max-w-6xl mx-auto p-6 md:py-20">

        <template v-if="franchises.length">
            <div class="grid md:grid-cols-3 gap-6">
                <NuxtLink :to="`/franchise/${list.slug}`" v-for="list in franchises" :key="list.id">
                    <template v-if="list.images.length">
                        <figure 
                            class="overflow-hidden md:h-[40vh] h-[28vh] w-full rounded-xl"
                            v-for="image in list.images.slice(0, 1)"
                            :key="image.id"
                            >
                            <img :src="`https://fcxbrpopspdlwnyangsb.supabase.co/storage/v1/object/public/gallery/${image}`" :alt="list.title" class="h-full w-full object-cover hover:scale-125 hover:rotate-3 transition duration-700 ease-in-out cursor-pointer" loading="lazy"  />
                        </figure>
                    </template>
                    <template v-else>
                        <img src="/placeholder.jpg" alt="runmybusiness-placeholder-image" class="overflow-hidden md:h-[40vh] h-[28vh] w-full rounded-xl" loading="lazy"  />
                    </template>
                    <h2 class="text-sm md:text-xl font-bold mt-2 md:mt-4 text-gray-800">{{ list.title }}</h2>
                    <div class="flex justify-between text-xs md:text-sm text-gray-700">
                        <h3 class="">Investment range</h3>
                        <span>{{ list.investment_size }}</span>
                    </div>
                    <div class="flex justify-between text-xs md:text-sm text-gray-700">
                        <h3 class="">Area Required</h3>
                        <span>{{ list.area_required }}</span>
                    </div>
                </NuxtLink>
            </div>
        </template>
        <template v-else>
            <p>No Franchise Found!</p>
        </template>

        <div class="mt-6 flex justify-end">
          <button @click="loadMore" class="bg-gray-800 rounded px-4 py-2 text-white text-sm">Load more</button>
        </div>
    </section>
</template>

<script setup>
    const client = useSupabaseClient()
    const page = ref(3)

    const URL = "https://d251pozxe7k40y.cloudfront.net/gallery/";

    const franchises = ref([])

    const fetchData = async () => {
      let { data, error } = await client
        .from('franchise')
        .select(`
            id,
            title,
            slug,
            images,
            created_at,
            category(
              title
            )
        `)
        .order('id', { ascending: false })
        .range(0, page.value)
      
        franchises.value = data
    }
    fetchData()
    
    const loadMore = async () => {
      page.value += 2;
      fetchData()
    }
</script>

<style scoped>

</style>