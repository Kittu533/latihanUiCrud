<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div class="bg-white shadow overflow-hidden sm:rounded-lg">
        <div class="px-4 py-5 sm:px-6 flex justify-between items-center">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Detail Kursi Roda</h1>
            <p class="mt-1 max-w-2xl text-sm text-gray-500">Informasi lengkap kursi roda</p>
          </div>
          <div class="flex space-x-2">
            <NuxtLink v-if="wheelchair" :to="`/admin/wheelchairs/${wheelchair.id}/edit`"
              class="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
              <Icon name="lucide:edit" class="mr-2 h-4 w-4" />
              Edit
            </NuxtLink>
            <NuxtLink v-if="wheelchair" :to="`/admin/wheelchairs/${wheelchair.id}/update-stock`"
              class="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700">
              <Icon name="lucide:package" class="mr-2 h-4 w-4" />
              Update Stok
            </NuxtLink>
            <NuxtLink v-if="wheelchair" :to="`/admin/wheelchairs/${wheelchair.id}/delete`"
              class="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700">
              <Icon name="lucide:trash-2" class="mr-2 h-4 w-4" />
              Hapus
            </NuxtLink>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center py-16">
          <div class="animate-spin h-12 w-12 border-t-2 border-b-2 border-gray-900 rounded-full"></div>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="text-center bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 class="text-xl font-semibold text-red-700 mb-2">Error Loading Data</h2>
          <p class="text-red-600">{{ error }}</p>
          <button @click="fetchWheelchairDetail(route.params.id)" 
            class="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
            Coba Lagi
          </button>
        </div>

        <!-- Detail Kursi Roda -->
        <div v-else-if="wheelchair" class="border-t border-gray-200">
          <dl>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">ID Kursi Roda</dt>
              <dd class="text-sm text-gray-900 sm:col-span-2">{{ wheelchair.id }}</dd>
            </div>
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Nama Model</dt>
              <dd class="text-sm text-gray-900 sm:col-span-2">{{ wheelchair.brand }}</dd>
            </div>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Tipe</dt>
              <dd class="text-sm text-gray-900 sm:col-span-2">{{ wheelchair.type }}</dd>
            </div>
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Harga</dt>
              <dd class="text-sm text-gray-900 sm:col-span-2">Rp {{ formatPrice(wheelchair.price ?? 0) }}</dd>
            </div>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Stok Tersedia</dt>
              <dd class="text-sm text-gray-900 sm:col-span-2">{{ wheelchair.stock ?? "Tidak Diketahui" }}</dd>
            </div>
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Status</dt>
              <dd class="text-sm sm:col-span-2">
                <span :class="`px-2 inline-flex text-xs font-semibold rounded-full ${wheelchair.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`">
                  {{ wheelchair.available ? 'Tersedia' : 'Tidak Tersedia' }}
                </span>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useWheelchairs } from "@/composables/use-wheelchair";
import { useFormat } from "@/composables/use-idr-fortmat";
import { onMounted } from "vue";

const route = useRoute();
const { wheelchairDetail: wheelchair, loading, error, fetchWheelchairDetail } = useWheelchairs();
const { formatPrice } = useFormat();

onMounted(async () => {
  if (route.params.id) {
    await fetchWheelchairDetail(route.params.id);
  }
});
</script>
