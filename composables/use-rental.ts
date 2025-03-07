import { ref } from "vue";
import { getRentals, createRental, getRentalDetail } from "@/services/rental-service";
import { updateWheelchairStock, getWheelchairDetail } from "@/services/wheelchair-service";
import type { Rental, RentalStatus } from "@/types/rental";

export function useRentals() {
  const rentals = ref<Rental[]>([]);
  const rentalDetail = ref<Rental | null>(null);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);
  const message = ref<string | null>(null);

  const rental = ref<Rental>({
    id: "", // Placeholder ID, akan digenerate oleh backend
    wheelchair_id: 1,
    customer_name: "",
    customer_phone: "",
    rental_date: new Date().toISOString().split("T")[0],
    return_date: "",
    rental_price: 0,
    total_price: 0,
    status: "Pending" as RentalStatus,
  });

  const fetchRentals = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await getRentals();
      rentals.value = response; // Assuming response is already a Rental[]
    } catch (err) {
      error.value = "Gagal mengambil data rental.";
    } finally {
      loading.value = false;
    }
  };

  const fetchWheelchairPrice = async (id: number) => {
    try {
      const wheelchair = await getWheelchairDetail(id);
      rental.value.rental_price = wheelchair.price;
    } catch (err) {
      error.value = "Gagal mengambil harga kursi roda.";
    }
  };

  const addRental = async () => {
    if (!rental.value.customer_name || !rental.value.customer_phone || !rental.value.return_date) {
      error.value = "Semua field wajib diisi!";
      return;
    }

    await fetchWheelchairPrice(rental.value.wheelchair_id);

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

    console.log("newRental sebelum dikirim:", newRental);

    loading.value = true;
    error.value = null;
    try {
      await createRental(newRental);
      await updateWheelchairStock(rental.value.wheelchair_id, -1);
      await fetchRentals();
      message.value = "Rental berhasil ditambahkan!";
    } catch (err) {
      console.error("Gagal menambahkan rental:", err);
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

