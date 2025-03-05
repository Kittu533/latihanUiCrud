import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getRentals, getRentalDetail, createRental } from '@/services/rental-service';
import type { Rental } from '@/types/rental';

export const useRentalStore = defineStore('rentalStore', () => {
  const rentals = ref<Rental[]>([]);
  const rentalDetail = ref<Rental | null>(null);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);

  // Fetch semua rentals
  const fetchRentals = async () => {
    loading.value = true;
    error.value = null;
    try {
      const data = await getRentals();
      rentals.value = data; // Set langsung ke rentals
    } catch (err) {
      error.value = 'Failed to fetch rentals.';
    } finally {
      loading.value = false;
    }
  };

  // Tambahkan rental baru
  const addRental = async (newRental: Omit<Rental, 'id' | 'wheelchair'>) => {
    loading.value = true;
    error.value = null;
    try {
      await createRental(newRental);
      await fetchRentals(); // Update daftar rental setelah menambah data
    } catch (err) {
      error.value = 'Failed to add rental.';
    } finally {
      loading.value = false;
    }
  };
  // Fetch detail rental berdasarkan ID
  const fetchRentalDetail = async (id: string) => {
    loading.value = true;
    error.value = null;
    try {
      rentalDetail.value = await getRentalDetail(id);
    } catch (err) {
      error.value = 'Failed to fetch rental details.';
    } finally {
      loading.value = false;
    }
  };

  return { rentals, rentalDetail, loading, error, fetchRentals, fetchRentalDetail, addRental };
});
