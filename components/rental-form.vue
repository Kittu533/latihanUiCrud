<!-- <template>
    <form @submit.prevent="handleSubmit">
      <input v-model="formData.name" placeholder="Rental Name" class="border p-2 w-full mb-2" />
      <input v-model="formData.date" type="date" class="border p-2 w-full mb-2" />
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded" :disabled="isSubmitting">
        {{ isSubmitting ? 'Saving...' : 'Save' }}
      </button>
      <p v-if="errorMessage" class="text-red-500 mt-2">{{ errorMessage }}</p>
    </form>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import type { Rental } from '@/types/rental';
  
  const props = defineProps<{ onSubmit: (data: Omit<Rental, 'id'>) => void, initialData: Omit<Rental, 'id'> }>();
  
  const formData = ref({ ...props.initialData });
  const errorMessage = ref<string | null>(null);
  const isSubmitting = ref<boolean>(false);
  
  const handleSubmit = async () => {
    if (!formData.value.name || !formData.value.date) {
      errorMessage.value = 'All fields are required!';
      return;
    }
    isSubmitting.value = true;
    errorMessage.value = null;
    await props.onSubmit(formData.value);
    isSubmitting.value = false;
  };
  </script>
  
  -->

  <template>
    <form @submit.prevent="handleSubmit">
      <input v-model="formData.name" placeholder="Rental Name" class="border p-2 w-full mb-2" />
      <input v-model="formData.date" type="date" class="border p-2 w-full mb-2" />
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">
        Save
      </button>
    </form>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import type { Rental } from '@/types/rental';
  
  const props = defineProps<{ onSubmit: (data: Omit<Rental, 'id'>) => void, initialData: Omit<Rental, 'id'> }>();
  
  const formData = ref({ ...props.initialData });
  
  const handleSubmit = () => {
    if (!formData.value.name || !formData.value.date) {
      alert('All fields are required!');
      return;
    }
    props.onSubmit(formData.value);
  };
  </script>
  