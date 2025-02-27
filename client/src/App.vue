<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";

const dataMessage = ref(null); // Awalnya null atau string kosong

const getMessage = async () => {
  try {
    const response = await axios.get("http://localhost:3000/");
    dataMessage.value = response.data; // Assign hasil response ke dataMessage
  } catch (error) {
    console.error("Error fetching message:", error);
  }
};

onMounted(() => {
  getMessage();
});
</script>

<template>
  <h1>
    <RouterLink to="/">Home</RouterLink>
    {{ dataMessage }}
  </h1>
</template>
