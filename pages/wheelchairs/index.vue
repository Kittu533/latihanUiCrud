<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 class="text-2xl font-bold text-gray-900">Wheelchairs</h1>
      </div>
    </header>

    <!-- Main content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Filters and search -->
      <div class="mb-8 bg-white shadow rounded-lg p-6">
        <div
          class="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <!-- Search -->
          <div class="relative flex-grow max-w-md">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search wheelchairs..."
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <SearchIcon class="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>

          <div class="flex flex-col sm:flex-row gap-4">
            <!-- Filter dropdown -->
            <div class="relative">
              <select
                v-model="availabilityFilter"
                class="appearance-none pl-3 pr-10 py-2 border border-gray-300 bg-white rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full sm:w-auto"
              >
                <option value="all">All Wheelchairs</option>
                <option value="available">Available</option>
                <option value="unavailable">Unavailable</option>
              </select>
              <ChevronDownIcon
                class="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none"
              />
            </div>

            <!-- Sort dropdown -->
            <div class="relative">
              <select
                v-model="sortOption"
                class="appearance-none pl-3 pr-10 py-2 border border-gray-300 bg-white rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full sm:w-auto"
              >
                <option value="featured">Featured</option>
                <option value="priceAsc">Price: Low to High</option>
                <option value="priceDesc">Price: High to Low</option>
                <option value="newest">Newest</option>
                <option value="rating">Highest Rated</option>
              </select>
              <ChevronDownIcon
                class="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Loading state -->
      <div v-if="loading" class="flex justify-center items-center h-64">
        <div
          class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"
        ></div>
      </div>

      <!-- Error state -->
      <div
        v-else-if="error"
        class="bg-red-50 border border-red-200 rounded-lg p-6 text-center"
      >
        <AlertCircleIcon class="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h2 class="text-xl font-semibold text-red-700 mb-2">
          Error Loading Wheelchairs
        </h2>
        <p class="text-red-600">{{ error }}</p>
        <button
          @click="fetchWheelchairs"
          class="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      </div>

      <!-- Empty state -->
      <div
        v-else-if="filteredWheelchairs.length === 0"
        class="bg-white shadow rounded-lg p-8 text-center"
      >
        <SearchXIcon class="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h2 class="text-xl font-semibold text-gray-700 mb-2">
          No wheelchairs found
        </h2>
        <p class="text-gray-600 mb-4">
          We couldn't find any wheelchairs matching your criteria.
        </p>
        <button
          @click="resetFilters"
          class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          Reset Filters
        </button>
      </div>

      <!-- Wheelchairs grid -->
      <div
        v-else
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <div
          v-for="wheelchair in filteredWheelchairs"
          :key="wheelchair.id"
          class="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow"
        >
          <NuxtLink :to="`/wheelchairs/${wheelchair.id}`" class="block h-full">
            <div class="relative h-48 bg-gray-200">
              <img
                v-if="wheelchair.image"
                :src="wheelchair.image"
                :alt="wheelchair.brand"
                class="w-full h-full object-cover"
              />
              <div
                v-else
                class="w-full h-full flex items-center justify-center bg-gray-100"
              >
                <ImageIcon class="h-10 w-10 text-gray-400" />
              </div>
            </div>

            <div class="p-4">
              <h2 class="text-lg font-semibold text-gray-900 mb-1">
                {{ wheelchair.brand }} - {{ wheelchair.type }}
              </h2>
              <p class="text-sm text-gray-600 mb-3">
                {{ wheelchair.description }}
              </p>

              <div class="flex items-center justify-between">
                <span class="text-2xl font-bold text-gray-900">
                  {{ formatPrice(wheelchair.price) }}
                </span>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useWheelchairs } from "@/composables/use-wheelchair";
import {
  SearchIcon,
  ChevronDownIcon,
  AlertCircleIcon,
  ImageIcon,
  SearchXIcon,
} from "lucide-vue-next";

// Gunakan composable untuk mendapatkan state dan function dari use-wheelchairs.ts
const {
  wheelchairs,
  filteredWheelchairs,
  searchQuery,
  availabilityFilter,
  sortOption,
  loading,
  error,
  fetchWheelchairs,
} = useWheelchairs();

// Reset filters function
const resetFilters = () => {
  searchQuery.value = "";
  availabilityFilter.value = "all";
  sortOption.value = "featured";
};
import { useFormat } from "@/composables/use-idr-fortmat"; // ✅ Import format fungsi
const { formatPrice } = useFormat(); //  Ambil fungsi formatPrice dari composable
</script>
