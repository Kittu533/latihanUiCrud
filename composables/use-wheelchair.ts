import { ref, onMounted, computed } from "vue";
import axios from "axios";
import type { Wheelchair } from "@/types/wheelchair";

export function useWheelchairs() {
    const API_BASE_URL = "http://localhost:5000"; // Sesuaikan dengan backend
    const wheelchairs = ref<Wheelchair[]>([]);
    const wheelchairDetail = ref<Wheelchair | null>(null);
    const loading = ref<boolean>(false);
    const searchQuery = ref<string>("");
    const availabilityFilter = ref<string>("all");
    const error = ref<string | null>(null);

    // ✅ Fetch daftar semua kursi roda
    const fetchWheelchairs = async () => {
        loading.value = true;
        error.value = null;
    
        try {
            const response = await axios.get(`${API_BASE_URL}/wheelchair`);
            wheelchairs.value = response.data.response.records
                .filter((wheelchair: Wheelchair) => wheelchair.available) // 🔥 Hanya tampilkan yang available
                .map((wheelchair: Wheelchair) => ({
                    ...wheelchair,
                    price: Number(wheelchair.price), // Konversi harga ke angka
                }));
        } catch (err) {
            console.error("❌ Gagal mengambil kursi roda:", err);
            error.value = "Gagal memuat kursi roda.";
        } finally {
            loading.value = false;
        }
    };
    

    // ✅ Fetch detail kursi roda berdasarkan ID
    const fetchWheelchairDetail = async (id: string) => {
        loading.value = true;
        error.value = null;

        try {
            const response = await axios.get(`${API_BASE_URL}/wheelchair/${id}`);
            console.log("✅ Response dari API:", response.data); // Debugging

            if (response.data && response.data.response) {
                wheelchairDetail.value = {
                    ...response.data.response,
                    price: Number(response.data.response.price) || 0, // Pastikan harga dalam angka
                    stock: response.data.response.stock || 0,
                };
            } else {
                wheelchairDetail.value = null;
                error.value = "Data kursi roda tidak ditemukan.";
            }
        } catch (err) {
            console.error("❌ Gagal mengambil detail kursi roda:", err);
            error.value = "Gagal memuat detail kursi roda.";
        } finally {
            loading.value = false;
        }
    };

    // ✅ Create kursi roda baru
    const createWheelchair = async (data: Partial<Wheelchair>) => {
        loading.value = true;
        error.value = null;

        try {
            const response = await axios.post(`${API_BASE_URL}/wheelchair`, data);
            console.log("✅ Kursi roda berhasil ditambahkan:", response.data);

            alert("✅ Kursi roda berhasil ditambahkan!");
        } catch (err) {
            console.error("❌ Gagal menambahkan kursi roda:", err);
            error.value = "Terjadi kesalahan saat menambahkan kursi roda.";
        } finally {
            loading.value = false;
        }
    };

    // ✅ Update kursi roda berdasarkan ID
    const updateWheelchair = async (id: string, data: Partial<Wheelchair>) => {
        loading.value = true;
        error.value = null;

        try {
            await axios.patch(`${API_BASE_URL}/wheelchair/${id}`, data);
            alert("✅ Data kursi roda berhasil diperbarui!");
        } catch (err) {
            console.error("❌ Gagal memperbarui kursi roda:", err);
            error.value = "Terjadi kesalahan saat memperbarui data.";
        } finally {
            loading.value = false;
        }
    };

    onMounted(fetchWheelchairs);

    // ✅ Filter kursi roda berdasarkan status
    const availableWheelchairs = computed(() => {
        return wheelchairs.value.filter((wheelchair) => wheelchair.available);
    });

    // ✅ Filter kursi roda berdasarkan pencarian dan status
    const filteredWheelchairs = computed(() => {
        return wheelchairs.value.filter((wheelchair) => {
            const matchesSearch =
                wheelchair.brand.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                wheelchair.type.toLowerCase().includes(searchQuery.value.toLowerCase());

            let matchesAvailability = true;
            if (availabilityFilter.value === "available") {
                matchesAvailability = wheelchair.available;
            } else if (availabilityFilter.value === "unavailable") {
                matchesAvailability = !wheelchair.available;
            }

            return matchesSearch && matchesAvailability;
        });
    });
    // ✅ Hapus kursi roda berdasarkan ID
    const deleteWheelchairById = async (id: string) => {
        loading.value = true;
        error.value = null;
    
        try {
            await axios.delete(`${API_BASE_URL}/wheelchair/${id}`); // 🛑 Soft Delete
            alert("✅ Kursi roda berhasil dihapus (soft delete)");
        } catch (err) {
            console.error("❌ Gagal menghapus kursi roda:", err);
            error.value = "Terjadi kesalahan saat menghapus kursi roda.";
        } finally {
            loading.value = false;
        }
    };
    

    return {
        wheelchairs,
        wheelchairDetail,
        availableWheelchairs,
        filteredWheelchairs,
        searchQuery,
        availabilityFilter,
        loading,
        error,
        fetchWheelchairs,
        fetchWheelchairDetail,
        createWheelchair, // ✅ Fungsi untuk menambahkan kursi roda baru
        updateWheelchair,// ✅ Fungsi untuk update kursi roda
        deleteWheelchairById // ✅ Fungsi untuk delete kursi roda
    };
}
