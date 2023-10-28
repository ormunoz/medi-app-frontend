<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-12 text-center mt-4">
                    <div>
                        <img src="../../assets/logo.png" alt="logo" class="img-circle"
                            style="max-width: 200px; max-height: 200px;" />
                    </div>
                </div>
                <div class="col">
                    <div class="card mx-auto p-4 mt-2" style="max-width: 360px">
                        <p class="text-center"><b>Rut y/o Usuario: </b>{{ rut }}</p>
                        <p class="text-center"><b>Nombre y Apellido: </b>{{ namePatient }} {{ lastName }}</p>
                        <p class="text-center"><b>Email: </b>{{ email }}</p>
                        <p class="text-center"><b>Ciudad: </b>{{ city }}</p>
                        <p class="text-center"><b>Profesional Asignado: </b> {{ nameProfesional }} {{ lastNameProfesional }}</p>
                        <p class="text-center"><b>Especialidad: </b> {{ especiality }}</p>
                    </div>
                </div>
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
        const authStore = useAuthStore();
        const userId = ref<number>(authStore.user?.id || 0);
        const rut = ref<string>();
        const namePatient = ref<string>();
        const lastName = ref<string>();
        const email = ref<string>();
        const city = ref<string>();
        const nameProfesional = ref<string>();
        const lastNameProfesional = ref<string>();
        const especiality = ref<string>();

        const loadData = async () => {
            try {
                const response = await userService.getOneUser(userId.value);
                if (response.code === 200) {
                    if (response.data) {
                        const data = response.data.data;
                        rut.value = data.rut
                        namePatient.value = data.patients[0].name
                        lastName.value = data.patients[0].lastName
                        email.value = data.patients[0].email
                        city.value = data.patients[0].city
                        nameProfesional.value = data.patients[0].profesional.name
                        lastNameProfesional.value = data.patients[0].profesional.lastName
                        especiality.value = data.patients[0].profesional.especiality
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
            rut,
            patientDate,
            namePatient,
            lastName,
            email,
            city,
            nameProfesional,
            especiality,
            lastNameProfesional
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