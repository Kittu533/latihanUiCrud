import { ref, onMounted, computed } from "vue";
import axios from "axios";
import type { Wheelchair } from "@/types/wheelchair";

export function useWheelchairs() {
    const API_BASE_URL = "http://localhost:5000"; // Sesuaikan dengan URL backend
    const wheelchairs = ref<Wheelchair[]>([]);
    const loading = ref<boolean>(true);
    const searchQuery = ref<string>("");
    const availabilityFilter = ref<string>("all");
    const error = ref<string | null>(null);

    // Fetch data kursi roda dari API
    const fetchWheelchairs = async () => {
        loading.value = true;
        error.value = null;

        try {
            const response = await axios.get(`${API_BASE_URL}/wheelchair`);
            wheelchairs.value = response.data.response.records.map((wheelchair: Wheelchair) => ({
                ...wheelchair,
                price: Number(wheelchair.price), // Pastikan price jadi number
            }));
        } catch (err) {
            console.error("❌ Gagal mengambil kursi roda:", err);
            error.value = "Gagal memuat kursi roda.";
        } finally {
            loading.value = false;
        }
    };

    onMounted(fetchWheelchairs);

    // ✅ Kembalikan hanya kursi roda yang tersedia
    const availableWheelchairs = computed(() => {
        return wheelchairs.value.filter((wheelchair) => wheelchair.available);
    });

    // Computed untuk filter kursi roda
    const filteredWheelchairs = computed(() => {
        return wheelchairs.value.filter((wheelchair) => {
            // Filter berdasarkan pencarian
            const matchesSearch =
                wheelchair.brand.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                wheelchair.type.toLowerCase().includes(searchQuery.value.toLowerCase());

            // Filter berdasarkan ketersediaan
            let matchesAvailability = true;
            if (availabilityFilter.value === "available") {
                matchesAvailability = wheelchair.available;
            } else if (availabilityFilter.value === "unavailable") {
                matchesAvailability = !wheelchair.available;
            }

            return matchesSearch && matchesAvailability;
        });
    });

    return {
        wheelchairs,
        availableWheelchairs, // ✅ Tambahkan kembali agar bisa digunakan di rental-form.vue
        filteredWheelchairs,
        searchQuery,
        availabilityFilter,
        loading,
        error,
        fetchWheelchairs,
    };
}
