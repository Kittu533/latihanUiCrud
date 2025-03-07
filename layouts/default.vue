<template>
  <div class="min-h-screen flex flex-col">
    <!-- Navigation Bar -->
    <header class="bg-white shadow-sm">
      <nav
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16"
      >
        <div class="flex items-center">
          <svg
            class="h-8 w-8 text-teal-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
            />
          </svg>
          <span class="ml-2 text-xl font-bold text-gray-900">MobilityPlus</span>
        </div>
        <div class="hidden md:flex space-x-8">
          <a href="#features" class="text-gray-600 hover:text-teal-600"
            >Features</a
          >
          <NuxtLink to="/wheelchairs" class="text-gray-600 hover:text-teal-600"
            >Products</NuxtLink
          >
          <a href="#contact" class="text-gray-600 hover:text-teal-600"
            >Contact</a
          >
        </div>
        <div>
          <NuxtLink
            to="/rentals/new"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700"
            >Pesan Sekarang</NuxtLink
          >
        </div>
      </nav>
    </header>

    <!-- Page Content -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid md:grid-cols-2 gap-8">
          <div>
            <div class="flex items-center">
              <svg
                class="h-8 w-8 text-teal-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
                />
              </svg>
              <span class="ml-2 text-xl font-bold">MobilityPlus</span>
            </div>
            <p class="mt-4 text-gray-300">
              Providing high-quality wheelchair rentals to help you maintain
              your mobility and independence.
            </p>
          </div>
          <div class="grid grid-cols-2 gap-8">
            <div>
              <h3
                class="text-sm font-semibold text-gray-400 uppercase tracking-wider"
              >
                Contact
              </h3>
              <ul class="mt-4 space-y-4">
                <li class="text-base text-gray-300">123 Mobility Street</li>
                <li class="text-base text-gray-300">San Francisco, CA 94103</li>
                <li class="text-base text-gray-300">info@mobilityplus.com</li>
                <li class="text-base text-gray-300">(555) 123-4567</li>
              </ul>
            </div>
            <div>
              <h3
                class="text-sm font-semibold text-gray-400 uppercase tracking-wider"
              >
                Legal
              </h3>
              <ul class="mt-4 space-y-4">
                <li>
                  <a href="#" class="text-base text-gray-300 hover:text-white"
                    >Privacy Policy</a
                  >
                </li>
                <li>
                  <a href="#" class="text-base text-gray-300 hover:text-white"
                    >Terms of Service</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="mt-8 border-t border-gray-700 pt-8 text-center">
          <p class="text-base text-gray-400">
            &copy; 2023 MobilityPlus, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts"></script>
