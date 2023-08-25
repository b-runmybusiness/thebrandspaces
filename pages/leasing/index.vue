<template>
  <section class="p-12">
    <div class="grid md:grid-cols-4 gap-6" >
      <NuxtLink 
        :to="`/leasing/${leasing.slug}`" 
        class="bg-white shadow rounded-lg" 
        v-for="leasing in leasings" 
        :key="leasing.id" 
      > 
          <template v-if="leasing.images">
              <figure 
                  class="overflow-hidden md:h-[30vh] h-[28vh] w-full rounded-xl"
                  v-for="image in leasing.images.slice(0, 1)"
                  :key="image.id"
                  >
                  <img :src="`https://srkaxgtxygietqipfctd.supabase.co/storage/v1/object/public/gallery/${image}`" :alt="leasing.title" class="h-full w-full object-cover hover:scale-125 hover:rotate-3 transition duration-700 ease-in-out cursor-pointer" />
              </figure>
          </template>
          <template v-else>
              <img src="/placeholder.jpg" alt="runmybusiness-placeholder-image hover:scale-125 hover:rotate-3 transition duration-700 ease-in-out cursor-pointer" class="overflow-hidden md:h-[30vh] h-[28vh] w-full rounded-xl">
          </template>
          <div class="p-3">
              <h2 class="text-lg font-bold" v-if="leasings">{{ leasing.title }}</h2>
              <div class="flex items-center justify-between text-sm">
                  <!-- <div class="flex">
                      <span class="text-xs" v-if="leasing.category">{{ leasing.category.title }}</span>
                  </div> -->
                  <div class="flex items-center gap-1" v-if="leasing.location">
                      {{ leasing.location }}
                  </div>
              </div>
          </div>
      </NuxtLink>
    </div>

    <div class="mt-6 flex justify-end">
      <button @click="loadMore" class="bg-gray-800 rounded px-4 py-2 text-white text-sm">Load more</button>
    </div>
  </section>
  

</template>

<script setup>
    const client = useSupabaseClient()
    const page = ref(3)
    const leasings = ref([])

    const fetchData = async () => {
      let { data, error } = await client
        .from('leasing')
        .select(`
            id,
            title,
            slug,
            location,
            images,
            created_at,
            category(
              title
            )
        `)
        .order('id', { ascending: false })
        .range(0, page.value)
      
        leasings.value = data
    }
    fetchData()
    
    const loadMore = async () => {
      page.value += 2;
      fetchData()
    }

</script>

<style>

</style>