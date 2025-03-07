<template>
  <div
    class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Konfirmasi Hapus Kursi Roda
      </h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <div class="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
          <div class="flex">
            <div class="flex-shrink-0">
              <Icon name="lucide:alert-triangle" class="h-5 w-5 text-red-400" />
            </div>
            <div class="ml-3">
              <p class="text-sm text-red-700">
                Apakah Anda yakin ingin menghapus kursi roda ini? Tindakan ini
                tidak dapat dibatalkan.
              </p>
            </div>
          </div>
        </div>

        <div v-if="loading" class="text-center py-4">
          <span class="text-gray-500">Memuat data...</span>
        </div>
        <div v-else-if="error" class="text-center py-4 text-red-600">
          <p>Gagal memuat detail kursi roda.</p>
        </div>

        <div
          v-else-if="wheelchairDetail?.available === false"
          class="bg-yellow-100 border border-yellow-300 text-yellow-700 px-4 py-3 rounded relative"
        >
          <strong class="font-bold">Kursi Roda Ini Sudah Dihapus!</strong>
          <p class="text-sm">Data kursi roda ini tidak lagi tersedia.</p>
        </div>

        <div v-else class="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
          <div class="px-4 py-5 sm:px-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900">
              Informasi Kursi Roda
            </h3>
          </div>
          <div class="border-t border-gray-200">
            <dl>
              <div
                class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
              >
                <dt class="text-sm font-medium text-gray-500">ID</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {{ wheelchairDetail?.id || "Tidak tersedia" }}
                </dd>
              </div>
              <div
                class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
              >
                <dt class="text-sm font-medium text-gray-500">Nama Model</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {{ wheelchairDetail?.brand || "Tidak tersedia" }}
                </dd>
              </div>
              <div
                class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
              >
                <dt class="text-sm font-medium text-gray-500">Tipe</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {{ wheelchairDetail?.type || "Tidak tersedia" }}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div class="flex justify-end space-x-3">
          <NuxtLink to="/admin/wheelchairs" class="btn-secondary">
            Batal
          </NuxtLink>
          <button
            type="button"
            @click="deleteWheelchairById(wheelchairId)"
            class="btn-danger"
          >
            Hapus Kursi Roda
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { useWheelchairs } from "@/composables/use-wheelchair";
import { onMounted, computed } from "vue";

const {
  fetchWheelchairDetail,
  deleteWheelchairById,
  wheelchairDetail,
  loading,
  error,
} = useWheelchairs();
const route = useRoute();
const router = useRouter();
const wheelchairId = computed(() => route.params.id);

// Ambil data kursi roda sebelum ditampilkan
onMounted(() => {
  fetchWheelchairDetail(wheelchairId.value);
});

// Hapus kursi roda dengan konfirmasi
const deleteWheelchair = async () => {
  const confirmed = confirm(
    "Apakah Anda yakin ingin menghapus kursi roda ini?"
  );
  if (!confirmed) return;

  await deleteWheelchairById(wheelchairId.value);
  router.push("/admin/wheelchairs");
};
</script>
