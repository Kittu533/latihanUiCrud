// composables/useFormat.ts
export function useFormat() {
    const formatPrice = (price: number | string) => {
        if (!price) return "Harga tidak tersedia";

        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0, // Tidak menampilkan desimal jika 0
            maximumFractionDigits: 0, // Pastikan tidak ada desimal
        }).format(Number(price));
    };

    return { formatPrice };
}
