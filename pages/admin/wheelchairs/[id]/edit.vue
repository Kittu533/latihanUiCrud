<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-3xl mx-auto sm:px-6 lg:px-8">
      <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
        <div class="px-4 py-5 sm:px-6">
          <h1 class="text-2xl font-bold text-gray-900">Edit Kursi Roda</h1>
          <p class="mt-1 text-sm text-gray-500">
            Perbarui informasi kursi roda
          </p>
        </div>

        <div class="border-t border-gray-200 px-4 py-5 sm:p-6">
          <form @submit.prevent="handleSubmit">
            <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div class="sm:col-span-3">
                <label
                  for="brand"
                  class="block text-sm font-medium text-gray-700"
                  >Nama Model</label
                >
                <input
                  v-model="form.brand"
                  type="text"
                  id="brand"
                  class="input-field"
                />
              </div>

              <div class="sm:col-span-3">
                <label
                  for="type"
                  class="block text-sm font-medium text-gray-700"
                  >Tipe</label
                >
                <select v-model="form.type" id="type" class="input-field">
                  <option value="Manual">Manual</option>
                  <option value="Elektrik">Elektrik</option>
                  <option value="Sport">Sport</option>
                  <option value="Anak">Anak</option>
                </select>
              </div>

              <div class="sm:col-span-3">
                <label
                  for="price"
                  class="block text-sm font-medium text-gray-700"
                  >Harga (Rp)</label
                >
                <input
                  v-model="form.price"
                  type="number"
                  id="price"
                  class="input-field"
                />
              </div>

              <div class="sm:col-span-3">
                <label
                  for="stock"
                  class="block text-sm font-medium text-gray-700"
                  >Stok</label
                >
                <input
                  v-model="form.stock"
                  type="number"
                  id="stock"
                  class="input-field"
                />
              </div>

              <div class="sm:col-span-6">
                <label
                  for="description"
                  class="block text-sm font-medium text-gray-700"
                  >Deskripsi</label
                >
                <textarea
                  v-model="form.description"
                  id="description"
                  rows="4"
                  class="input-field"
                ></textarea>
              </div>

              <div class="sm:col-span-6">
                <label
                  for="image"
                  class="block text-sm font-medium text-gray-700"
                  >URL Gambar</label
                >
                <input
                  v-model="form.image"
                  type="text"
                  id="image"
                  class="input-field"
                />
                <div class="mt-2" v-if="form.image">
                  <img
                    :src="form.image"
                    alt="Preview"
                    class="h-32 w-auto object-cover rounded-md"
                  />
                </div>
              </div>
            </div>

            <div class="mt-6 flex justify-end space-x-3">
              <NuxtLink to="/admin/wheelchairs" class="btn-cancel"
                >Batal</NuxtLink
              >
              <button type="submit" class="btn-submit" :disabled="loading">
                {{ loading ? "Menyimpan..." : "Simpan Perubahan" }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useWheelchairs } from "@/composables/use-wheelchair";

const route = useRoute();
const { wheelchairDetail, loading, fetchWheelchairDetail, updateWheelchair } =
  useWheelchairs();

const handleSubmit = () => {
  console.log("Mengirim data update kursi roda:");
  console.log("ID:", route.params.id);
  console.log("Data:", form.value);

  updateWheelchair(route.params.id, form.value);
};

const form = ref({
  brand: "",
  type: "Manual",
  price: 0,
  stock: 0,
  available: true,
  description: "",
  image: "",
});

fetchWheelchairDetail(route.params.id);

watch(wheelchairDetail, (newData) => {
  if (newData) {
    form.value = {
      brand: newData.brand || "",
      type: newData.type || "Manual",
      price: Number(newData.price) || 0,
      stock: newData.stock || 0,
      available: newData.available || false,
      description: newData.description || "",
      image: newData.image || "",
    };
  }
});
</script>

