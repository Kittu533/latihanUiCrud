import axios from "axios";

const API_BASE_URL = "http://localhost:5000"; // Sesuaikan dengan backend

export async function updateWheelchairStock(wheelchairId: number, quantityChange: number) {
  try {
    await axios.patch(`${API_BASE_URL}/wheelchair/${wheelchairId}/update-stock`, {
      quantityChange, // Mengurangi stok
    });
    console.log(`✅ Stok kursi roda ${wheelchairId} berhasil diperbarui.`);
  } catch (err) {
    console.error(`❌ Gagal memperbarui stok kursi roda ${wheelchairId}:`, err);
    throw err;
  }
}
