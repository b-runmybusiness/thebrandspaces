<template>
    <div class='flex items-center gap-2'>
        <ul class="w-full mt-8 border-b md:border-b-0 pb-8 md:flex gap-3 items-center md:pb-0 md:mt-0">
            <li class="hover:bg-zinc-100 rounded-xl text-sm w-full flex items-center" v-for="link in links" :key="link">
                <NuxtLink 
                    :to="link.href"  
                    @click="$emit('closeNavbar')" 
                    class="w-full px-8 md:px-3 py-1" 
                >
                    {{ link.title }}
                </NuxtLink>
            </li>
            <li class="hover:bg-zinc-100 rounded-xl text-sm w-full">
                <a href="https://franchisedestiny.com/" target="_blank" rel="noopener noreferrer" class="w-full px-8 md:px-3 py-1">Franchise</a>
            </li>
        </ul>
    </div>
</template>

<script setup>
    const links = ref([
        {title: 'Home', href: '/'},
        {title: 'Leasing', href: '/leasing'},
        {title: 'Blogs', href: '/blog'},
        {title: 'Contact', href: '/contact'},
    ])
</script>

<style>

</style>