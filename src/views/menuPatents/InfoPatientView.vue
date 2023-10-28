<template>
    <div>
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">Información del Usuario</h5>
                <p class="card-text">Rut: {{ patientDate.rut }}</p>
                <!-- <p class="card-text">Nombre: {{ patientDate.patients.name }}</p>
                <p class="card-text">Apellido: {{ patientDate.patients.last_name }}</p>
                <p class="card-text">Email: {{ patientDate.patients.email }}</p>
                <p class="card-text">Ciudad: {{ patientDate.patients.city }}</p> -->
                <span>{{ patientDate }}</span>

            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue'
import { UserService } from "../../service/users/UserServices";
import { patientOne } from "@/service/users/types";
import { useAuthStore } from "@/service/stores/auth";
import { toast } from 'vue3-toastify';

export default {
    name: 'TrainingList',
    setup() {
        const userService = new UserService();
        const patientDate = ref<patientOne[]>([]);
        const authStore = useAuthStore()
        const userId = ref<number>(authStore.user?.id || 0)
        const data = ref<any>()
        const loadData = async () => {
            try {
                const response = await userService.getOneUser(userId.value);
                if (response.code === 200) {
                    if (response.data) {
                        data.value = response.data.data;
                        patientDate.value = data.value;
                    }
                } else {
                    toast.warning("error al obtener al usuario logeado", {
                        autoClose: 4000,
                    });
                }
            } catch (error) {
                console.error(error);
            }
        };

        onMounted(loadData);

        return {
            patientDate,
            data
        }
    }
}
</script>
  

<style scoped>
body {
    background: var(--light);
}

.no-scroll {
    overflow-y: hidden;
    overflow-x: auto;
}
</style>