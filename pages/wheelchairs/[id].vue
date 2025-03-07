<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex items-center">
          <button
            @click="router.back()"
            class="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ChevronLeftIcon class="h-6 w-6 text-gray-500" />
          </button>
          <h1 class="text-2xl font-bold text-gray-900">Wheelchair Details</h1>
        </div>
      </div>
    </header>

    <!-- Main content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div v-if="loading" class="flex justify-center items-center h-64">
        <div
          class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"
        ></div>
      </div>

      <div
        v-else-if="error"
        class="bg-red-50 border border-red-200 rounded-lg p-6 text-center"
      >
        <AlertCircleIcon class="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h2 class="text-xl font-semibold text-red-700 mb-2">
          Error Loading Wheelchair
        </h2>
        <p class="text-red-600">{{ error }}</p>
        <button
          @click="fetchWheelchairDetail(route.params.id)"
          class="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      </div>

      <div
        v-else-if="wheelchairDetail"
        class="bg-white shadow rounded-lg overflow-hidden"
      >
        <!-- Wheelchair Image -->
        <div class="relative h-80 sm:h-96 bg-gray-200">
          <img
            v-if="wheelchairDetail.image"
            :src="wheelchairDetail.image"
            :alt="wheelchairDetail.brand"
            class="w-full h-full object-cover"
          />
          <div
            v-else
            class="w-full h-full flex items-center justify-center bg-gray-100"
          >
            <ImageIcon class="h-16 w-16 text-gray-400" />
          </div>

          <!-- Badge for availability -->
          <div
            class="absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium"
            :class="
              wheelchairDetail.available
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            "
          >
            {{ wheelchairDetail.available ? "Available" : "Out of Stock" }}
          </div>
        </div>

        <!-- Wheelchair details -->
        <div class="p-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-2">
            {{ wheelchairDetail.brand }} - {{ wheelchairDetail.type }}
          </h2>

          <div class="prose max-w-none text-gray-700 mb-6">
            <p>
              {{ wheelchairDetail.description || "No description available." }}
            </p>
          </div>
          <div class="prose max-w-none text-gray-700 mb-6">
            <p>
              stok : {{ wheelchairDetail.stock || "No stock information available." }}
            </p>
          </div>

          <!-- Pricing Section -->
          <div class="mt-6 bg-gray-50 p-4 rounded-lg">
            <div class="flex justify-between items-center mb-2">
              <span class="text-gray-600">Price</span>
              <span class="text-2xl font-bold text-gray-900">
                {{ formatPrice(wheelchairDetail.price) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { useWheelchairs } from "@/composables/use-wheelchair";
import { ChevronLeftIcon, AlertCircleIcon, ImageIcon } from "lucide-vue-next";
import { useFormat } from "@/composables/use-idr-fortmat"; // Import format fungsi

const router = useRouter();
const route = useRoute();
const { wheelchairDetail, loading, error, fetchWheelchairDetail } =
  useWheelchairs();
const { formatPrice } = useFormat(); //  Ambil fungsi formatPrice dari composable

fetchWheelchairDetail(route.params.id);
</script>
