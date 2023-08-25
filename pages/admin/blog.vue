<template>
    <div class="w-full h-full">

        <!-- Table Section -->
        <div class="w-full">
            <!-- Card -->
            <div class="flex flex-col">
                <div class="overflow-x-auto">
                    <div class="min-w-full inline-block align-middle">
                        <div class="bg-white overflow-hidden">
                            <!-- Header -->
                            <div class="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200">
                                <div>
                                    <h2 class="text-xl font-semibold text-gray-800 ">Blogs</h2>
                                    <p class="text-sm text-gray-600 dark:text-gray-400">Add blogs, edit and more.</p>
                                </div>

                                <div>
                                    <div class="inline-flex gap-x-2">
                                        <NuxtLink to="/admin/add-blog" class="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-gray-800 text-white text-sm">
                                            + Add Blog
                                        </NuxtLink>
                                    </div>
                                </div>
                            </div>
                            <!-- End Header -->

                            <!-- Table -->
                            <table class="min-w-full divide-y divide-gray-200">
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th scope="col" class="pl-6 pr-6 py-3 text-left">
                                            <div class="flex items-center gap-x-2">
                                                <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 ">
                                                Title
                                                </span>
                                            </div>
                                        </th>

                                        <th scope="col" class="px-6 py-3 text-left">
                                            <div class="flex items-center gap-x-2">
                                                <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 ">Address</span>
                                            </div>
                                        </th>

                                        <th scope="col" class="px-6 py-3 text-left">
                                            <div class="flex items-center gap-x-2">
                                                <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 ">Category</span>
                                            </div>
                                        </th>

                                        <th scope="col" class="px-6 py-3 text-left">
                                            <div class="flex items-center gap-x-2">
                                                <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 ">Created</span>
                                            </div>
                                        </th>
                                        <th scope="col" class="px-6 py-3 text-left">
                                            <div class="flex items-center gap-x-2">
                                                <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 ">Actions</span>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>

                                <tbody class="divide-y divide-gray-200">
                                    <tr v-for="post in posts" :key="post.id">
                                        <td class="h-px w-px whitespace-nowrap">
                                            <div class="pl-6 pr-6 py-3">
                                                <div class="flex items-center gap-x-3">
                                                    <div class="grow">
                                                        <span class="block text-sm font-semibold text-gray-800 ">{{ post.title }}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="h-px w-px whitespace-nowrap">
                                            <div class="px-6 py-3">
                                                <span class="text-sm text-gray-500">{{ post.created_at }}</span>
                                            </div>
                                        </td>
                                        <td class="h-px w-px whitespace-nowrap">
                                            <div class="pl-6 py-1.5 space-x-3">
                                                <a class="inline-flex items-center gap-x-1.5 text-sm text-blue-600 decoration-2 hover:underline font-medium" href="#">Edit</a>
                                                <button class="inline-flex items-center gap-x-1.5 text-sm text-blue-600 decoration-2 hover:underline font-medium" @click="deleteData(post.id)">Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <!-- End Table -->

                            <!-- Footer -->
                            <div class="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200">
                                <div>
                                    <p class="text-sm text-gray-600 dark:text-gray-400">
                                        <span class="font-semibold text-gray-800 ">{{ posts.length }}</span> results
                                    </p>
                                </div>
                                <div>
                                    <div class="inline-flex gap-x-2">
                                        <button type="button" class="py-2 px-3 flex justify-center items-center gap-1 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-100 transition-all text-sm" @click="loadMore">
                                            Load more
                                            <Icon name="material-symbols:fitbit-arrow-downward-rounded" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <!-- End Footer -->
                        </div>
                    </div>
                </div>
            </div>
            <!-- End Card -->
        </div>
        <!-- End Table Section -->
    </div>
</template>

<script setup>

    const supabase = useSupabaseClient()
    const user = useSupabaseUser()

    definePageMeta({
        layout: 'admin',
        middleware: 'auth'
    })
    const loading = ref(false)
    const categories = ref([])
    const posts = ref([])
    const limit = ref(8)

    const fetchLeasings = async () => {
        try {
            let { data } = await supabase
            .from('posts')
            .select('*')
            .order('id', { ascending: false })
            .limit(limit.value)
            
            posts.value = data
        } catch (error) {
            console.log(error)
        } finally {}
    }
    fetchLeasings()

    const loadMore = () => {
        limit.value += 4
        fetchLeasings()
    }

    // Delete Data
    const deleteData = async (id) => {
        await supabase
            .from('leasing')
            .delete()
            .eq('id', id)
        fetchLeasings()
    }

</script>

<style scoped>
label{
    font-size: 14px;
}
</style>