<template>
    <div class="p-6 border rounded-lg shadow-md text-center">
      <h3 class="text-xl font-semibold">{{ title }}</h3>
      <p class="mt-2">{{ description }}</p>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps<{
    title: string;
    description: string;
  }>();
  </script>
  