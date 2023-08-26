<template>
    <button @click="menuSidebar = true" class="pr-3 md:pr-0 block md:hidden">
        <Icon name="heroicons:bars-3-bottom-right-20-solid" class="w-6 h-6" />
    </button>

    <!-- menu sidebar -->
    <Transition name="slide-fade">
        <aside class="fixed right-0 top-0 bg-white w-full md:w-[25vw] bg-white h-full z-40 shadow overflow-y-auto" v-if="menuSidebar">
            <button class="bg-zinc-800 text-white h-12 w-20 flex items-center justify-center" @click="menuSidebar = false">
                <Icon name="material-symbols:close" class="w-6 h-6" />
            </button>

            <ul class="w-full mt-8 border-b pb-4">
                <li class="hover:bg-zinc-100 text-sm w-full flex items-center" v-for="link in links" :key="link">
                    <NuxtLink 
                        :to="link.href"  
                        @click="$emit('closeNavbar')" 
                        class="px-10 py-2" 
                    >
                        {{ link.title }}
                    </NuxtLink>
                </li>
                <li class="hover:bg-zinc-100 text-sm w-full flex items-center">
                    <a href="https://franchisedestiny.com/" target="_blank" rel="noopener noreferrer" class="px-10 py-2">Franchise Division</a>
                </li>
            </ul>

            <ul class="w-full mt-4 border-b pb-4 hidden">
                <h3 class="px-10 py-2 font-bold">Franchise Categories</h3>
                <li class="px-10 py-2 hover:bg-zinc-100 text-sm">Automotive</li>
                <li class="px-10 py-2 hover:bg-zinc-100 text-sm">Beauty & Health</li>
                <li class="px-10 py-2 hover:bg-zinc-100 text-sm">Business Services</li>
                <li class="px-10 py-2 hover:bg-zinc-100 text-sm">Dealers & Distributors</li>
                <li class="px-10 py-2 hover:bg-zinc-100 text-sm">Education</li>
                <li class="px-10 py-2 hover:bg-zinc-100 text-sm">Fashion</li>
                <li class="px-10 py-2 hover:bg-zinc-100 text-sm">Food And Beverage</li>
                <li class="px-10 py-2 hover:bg-zinc-100 text-sm">Home Based Business</li>
                <li class="px-10 py-2 hover:bg-zinc-100 text-sm">Hotel, Travel & Tourism</li>
                <li class="px-10 py-2 hover:bg-zinc-100 text-sm">Retail</li>
                <li class="px-10 py-2 hover:bg-zinc-100 text-sm">Sports, Fitness & Entertainment</li>
            </ul>

            <div class="flex w-full p-5 justify-evenly">
                <Icon name="iconoir:facebook-tag" class="w-6 h-6" />
                <Icon name="bi:instagram" class="w-6 h-6" />
                <Icon name="jam:twitter-square" class="w-6 h-6" />
                <Icon name="iconoir:youtube" class="w-6 h-6" />
            </div>
        </aside>
    </Transition>
</template>

<script setup>
    const menuSidebar = ref(false)
    const links = ref([
        {title: 'Home', href: '/'},
        {title: 'Leasing', href: '/leasing'},
        // {title: 'Blogs', href: '/blog'},
        {title: 'Contact', href: '/contact'},
    ])
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.5s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 1;
}
</style>