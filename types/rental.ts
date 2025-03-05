export interface Rental {
  id: string; // UUID harus berupa string, bukan number
  wheelchair_id: number;
  customer_name: string;
  customer_phone: string;
  rental_date: string;
  return_date?: string; // Bisa null atau undefined
  rental_price: number;
  total_price?: number; // Bisa null atau undefined
  status: "Pending" | "Ongoing" | "Completed" | "Cancelled"; // ENUM status

  wheelchair?: {
    brand: string;
    type: string;
  };
}
