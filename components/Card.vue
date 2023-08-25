<template>
    <div class='card rounded-xl py-8 px-14 dark:text-zinc-200 text-zinc-800 dark:bg-zinc-800 bg-white shadow'>
        <div class='card-title text-lg mb-2 font-bold'>{{ leasing.title }}</div>
        <div class='card-body text-sm'>A quick brown fox jumps over the lazy dog</div>
        <div class='card-actions flex mt-4'>
            <button class='dark:bg-zinc-900 dark:text-white text-zinc-800 bg-zinc-200 text-sm rounded-lg p-3 ml-auto'>Catch now</button>
        </div>
    </div>
</template>

<script setup>
    defineProps({
        leasing: {
            type: Object,
        }
    })
</script>

<style>

</style>