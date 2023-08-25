<template>
    <div class="p-12">
        <div class="grid grid-cols-2 gap-5">
            <div class="w-full py-12 rounded-xl shadow flex flex-col justify-center items-center">
                <span class="text-[3em] font-bold">{{count}}</span>
                Leasings
            </div>
            <div class="w-full py-12 rounded-xl shadow flex flex-col justify-center items-center">
                <span class="text-[3em] font-bold">{{fcount}}</span>
                Franchise
            </div>
            <div class="w-full py-12 rounded-xl shadow flex flex-col justify-center items-center">
                <span class="text-[3em] font-bold">{{lcount}}</span>
                Contact Leads
            </div>
            <div class="w-full py-12 rounded-xl shadow flex flex-col justify-center items-center">
                <span class="text-[3em] font-bold">{{catcount}}</span>
                Categories
            </div>
        </div>
    </div>
</template>

<script setup>
    const supabase = useSupabaseClient()

    definePageMeta({
        layout: 'admin'
    })
    
    const { count } = await supabase
        .from('leasing')
        .select('*', { count: 'exact', head: true })
    const { fcount } = await supabase
        .from('franchise')
        .select('*', { count: 'exact', head: true })
    const { lcount } = await supabase
        .from('contact')
        .select('*', { count: 'exact', head: true })
    const { catcount } = await supabase
        .from('category')
        .select('*', { count: 'exact', head: true })

</script>

<style>

</style>