<template>
  <Menubar :model="items" class="bg-blue-300">
    <template #end>
      <!-- <Button label="Login" icon="pi pi-user" @click="visible = true" /> -->
      <FormAuthComponent />
    </template>
  </Menubar>

  <!-- Dialog -->

</template>

<script setup>
import { ref } from "vue";
import FormAuthComponent from "../components/FormAuthComponent.vue";
import Menubar from "primevue/menubar";
import Button from "primevue/button";

import { storeToRefs } from "pinia";
import { useAuthStore } from "../stores/authStores";

const authStores = useAuthStore();

// State pinia
const { dialog } = storeToRefs(authStores);


// const visible = ref(false);

const items = ref([
  {
    label: "Home",
    icon: "pi pi-home",
  },
  {
    label: "Features",
    icon: "pi pi-star",
  },
  {
    label: "Projects",
    icon: "pi pi-search",
    items: [
      {
        label: "Components",
        icon: "pi pi-bolt",
      },
      {
        label: "Blocks",
        icon: "pi pi-server",
      },
      {
        label: "UI Kit",
        icon: "pi pi-pencil",
      },
    ],
  },
  {
    label: "Contact",
    icon: "pi pi-envelope",
  },
]);
</script>
