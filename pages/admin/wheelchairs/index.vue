<template>
    <div class="min-h-screen bg-gray-50">
      <header class="bg-white shadow">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <h1 class="text-2xl font-bold text-gray-900">Daftar Kursi Roda</h1>
          
          <!-- Tambahkan Button untuk Menambah Kursi Roda -->
          <NuxtLink to="/admin/wheelchairs/create" class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
            + Tambah Kursi Roda
          </NuxtLink>
        </div>
      </header>
  
      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div v-if="loading" class="flex justify-center items-center h-64">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
  
        <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h2 class="text-xl font-semibold text-red-700 mb-2">Error Loading Wheelchairs</h2>
          <p class="text-red-600">{{ error }}</p>
          <button @click="fetchWheelchairs" class="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
            Coba Lagi
          </button>
        </div>
  
        <!-- Tampilkan daftar kursi roda -->
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div v-for="wheelchair in wheelchairs" :key="wheelchair.id" class="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow">
            <NuxtLink :to="`/admin/wheelchairs/${wheelchair.id}`" class="block h-full">
              <div class="relative h-48 bg-gray-200">
                
                <img v-if="wheelchair.image" :src="wheelchair.image" :alt="wheelchair.brand" class="w-full h-full object-cover" />
                <div v-else class="w-full h-full flex items-center justify-center bg-gray-100">
                  <span class="text-gray-400">No Image</span>
                </div>
                <div class="absolute top-2 right-2 px-2 py-0.5 rounded-full text-xs font-medium"
                  :class="wheelchair.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
                  {{ wheelchair.available ? 'Tersedia' : 'Habis' }}
                </div>
              </div>
              <div class="p-4">
                <h2 class="text-lg font-semibold text-gray-900 mb-1">{{ wheelchair.brand }} - {{ wheelchair.type }}</h2>
                <p class="text-sm text-gray-600">{{ formatPrice(wheelchair.price) }}</p>
              </div>
            </NuxtLink>
          </div>
        </div>
      </main>
    </div>
  </template>
  
  <script setup>
  import { onMounted } from "vue";
  import { useWheelchairs } from "@/composables/use-wheelchair";
  import { useFormat } from "@/composables/use-idr-fortmat";
  
  const { wheelchairs, loading, error, fetchWheelchairs } = useWheelchairs();
  const { formatPrice } = useFormat();
  
  onMounted(fetchWheelchairs);
  </script>
  