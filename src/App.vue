<template>
  <div class="app">
    <!-- Sidebar -->
    <SideBar v-if="isLoggedIn && !isLoginOrRegisterRoute" />
    <!-- Content -->
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import { useRouter } from "vue-router";
import SideBar from "@/components/layout/SideBar.vue";
import { AuthService } from "@/service/auth/AuthServices";
import { useAuthStore } from './service/stores/auth'

export default defineComponent({
  components: { SideBar },
  setup(props) {
    const authStore = useAuthStore();
    const router = useRouter();
    const authService = new AuthService()
    const isLoggedIn = true
    // const isLoggedIn: any = computed(async () => {
    //   const hasValidSession = await authService.hasValidUserSession();
    //   if (hasValidSession) {
    //     const authToken = authStore.user;
    //     if (authToken?.role === 'ADMIN') {
    //       return isLoggedIn.value = true;
    //     } else {
    //       return router.push({ name: 'login' });
    //     }
    //   } else {
    //     return router.push({ name: 'login' });
    //   }
    // });

    const isLoginOrRegisterRoute = computed(() => {
      return router.currentRoute.value.name === "login" || router.currentRoute.value.name === "register";
    });

    return {
      isLoggedIn,
      isLoginOrRegisterRoute,
    };
  }
});
</script>

<style lang="scss">
:root {
  --primary: #4ade80;
  --primary-alt: #22c55e;
  --grey: #64748b;
  --dark: #1e293b;
  --dark-alt: #334155;
  --light: #f1f5f9;
  --sidebar-width: 300px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Fira sans', sans-serif;
}

button {
  cursor: pointer;
  appearance: none;
  border: none;
  outline: none;
  background: none;
}

.app {
  display: flex;

  main {
    flex: 1 1 0;
    padding: 2rem;

    @media (max-width: 1024px) {
      padding-left: 6rem;
    }
  }
}
</style>