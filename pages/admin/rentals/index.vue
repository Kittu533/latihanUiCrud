<template>
  <div class="min-h-screen bg-gray-100">
    <div class="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold text-gray-900">Daftar Rental</h1>
      <p class="mt-1 text-gray-600">Kelola transaksi penyewaan kursi roda</p>

      <!-- Notifikasi -->
      <div
        v-if="message"
        class="mt-4 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg"
      >
        {{ message }}
      </div>
      <div
        v-if="error"
        class="mt-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg"
      >
        {{ error }}
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="mt-6 flex justify-center">
        <span class="text-gray-500">Memuat data...</span>
      </div>

      <!-- Tabel daftar rental -->
      <div v-else class="mt-6 overflow-hidden bg-white shadow sm:rounded-lg">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
              >
                ID Rental
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
              >
                Pelanggan
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
              >
                Kursi Roda
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
              >
                Tanggal Rental
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
              >
                Total Harga
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
              >
                Status
              </th>
              <th scope="col" class="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="rental in rentals" :key="rental.id">
              <td
                class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
              >
                {{ rental.id }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ rental.customer_name }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                #{{ rental.wheelchair_id }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ rental.rental_date }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                Rp {{ formatPrice(rental.total_price) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                <span
                  :class="statusClass(rental.status)"
                  class="px-2 py-1 text-xs font-semibold rounded-full"
                >
                  {{ rental.status }}
                </span>
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
              >
                <NuxtLink
                  :to="`/admin/rentals/${rental.id}`"
                  class="text-indigo-600 hover:text-indigo-900"
                  >Detail</NuxtLink
                >
                <button
                  @click="confirmDelete(rental.id)"
                  class="ml-4 text-red-600 hover:text-red-900"
                >
                  Hapus
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRentals } from "@/composables/use-rental";

const { rentals, loading, error, message, fetchRentals } = useRentals();

onMounted(fetchRentals);

// Format harga dengan pemisah ribuan
const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

// Klasifikasi status rental
const statusClass = (status) => {
  switch (status) {
    case "Pending":
      return "bg-yellow-100 text-yellow-800";
    case "Completed":
      return "bg-green-100 text-green-800";
    case "Canceled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

// Konfirmasi penghapusan rental
const confirmDelete = (id) => {
  if (confirm("Apakah Anda yakin ingin menghapus rental ini?")) {
    deleteRental(id);
  }
};

// Fungsi hapus rental
const deleteRental = async (id) => {
  try {
    // Panggil API DELETE untuk menghapus rental (soft delete jika di BE)
    await deleteRentalById(id);
    alert("Rental berhasil dihapus.");
    await fetchRentals(); // Refresh daftar rental setelah penghapusan
  } catch (err) {
    console.error("Gagal menghapus rental:", err);
    alert("Terjadi kesalahan saat menghapus rental.");
  }
};
</script>
