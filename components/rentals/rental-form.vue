<script setup lang="ts">
import { useWheelchairs } from "@/composables/use-wheelchair";
import { useRentals } from "@/composables/use-rental";

const { availableWheelchairs, error: fetchError } = useWheelchairs();
const {
  rental,
  message,
  error,
  addRental,
  updateRentalPrice,
  calculateTotalPrice,
} = useRentals();
</script>

<template>
  <form @submit.prevent="addRental" class="space-y-4">p
    <div>
      <label class="block">Nama Pelanggan</label>
      <input
        v-model="rental.customer_name"
        type="text"
        class="w-full border p-2 rounded"
        required
      />
    </div>

    <div>
      <label class="block">Nomor Telepon</label>
      <input
        v-model="rental.customer_phone"
        type="text"
        class="w-full border p-2 rounded"
        @input="
          rental.customer_phone = rental.customer_phone.replace(/\D/g, '')
        "
        required
      />
    </div>

    <div>
      <label class="block">Pilih Kursi Roda</label>
      <select
        v-model="rental.wheelchair_id"
        class="w-full border p-2 rounded"
        required
        @change="updateRentalPrice(availableWheelchairs)"
      >
        <option v-if="availableWheelchairs.length === 0" disabled>
          {{ fetchError ? "Gagal memuat kursi roda" : "Loading kursi roda..." }}
        </option>
        <option
          v-for="wheelchair in availableWheelchairs"
          :key="wheelchair.id"
          :value="wheelchair.id"
        >
          {{ wheelchair.brand }} ({{ wheelchair.type }}) - Rp{{
            wheelchair.price.toLocaleString()
          }}
        </option>
      </select>
    </div>

    <div>
      <label class="block">Tanggal Sewa</label>
      <input
        v-model="rental.rental_date"
        type="date"
        class="w-full border p-2 rounded"
        required
      />
    </div>

    <div>
      <label class="block">Tanggal Pengembalian</label>
      <input
        v-model="rental.return_date"
        type="date"
        class="w-full border p-2 rounded"
        @change="calculateTotalPrice"
        required
      />
    </div>

    <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded">
      Tambah Rental
    </button>

    <p v-if="message" class="text-green-500 mt-4">{{ message }}</p>
    <p v-if="error" class="text-red-500 mt-4">{{ error }}</p>
  </form>
</template>
