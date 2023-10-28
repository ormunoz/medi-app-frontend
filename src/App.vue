<template>
  <div class="app">
    <!-- Sidebar -->
    <SideBar v-if="isLoggedIn && !isLoginOrRegisterRoute && admin "/>
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
    const admin = ref<boolean>(false);
    const isLoggedIn: any = computed(async () => {
      const hasValidSession = await authService.hasValidUserSession();
      if (hasValidSession) {
        const authToken = authStore.user;
        if (authToken?.role === 'ADMIN') {
          return admin.value = true;
        } else {
          if (authToken?.role === 'PATIENT') {
            admin.value = true
            return router.push({ name: 'info_patient' });
          } else {
            admin.value = false
            return router.push({ name: '/' });
          }
        }
      }
    });

    const isLoginOrRegisterRoute = computed(() => {
      return router.currentRoute.value.name === "/";
    });

    return {
      isLoggedIn,
      isLoginOrRegisterRoute,
      admin
    };
  }
});
</script>

<style lang="scss">
:root {
  --primary: rgb(88, 240, 194);
  --primary-alt: #22c55e;
  --grey: #64748b;
  --dark: #1e293b;
  --dark-alt: #334155;
  --light: #94aac0;
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