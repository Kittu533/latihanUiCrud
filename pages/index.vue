<template>
    <div>
      <!-- Hero Section -->
      <section class="bg-blue-600 text-white py-20 text-center">
        <h1 class="text-4xl font-bold">Welcome to Rental Service</h1>
        <p class="mt-4 text-lg">The best platform to rent anything easily and securely.</p>
        <NuxtLink to="/rentals" class="mt-6 inline-block bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-200">
          Browse Rentals
        </NuxtLink>
      </section>
  
      <!-- Features Section -->
      <section class="py-16 px-8">
        <h2 class="text-2xl font-bold text-center mb-6">Our Features</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard title="Easy Booking" description="Book rentals in just a few clicks." />
          <FeatureCard title="Secure Payments" description="Safe and reliable payment methods." />
          <FeatureCard title="Verified Listings" description="We ensure all listings are verified and trustworthy." />
        </div>
      </section>
  
      <!-- Call to Action -->
      <section class="bg-gray-100 py-16 text-center">
        <h2 class="text-2xl font-bold">Start Your Rental Journey Today!</h2>
        <p class="mt-4 text-lg">Join thousands of users who trust our platform.</p>
        <NuxtLink to="/signup" class="mt-6 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700">
          Sign Up Now
        </NuxtLink>
      </section>
    </div>
  </template>
  
  <script setup lang="ts">
  import FeatureCard from '@/components/feature-card.vue';
  </script>
  