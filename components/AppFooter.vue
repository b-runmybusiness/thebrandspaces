<template>
    <footer class="py-4 bg-white sm:p-6 bg-white w-full md:flex">
      <div class="w-full max-w-6xl mx-auto">
          <div class="flex gap-6 w-full">
              <div class="w-full">
                  <img src="/logo.png" alt="" class="w-full h-24 object-contain">
                  <h3 class="text-xs mt-5 text-center">To Get Access To Over 100+ Franchise Business Opportunities.</h3>
              </div>
              <div class="w-full hidden md:block">
                  <h2 class="mb-4 text-sm font-semibold text-zinc-900 uppercase">Company</h2>
                  <ul class="text-zinc-600 dark:text-zinc-400 text-sm">
                      <li class="mb-3"><a href="#" class="hover:underline">About Us</a></li>
                      <li class="mb-3"><a href="#" class="hover:underline">Our Story</a></li>
                      <li class="mb-3"><a href="#" class="hover:underline">Mission &amp; Vision</a></li>
                      <li class="mb-3"><a href="#" class="hover:underline">Contact Us</a></li>
                  </ul>
              </div>
              <div class="w-full hidden md:block">
                  <h2 class="mb-4 text-sm font-semibold text-zinc-900 uppercase">Categories</h2>
                  <ul class="text-zinc-600 dark:text-zinc-400 text-sm">
                    <li class="mb-3" v-for="category in categories" :key="category">
                            <a href="#" class="hover:underline">{{ category.title }}</a>
                        </li>
                  </ul>
              </div>
              <div class="w-full hidden md:block">
                  <h2 class="mb-4 text-sm font-semibold text-zinc-900 uppercase">&nbsp;</h2>
                  <ul class="text-zinc-600 dark:text-zinc-400 text-sm">
                        
                  </ul>
              </div>
              <div class="w-full hidden md:block">
                  <h2 class="mb-4 text-sm font-semibold text-zinc-900 uppercase">Follow Us</h2>
                  <ul class="text-zinc-600 dark:text-zinc-400 text-sm">
                      <li class="mb-3"><a href="#" class="hover:underline">facebook</a></li>
                      <li class="mb-3"><a href="#" class="hover:underline">Twitter</a></li>
                      <li class="mb-3"><a href="#" class="hover:underline">Instagram</a></li>
                      <li class="mb-3"><a href="#" class="hover:underline">Youtube</a></li>
                  </ul>
              </div>
          </div>
      </div>
    </footer>
  </template>
  
<script setup>
    const supabase = useSupabaseClient()

    const categories = ref([])
    const { data, error } = await supabase
        .from('category')
        .select()
        if(data){
            categories.value = data
        }
</script>
  
  <style scoped></style>
  