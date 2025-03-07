export type RentalStatus = "Pending" | "Ongoing" | "Completed" | "Cancelled";

export interface Rental {
  id: string;
  customer_name: string;
  customer_phone: string;
  wheelchair_id: number;
  rental_date: string;
  return_date: string;
  rental_price: number;
  total_price: number;
  status: RentalStatus; //  Enum, bukan string bebas
}
