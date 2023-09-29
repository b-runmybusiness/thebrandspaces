<template>
    <div class='flex items-center gap-2 w-full'>
        <button v-for="link in links" :key="link" class="w-full flex items-center justify-center">
            <NuxtLink 
                :to="link.href"  
                @click="$emit('closeNavbar')" 
                class="w-32 py-1 text-sm" 
                >
                {{ link.title }}
            </NuxtLink>
        </button>
        <!-- <button class="w-full flex items-center justify-center">
            <a href="https://franchisedestiny.com/" target="_blank" rel="noopener noreferrer" class="w-32 py-1 text-sm hover:border-b">Business Franchise</a>
        </button> -->
    </div>
</template>

<script setup>
    const links = ref([
        {title: 'Home', href: '/'},
        {title: 'Space Leasing', href: '/leasing'},
        // {title: 'Blogs', href: '/blog'},
        {title: 'Contact', href: '/contact'},
    ])
</script>

<style>

</style>