<template>
    <main id="HomeView" class="no-scroll">
        <!-- Display a table with data if not loading -->
        <TableComponent v-if="!loading" :items="trainingRecords" :order="true" :columns="columns" :showButtons="showButtons"
            :searchTableData=searchTableData :buttons=buttons />
        <!-- Display a loading spinner if loading data -->
        <div style="display: flex; justify-content: center;">
            <div class="spinner-border text-info" v-if="loading">
                <span class="sr-only"></span>
            </div>
        </div>
        <!-- Display a patient information modal when showModal is true -->
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
        const loading = ref<boolean>(false);
        const userService = new UserService();
        const action = ref<string>();
        const title = ref<string>();
        const showButtons = computed(() => true)
        const trainingRecords = ref<Profesional[]>([]);
        const patientView = ref<any>([]);
        const columns = ref([{ name: 'rut', label: 'Rut' }, { name: 'name', label: 'Name' }, { name: 'lastName', label: 'Last Name' }, { name: 'city', label: 'City' },
        { name: 'totalScore', label: 'Total Score' }, { name: 'profesionalName', label: 'Assigned Professional' }, { name: 'especiality', label: 'Professional Speciality' }])
        const searchTableData = ref(['name', 'lastName', 'especiality'])

        // Load patient data when the component is mounted
        const loadData = async () => {
            try {
                loading.value = true
                const response = await userService.getPatient();
                if (response.code === 200) {
                    if (response.data) {
                        const data = response.data.data;
                        trainingRecords.value = data;
                        trainingRecords.value = data.map((item: any) => ({
                            ...item, rut: item.user.rut,
                            profesionalName: item.profesional ? item.profesional.name + ' ' + item.profesional.lastName : 'Not Registered',
                            especiality: item.profesional ? item.profesional.especiality : 'Not Registered'
                        }));
                    } else {
                        toast.info("No hay Pacientes registrados", {
                            autoClose: 4000,
                        });
                    }
                } else {
                    toast.info("Error al obtener a los Pacientes", {
                        autoClose: 4000,
                    });
                }
                loading.value = false
            } catch (error) {
                loading.value = false
                console.error(error);
            }
        };

        // Execute the load data function when the component is mounted
        onMounted(loadData);

        // Function to display patient information modal
        const listTable = async (record: any) => {
            title.value = 'Patient Information'
            const response = await userService.getUserOption(record.id);
            patientView.value = response.data.data
            showModal.value = true
        }

        const buttons = ref([
            { id: 1, name: 'View', action: listTable, className: 'btn btn-outline-secondary me-3', iconName: 'preview' },
        ])

        // Close the modal and reload the data
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
            closeModal,
            loading
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