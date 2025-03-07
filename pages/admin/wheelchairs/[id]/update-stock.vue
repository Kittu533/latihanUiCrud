<template>
    <div class="min-h-screen bg-gray-50 py-8">
      <div class="max-w-2xl mx-auto sm:px-6 lg:px-8">
        <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
          <div class="px-4 py-5 sm:px-6">
            <h1 class="text-2xl font-bold text-gray-900">Update Stok Kursi Roda</h1>
            <p class="mt-1 text-sm text-gray-500">Perbarui jumlah stok dan status ketersediaan</p>
          </div>
          
          <div class="border-t border-gray-200 px-4 py-5 sm:p-6">
            <div class="mb-6">
              <div class="flex items-center space-x-4">
                <img :src="wheelchair.image" alt="Gambar kursi roda" class="h-20 w-20 object-cover rounded-md">
                <div>
                  <h2 class="text-lg font-medium text-gray-900">{{ wheelchair.name }}</h2>
                  <p class="text-sm text-gray-500">{{ wheelchair.type }}</p>
                  <p class="text-sm font-medium text-gray-900">Rp {{ formatPrice(wheelchair.price) }}</p>
                </div>
              </div>
            </div>
            
            <form @submit.prevent="updateStock">
              <div class="space-y-6">
                <div>
                  <label for="currentStock" class="block text-sm font-medium text-gray-700">Stok Saat Ini</label>
                  <div class="mt-1">
                    <input 
                      type="text" 
                      id="currentStock" 
                      :value="wheelchair.stock" 
                      disabled
                      class="bg-gray-100 shadow-sm block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                
                <div>
                  <label for="stockAction" class="block text-sm font-medium text-gray-700">Tindakan</label>
                  <div class="mt-1">
                    <select 
                      id="stockAction" 
                      v-model="stockAction" 
                      class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    >
                      <option value="add">Tambah Stok</option>
                      <option value="subtract">Kurangi Stok</option>
                      <option value="set">Atur Stok Baru</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label for="stockAmount" class="block text-sm font-medium text-gray-700">
                    {{ stockActionLabel }}
                  </label>
                  <div class="mt-1">
                    <input 
                      type="number" 
                      id="stockAmount" 
                      v-model="stockAmount" 
                      min="0"
                      class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                
                <div>
                  <label for="newStock" class="block text-sm font-medium text-gray-700">Stok Baru</label>
                  <div class="mt-1">
                    <input 
                      type="text" 
                      id="newStock" 
                      :value="calculatedNewStock" 
                      disabled
                      class="bg-gray-100 shadow-sm block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                
                <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <input 
                      id="available" 
                      type="checkbox" 
                      v-model="available" 
                      class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                  </div>
                  <div class="ml-3 text-sm">
                    <label for="available" class="font-medium text-gray-700">Tersedia</label>
                    <p class="text-gray-500">Tandai jika kursi roda tersedia untuk disewa atau dibeli</p>
                  </div>
                </div>
                
                <div class="mt-6 flex justify-end space-x-3">
                  <NuxtLink 
                    to="/" 
                    class="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Batal
                  </NuxtLink>
                  <button 
                    type="submit" 
                    class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Update Stok
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const route = useRoute();
  const router = useRouter();
  const wheelchairId = computed(() => route.query.id || '1');
  
  // Simulasi data kursi roda (dalam aplikasi nyata, ini akan diambil dari API)
  const wheelchair = ref({
    id: wheelchairId.value,
    name: 'Kursi Roda Standard',
    type: 'Manual',
    price: 1500000,
    stock: 15,
    available: true,
    image: 'https://placehold.co/600x400?text=Wheelchair'
  });
  
  // State untuk form
  const stockAction = ref('add');
  const stockAmount = ref(0);
  const available = ref(true);
  
  // Mengambil data kursi roda
  onMounted(async () => {
    try {
      // Dalam aplikasi nyata, Anda akan mengambil data dari API
      // const data = await $fetch(`/api/wheelchairs/${wheelchairId.value}`);
      
      // Simulasi data
      const data = {
        id: wheelchairId.value,
        name: 'Kursi Roda Standard',
        type: 'Manual',
        price: 1500000,
        stock: 15,
        available: true,
        image: 'https://placehold.co/600x400?text=Wheelchair'
      };
      
      wheelchair.value = data;
      available.value = data.available;
    } catch (error) {
      console.error('Error fetching wheelchair data:', error);
      alert('Terjadi kesalahan saat mengambil data kursi roda');
    }
  });
  
  // Label untuk input jumlah stok berdasarkan tindakan yang dipilih
  const stockActionLabel = computed(() => {
    switch (stockAction.value) {
      case 'add':
        return 'Jumlah yang Ditambahkan';
      case 'subtract':
        return 'Jumlah yang Dikurangi';
      case 'set':
        return 'Jumlah Stok Baru';
      default:
        return 'Jumlah';
    }
  });
  
  // Menghitung stok baru berdasarkan tindakan yang dipilih
  const calculatedNewStock = computed(() => {
    const amount = parseInt(stockAmount.value) || 0;
    const currentStock = wheelchair.value.stock;
    
    switch (stockAction.value) {
      case 'add':
        return currentStock + amount;
      case 'subtract':
        return Math.max(0, currentStock - amount);
      case 'set':
        return amount;
      default:
        return currentStock;
    }
  });
  
  // Format harga dengan pemisah ribuan
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  
  // Fungsi untuk memperbarui stok kursi roda
  const updateStock = async () => {
    try {
      // Validasi input
      if (stockAction.value !== 'set' && stockAmount.value <= 0) {
        alert('Jumlah harus lebih dari 0');
        return;
      }
      
      // Dalam aplikasi nyata, Anda akan mengirim permintaan ke API
      // await $fetch(`/api/wheelchairs/${wheelchairId.value}/stock`, {
      //   method: 'PUT',
      //   body: {
      //     action: stockAction.value,
      //     amount: stockAmount.value,
      //     available: available.value
      //   }
      // });
      
      // Simulasi penundaan untuk menunjukkan proses
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Tampilkan notifikasi sukses (gunakan sistem notifikasi yang sesuai)
      alert('Stok kursi roda berhasil diperbarui');
      
      // Redirect ke halaman detail
      router.push('/');
    } catch (error) {
      console.error('Error updating wheelchair stock:', error);
      alert('Terjadi kesalahan saat memperbarui stok kursi roda');
    }
  };
  </script>