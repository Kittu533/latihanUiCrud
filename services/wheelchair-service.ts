import axios from "axios";

const API_BASE_URL = "http://localhost:5000"; // Sesuaikan dengan backend

// Ambil detail kursi roda berdasarkan ID
export async function getWheelchairDetail(wheelchairId: number) {
  try {
    const response = await axios.get(`${API_BASE_URL}/wheelchair/${wheelchairId}`);
    return response.data;
  } catch (err) {
    console.error(`Gagal mengambil data kursi roda ${wheelchairId}:`, err);
    throw err;
  }
}

// Update stok kursi roda berdasarkan perubahan jumlah (positif/negatif)
export async function updateWheelchairStock(wheelchairId: number, quantityChange: number) {
  try {
    await axios.patch(`${API_BASE_URL}/wheelchair/${wheelchairId}`, {
      stock_change: quantityChange, // BE menangani perubahan stok
    });
    console.log(`✅Stok kursi roda ${wheelchairId} berhasil diperbarui.`);
  } catch (err) {
    console.error(` Gagal memperbarui stok kursi roda ${wheelchairId}:`, err);
    throw err;
  }
}
