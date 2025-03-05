import { ref } from "vue";
import { getRentals, createRental, getRentalDetail } from "@/services/rental-service";
import { updateWheelchairStock } from "@/services/wheelchair-service"; // Tambahkan ini
import type { Rental, RentalStatus } from "@/types/rental";

export function useRentals() {
  const rentals = ref<Rental[]>([]);
  const rentalDetail = ref<Rental | null>(null);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);
  const message = ref<string | null>(null);

  const rental = ref({
    wheelchair_id: 1,
    customer_name: "",
    customer_phone: "",
    rental_date: new Date().toISOString().split("T")[0],
    return_date: "",
    rental_price: 0,
    total_price: 0,
  });

  const fetchRentals = async () => {
    loading.value = true;
    error.value = null;
    try {
      rentals.value = await getRentals();
    } catch (err) {
      error.value = "Gagal mengambil data rental.";
    } finally {
      loading.value = false;
    }
  };

  const addRental = async () => {
    if (!rental.value.customer_name || !rental.value.customer_phone || !rental.value.return_date) {
      error.value = "❌ Semua field wajib diisi!";
      return;
    }

    const newRental: Omit<Rental, "id"> = {
      customer_name: rental.value.customer_name,
      customer_phone: rental.value.customer_phone,
      wheelchair_id: rental.value.wheelchair_id,
      rental_date: rental.value.rental_date,
      return_date: rental.value.return_date,
      rental_price: rental.value.rental_price,
      total_price: rental.value.total_price,
      status: "Pending" as RentalStatus,
    };

    console.log("🚀 newRental sebelum dikirim:", newRental);

    loading.value = true;
    error.value = null;
    try {
      await createRental(newRental);

      // 🔥 Update stok kursi roda di backend setelah rental berhasil dibuat
      await updateWheelchairStock(rental.value.wheelchair_id, -1);

      await fetchRentals();
      message.value = "✅ Rental berhasil ditambahkan!";
    } catch (err) {
      console.error("❌ Gagal menambahkan rental:", err);
      error.value = "Gagal menambahkan rental.";
    } finally {
      loading.value = false;
    }
  };

  return {
    rentals,
    rentalDetail,
    loading,
    error,
    rental,
    message,
    fetchRentals,
    addRental,
  };
}
