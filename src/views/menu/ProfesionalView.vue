<template>
    <main id="HomeView" class="no-scroll">
        <TableComponent :items="trainingRecords" :order="true" :columns="columns" :showButtons="showButtons"
            :searchTableData=searchTableData :itsAdmin=true :buttons="buttons"  @add="addProfesional" />

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
        const showButtons = computed(() => true)
        const trainingRecords = ref<Profesional[]>([]);
        const sendProfesional = ref<ProfesionalAdd[]>([]);
        const action = ref<string>('');
        const title = ref<string>('');
        const columns = ref([{ name: 'rut', label: 'Rut o Usuario' }, { name: 'name', label: 'Nombre' }, { name: 'lastName', label: 'Apellido' }, { name: 'especiality', label: 'Especialidad' },
        { name: 'minScore', label: 'Puntaje Minimo' }, { name: 'maxScore', label: 'Puntaje Maximo' }])
        const searchTableData = ref(['name', 'lastName', 'especiality'])


        const loadData = async () => {
            try {
                const response = await userService.getProfesional();
                if (response.code === 200) {
                    if (response.data) {
                        const data = response.data.data;
                        trainingRecords.value = data;
                        trainingRecords.value = data.map((item: any) => ({ ...item, rut: item.user.rut }));
                    } else {
                        console.log("No hay profesionales registrados");
                    }
                } else {
                    console.log("Error al obtener los miembros del comité");
                }
            } catch (error) {
                console.error(error);
            }
        };

        onMounted(loadData);

        const addProfesional = () => {
            action.value = 'add'
            title.value = 'Agregar Profesional'
            showModal.value = true
        }

        const updateTable = (registro: any) => {
            action.value = 'edit'
            title.value = 'Editar Profesional'
            sendProfesional.value = registro
            showModal.value = true
        }

        const deleteTable = async (profesional: any) => {
            const result = await $swal.fire({
                title: '¿Estás seguro de que quieres eliminar esta este profesional?',
                text: 'esta accion prodria perjudicar a los pacientes que tengan asociado a este profesional',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'No, cancelar',
            });

            if (result.isConfirmed) {
                const response = await userService.deleteProfesional(profesional.id);
                toast.success("Profesional eliminado con exito", {
                    autoClose: 4000,
                });
                loadData()
            }
        }


        const buttons = ref([
            // { id: 1, name: 'Ver', action: listTable, className: 'bg-gray-600 text-white hover:bg-gray-500 focus:bg-gray-500', iconName: 'eye' },
            { id: 2, name: 'Editar', action: updateTable, className: 'btn btn-outline-warning me-3', iconName: 'edit' },
            { id: 3, name: 'Eliminar', action: deleteTable, className: 'btn btn-outline-danger me-3', iconName: 'delete' }
        ])



        const closeModal = () => {
            showModal.value = false
            sendProfesional.value=[]
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
            sendProfesional
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