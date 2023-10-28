<template>
    <main id="HomeView" class="no-scroll">
        <TableComponent :items="trainingRecords" :order="true" :columns="columns" :showButtons="showButtons"
            :searchTableData=searchTableData :buttons=buttons />

        <ModalPatientComponent v-if="showModal" @close="closeModal" :action="action" :title="title" :data="patientView">
        </ModalPatientComponent>
    </main>
</template>
  
<script lang="ts">
import { ref, computed, onMounted } from 'vue'
import TableComponent from '@/components/general/molecule/TableComponent.vue';
import { UserService } from "../../service/users/UserServices";
import { Profesional } from "@/service/users/types";
import ModalPatientComponent from "../../components/general/molecule/ModalPatientComponent.vue"
import { toast } from 'vue3-toastify';

export default {
    name: 'TrainingList',
    components: {
        TableComponent, ModalPatientComponent
    },
    setup() {
        const showModal = ref<boolean>(false);
        const userService = new UserService();
        const action = ref<string>();
        const title = ref<string>();
        const showButtons = computed(() => true)
        const trainingRecords = ref<Profesional[]>([]);
        const patientView = ref<any>([]);
        const columns = ref([{ name: 'rut', label: 'Rut' }, { name: 'name', label: 'Nombre' }, { name: 'lastName', label: 'Apellido' }, { name: 'city', label: 'Ciudad' },
        { name: 'totalScore', label: 'Puntaje Total' }, { name: 'profesionalName', label: 'Profesional Asignado' }, { name: 'especiality', label: 'Especialidad del Profesional' }])
        const searchTableData = ref(['name', 'lastName', 'especiality'])


        const loadData = async () => {
            try {
                const response = await userService.getPatient();
                if (response.code === 200) {
                    if (response.data) {
                        const data = response.data.data;
                        trainingRecords.value = data;
                        trainingRecords.value = data.map((item: any) => ({
                            ...item, rut: item.user.rut,
                            profesionalName: item.profesional ? item.profesional.name + ' ' + item.profesional.lastName : 'No Registrado',
                            especiality: item.profesional ? item.profesional.especiality : 'No Registrado'
                        }));
                    } else {
                        toast.info("No hay profesionales registrados", {
                            autoClose: 4000,
                        });
                    }
                } else {
                    toast.info("Error al obtener a los profesionales", {
                        autoClose: 4000,
                    });
                }
            } catch (error) {
                console.error(error);
            }
        };

        onMounted(loadData);

        const listTable = async (registro: any) => {
            title.value = 'Datos del paciente'
            const response = await userService.getUserOption(registro.id);
            patientView.value = response.data.data
            showModal.value = true
        }

        const buttons = ref([
            { id: 1, name: 'Ver', action: listTable, className: 'btn btn-outline-secondary me-3', iconName: 'preview' },
        ])


        const closeModal = () => {
            showModal.value = false
            loadData()
        }
        return {
            trainingRecords,
            columns,
            showButtons,
            searchTableData,
            showModal,
            buttons,
            patientView,
            title,
            closeModal
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