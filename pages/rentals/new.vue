<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold">Tambah Rental Baru</h1>
    <RentalForm :addRental="addRental" />
  </div>
</template>

<script setup lang="ts">
import RentalForm from "@/components/rentals/rental-form.vue";
import { useRentals } from "@/composables/use-rental";

const { addRental } = useRentals();
</script>
