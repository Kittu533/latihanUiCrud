<!-- <template>
  <div class="p-6">
    <h1 class="text-2xl font-bold">Detail Rental</h1>

    <div v-if="loading" class="text-blue-500">Memuat data...</div>
    <div v-if="error" class="text-red-500">{{ error }}</div>

    <div v-if="rentalDetail">
      <p><strong>Nama:</strong> {{ rentalDetail.customer_name }}</p>
      <p><strong>Nomor Telepon:</strong> {{ rentalDetail.customer_phone }}</p>
      <p><strong>Tanggal Sewa:</strong> {{ new Date(rentalDetail.rental_date).toLocaleDateString() }}</p>
      <p><strong>Status:</strong> {{ rentalDetail.status }}</p>
      <p><strong>Kursi Roda:</strong> {{ rentalDetail.wheelchair?.brand }} ({{ rentalDetail.wheelchair?.type }})</p>
    </div>

    <div v-else-if="!loading && !error" class="text-gray-500">Data tidak ditemukan.</div>
  </div>
</template>

<script setup lang="ts">
import { useRentalStore } from '@/stores/rental-store';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';

const route = useRoute();
const rentalStore = useRentalStore();
rentalStore.fetchRentalDetail(route.params.id as string);

const { rentalDetail, loading, error } = storeToRefs(rentalStore);
</script> -->
<template>
  <div>
    ...
  </div>
</template>