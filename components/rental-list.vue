<template>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <RentalItem v-for="rental in rentals" :key="rental.id" :rental="rental" />
    </div>
  </template>
  
  <script setup lang="ts">
  import type { Rental } from '@/types/rental';
  import RentalItem from './rental-item.vue';
  
  defineProps<{ rentals: Rental[] }>();
  </script>
  