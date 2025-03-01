import { defineStore } from "pinia";
import { ref, computed } from "vue";
import customFetch from "@/api";

export const useAuthStore = defineStore("user", () => {
  const dialog = ref(false);
  const errorMsg = ref(null);
  const errorAlert = ref(false);
  const currentUser = ref(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );

  const LoginUser = async (inputData) => {
    try {
      const { data } = await customFetch.post("/auth/login", {
        email: inputData.email,
        password: inputData.password,
      });
      localStorage.setItem("user", JSON.stringify(data));
      currentUser.value = data;
      console.log(data);
      dialog.value = false;
    } catch (error) {
      errorAlert.value = true;
      errorMsg.value = error.response.data.message;
      console.log(error);
    }
    //
  };
  return { dialog, LoginUser, errorMsg, errorAlert, currentUser };
});
