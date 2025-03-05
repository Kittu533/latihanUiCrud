<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold">Daftar Rental Kursi Roda</h1>

    <div v-if="loading" class="text-blue-500">Memuat data...</div>
    <div v-if="error" class="text-red-500">{{ error }}</div>

    <ul v-if="rentals.length">
      <li v-for="rental in rentals" :key="rental.id" class="border p-3 my-2 rounded-lg">
        <p><strong>Nama:</strong> {{ rental.customer_name }}</p>
        <p><strong>Nomor Telepon:</strong> {{ rental.customer_phone }}</p>
        <p><strong>Tanggal Sewa:</strong> {{ new Date(rental.rental_date).toLocaleDateString() }}</p>
        <p><strong>Status:</strong> {{ rental.status }}</p>
        <nuxt-link :to="`/rentals/${rental.id}`" class="text-blue-500">Lihat Detail</nuxt-link>
      </li>
    </ul>
    
    <div v-else-if="!loading && !error" class="text-gray-500">Tidak ada data rental.</div>
  </div>
</template>

<script setup lang="ts">
import { useRentalStore } from '@/stores/rental-store';
import { storeToRefs } from 'pinia';

const rentalStore = useRentalStore();
rentalStore.fetchRentals();

const { rentals, loading, error } = storeToRefs(rentalStore);
</script>
