<template>
  <ul v-if="rentals.length">
    <li v-for="rental in rentals" :key="rental.id" class="border p-3 my-2 rounded-lg">
      <p><strong>Nama:</strong> {{ rental.customer_name }}</p>
      <p><strong>Status:</strong> {{ rental.status }}</p>
      <nuxt-link :to="`/rentals/${rental.id}`" class="text-blue-500">Lihat Detail</nuxt-link>
    </li>
  </ul>
</template>

<script setup lang="ts">
defineProps<{ rentals: any[] }>();
</script>
