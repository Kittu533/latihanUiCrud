<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-3xl mx-auto sm:px-6 lg:px-8">
      <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
        <div class="px-4 py-5 sm:px-6">
          <h1 class="text-2xl font-bold text-gray-900">Tambah Kursi Roda Baru</h1>
          <p class="mt-1 text-sm text-gray-500">Isi informasi untuk menambahkan kursi roda baru ke inventaris</p>
        </div>
        
        <div class="border-t border-gray-200 px-4 py-5 sm:p-6">
          <form @submit.prevent="handleCreateWheelchair">
            <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div class="sm:col-span-3">
                <label for="brand" class="block text-sm font-medium text-gray-700">Merek</label>
                <input type="text" id="brand" v-model="form.brand" required class="w-full border-gray-300 rounded-md p-2 shadow-sm" />
              </div>

              <div class="sm:col-span-3">
                <label for="type" class="block text-sm font-medium text-gray-700">Tipe</label>
                <select id="type" v-model="form.type" required class="w-full border-gray-300 rounded-md p-2 shadow-sm">
                  <option value="">Pilih Tipe</option>
                  <option value="Manual">Manual</option>
                  <option value="Elektrik">Elektrik</option>
                  <option value="Sport">Sport</option>
                  <option value="Anak">Anak</option>
                </select>
              </div>

              <div class="sm:col-span-3">
                <label for="price" class="block text-sm font-medium text-gray-700">Harga (Rp)</label>
                <input type="number" id="price" v-model="form.price" required min="0" class="w-full border-gray-300 rounded-md p-2 shadow-sm" />
              </div>

              <div class="sm:col-span-3">
                <label for="stock" class="block text-sm font-medium text-gray-700">Stok</label>
                <input type="number" id="stock" v-model="form.stock" required min="0" class="w-full border-gray-300 rounded-md p-2 shadow-sm" />
              </div>
            </div>

            <div class="mt-6 flex justify-end space-x-3">
              <NuxtLink to="/admin/wheelchairs" class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400">Batal</NuxtLink>
              <button type="submit" class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Tambah</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useWheelchairs } from "@/composables/use-wheelchair";

const { createWheelchair } = useWheelchairs();
const router = useRouter();

const form = ref({
  brand: "",
  type: "",
  price: 0,
  stock: 0,
});

const handleCreateWheelchair = async () => {
  await createWheelchair(form.value);
  router.push("/admin/wheelchairs");
};
</script>
