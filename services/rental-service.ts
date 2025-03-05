import axios from 'axios';
import type { Rental } from '@/types/rental';

const API_BASE_URL = useRuntimeConfig().public.API_BASE_URL;

// GET semua rentals
export const getRentals = async (): Promise<Rental[]> => {
  const response = await axios.get(`${API_BASE_URL}/rental`);
  
  // Ambil data dari response.records
  return response.data.response.records; 
};


// GET detail rental berdasarkan ID
export const getRentalDetail = async (id: string): Promise<Rental> => {
  const response = await axios.get<Rental>(`${API_BASE_URL}/rental/${id}`);
  return response.data;
};

// POST buat transaksi rental baru
export const createRental = async (data: Omit<Rental, 'id'>): Promise<void> => {
  await axios.post(`${API_BASE_URL}/rental`, data);
};

// PATCH update transaksi rental
export const updateRental = async (id: string, data: Partial<Rental>): Promise<void> => {
  await axios.patch(`${API_BASE_URL}/rental/${id}`, data);
};

// DELETE batalkan rental
export const deleteRental = async (id: string): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/rental/${id}`);
};
