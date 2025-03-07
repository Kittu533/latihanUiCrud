import axios from 'axios';
import type { Rental } from '@/types/rental';

// GET semua rentals
export const getRentals = async (): Promise<Rental[]> => {
  const config = useRuntimeConfig(); //  Panggil di dalam fungsi
  const response = await axios.get(`${config.public.API_BASE_URL}/rental`);

  return response.data.response.records;
};

// GET detail rental berdasarkan ID
export const getRentalDetail = async (id: string): Promise<Rental> => {
  const config = useRuntimeConfig();
  const response = await axios.get<Rental>(`${config.public.API_BASE_URL}/rental/${id}`);
  return response.data;
};

// POST buat transaksi rental baru
export const createRental = async (data: Omit<Rental, 'id'>): Promise<void> => {
  const config = useRuntimeConfig();
  console.log("📤 Data yang dikirim ke API:", data);
  await axios.post(`${config.public.API_BASE_URL}/rental`, data);
};

// PATCH update transaksi rental
export const updateRental = async (id: string, data: Partial<Rental>): Promise<void> => {
  const config = useRuntimeConfig();
  await axios.patch(`${config.public.API_BASE_URL}/rental/${id}`, data);
};

// DELETE batalkan rental
export const deleteRental = async (id: string): Promise<void> => {
  const config = useRuntimeConfig();
  await axios.delete(`${config.public.API_BASE_URL}/rental/${id}`);
};
