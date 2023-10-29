<template>
    <main id="HomeView" class="no-scroll">
        <!-- Display a table with professional records if not loading -->
        <TableComponent v-if="!loading" :items="trainingRecords" :order="true" :columns="columns" :showButtons="showButtons"
            :searchTableData="searchTableData" :itsAdmin=true :buttons="buttons" @add="addProfesional" />
        <!-- Display a loading spinner if loading data -->
        <div style="display: flex; justify-content: center;">
            <div class="spinner-border text-info" v-if="loading">
                <span class="sr-only"></span>
            </div>
        </div>
        <!-- Display a professional information modal when showModal is true -->
        <ModalProfesionalComponent v-if="showModal" @close="closeModal" :action="action" :title="title"
            :data="sendProfesional">
        </ModalProfesionalComponent>
    </main>
</template>

<script lang="ts">
import { ref, computed, onMounted, inject } from 'vue'
import TableComponent from '@/components/general/molecule/TableComponent.vue';
import { UserService } from "../../service/users/UserServices";
import { Profesional, ProfesionalAdd } from "@/service/users/types";
import ModalProfesionalComponent from "../../components/general/molecule/ModalProfesionalComponente.vue"
import { toast } from 'vue3-toastify';
import $swal from 'sweetalert2';

export default {
    name: 'TrainingList',
    components: {
        TableComponent, ModalProfesionalComponent
    },
    setup() {
        const userService = new UserService();
        const showModal = ref<boolean>(false);
        const loading = ref<boolean>(false);
        const showButtons = computed(() => true)
        const trainingRecords = ref<Profesional[]>([]);
        const sendProfesional = ref<ProfesionalAdd[]>([]);
        const action = ref<string>('');
        const title = ref<string>('');
        const columns = ref([{ name: 'rut', label: 'Rut or User' }, { name: 'name', label: 'Name' }, { name: 'lastName', label: 'Last Name' }, { name: 'especiality', label: 'Speciality' },
        { name: 'minScore', label: 'Minimum Score' }, { name: 'maxScore', label: 'Maximum Score' }])
        const searchTableData = ref(['name', 'lastName', 'especiality'])

        // Load professional data when the component is mounted
        const loadData = async () => {
            try {
                loading.value = true
                const response = await userService.getProfesional();
                if (response.code === 200) {
                    if (response.data) {
                        const data = response.data.data;
                        trainingRecords.value = data;
                        trainingRecords.value = data.map((item: any) => ({ ...item, rut: item.user.rut }));
                    } else {
                        toast.warning("Error fetching professionals", {
                            autoClose: 4000,
                        });
                    }
                } else {
                    toast.warning("Error fetching professionals", {
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

        // Function to add a professional
        const addProfesional = () => {
            action.value = 'add'
            title.value = 'Add Professional'
            showModal.value = true
        }

        // Function to update professional data
        const updateTable = (registro: any) => {
            action.value = 'edit'
            title.value = 'Edit Professional'
            sendProfesional.value = registro
            showModal.value = true
        }

        // Function to delete a professional
        const deleteTable = async (profesional: any) => {
            const result = await $swal.fire({
                title: 'Are you sure you want to delete this professional?',
                text: 'This action could impact patients associated with this professional',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete',
                cancelButtonText: 'No, cancel',
            });

            if (result.isConfirmed) {
                const response = await userService.deleteProfesional(profesional.user.id);
                toast.success("Professional deleted successfully", {
                    autoClose: 4000,
                });
                loadData()
            }
        }

        const buttons = ref([
            { id: 2, name: 'Edit', action: updateTable, className: 'btn btn-outline-warning me-3', iconName: 'edit' },
            { id: 3, name: 'Delete', action: deleteTable, className: 'btn btn-outline-danger me-3', iconName: 'delete' }
        ])

        // Close the modal and reload the data
        const closeModal = () => {
            showModal.value = false
            sendProfesional.value = []
            loadData()
        }

        return {
            trainingRecords,
            columns,
            showButtons,
            searchTableData,
            buttons,
            addProfesional,
            showModal,
            closeModal,
            action,
            title,
            sendProfesional,
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