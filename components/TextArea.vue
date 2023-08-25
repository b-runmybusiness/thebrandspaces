<template>
    <textarea class="bg-white border border-gray-200 p-3 rounded-lg w-full text-sm" 
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"></textarea>
</template>

<script setup>
    defineProps(['modelValue'])
    defineEmits(['update:modelValue'])
</script>