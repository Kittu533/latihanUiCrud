<template>
    <div class="min-h-screen flex flex-col">
      <!-- Navigation Bar -->
      <header class="bg-blue-600 text-white py-4 shadow-md">
        <div class="container mx-auto flex justify-between items-center px-6">
          <h1 class="text-xl font-bold">Rental App</h1>
          <nav>
            <NuxtLink to="/" class="px-4">Home</NuxtLink>
            <NuxtLink to="/rentals" class="px-4">Rentals</NuxtLink>
            <NuxtLink to="/about" class="px-4">About</NuxtLink>
          </nav>
        </div>
      </header>
  
      <!-- Page Content -->
      <main class="flex-1">
        <slot />
      </main>
  
      <!-- Footer -->
      <footer class="bg-gray-800 text-white text-center py-4 mt-10">
        <p>&copy; 2025 Rental Service. All rights reserved.</p>
      </footer>
    </div>
  </template>
  
  <script setup lang="ts">
  </script>
  