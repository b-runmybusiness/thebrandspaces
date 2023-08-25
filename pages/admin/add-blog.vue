<template>
  <div class="p-12">
    <div id="editor">
      <h1 class="text-3xl font-semibold tracking-wide mt-6">Create new post</h1>
      <input
        name="title"
        placeholder="Title"
        v-model="post.title"
        class="border-b pb-2 text-lg my-4 focus:outline-none w-full font-light text-gray-500 placeholder-gray-500 y-2"
      />
      <PlaygroundEditor />
      <button
        type="button"
        class="mb-4 w-full bg-blue-500 text-white font-semibold px-8 py-4"
        @click="createPost"
      >Create Post</button>
    </div>
  </div>
</template>

<script setup>
  import { MdEditor } from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';

  definePageMeta({
      layout: 'admin',
      middleware: 'auth'
  })

  const post = ref({})
</script>



<style>

</style>
