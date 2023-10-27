<template>
    <div class="modal" @click="closeModal($event)">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{ action }}</h5>
                </div>
                <div class="modal-body">
                    <TextField v-model="profesionalAdd.rut" :type="'text'" label="Rut" placeholder="Escribir tu rut"
                        class="mb-3" />
                    <TextField v-if="action == 'add'" v-model="profesionalAdd.password" :type="'password'"
                        label="Contraseña" placeholder="Escribir una contraseña" class="mb-3" />
                    <TextField v-model="profesionalAdd.especiality" :type="'text'" label="Especialidad"
                        placeholder="Escribir la especialidad" class="mb-3" />
                    <TextField v-model="profesionalAdd.name" :type="'text'" label="Nombre" placeholder="Escribir el nombre"
                        class="mb-3" />
                    <TextField v-model="profesionalAdd.lastName" :type="'text'" label="Apellido"
                        placeholder="Escribir el pellido" class="mb-3" />
                    <TextField v-model="profesionalAdd.minScore" :type="'number'" label="Puntaje min aceptado"
                        placeholder="puntaje min aceptado" class="mb-3" />
                    <TextField v-model="profesionalAdd.maxScore" :type="'number'" label="Puntaje max aceptado"
                        placeholder="puntaje max aceptado" class="mb-3" />
                </div>
                <div class="modal-footer">
                    <button type="button" @click="closeModal" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                    <button v-if="action == 'edit'" class="btn btn-warning me-2" @click="saveChange">Editar</button>
                    <button v-else class="btn btn-success me-2" @click="saveChange">Agregar</button>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import TextField from '@/components/general/atoms/TextField.vue'
import { toast } from 'vue3-toastify';
import { ProfesionalAdd } from "@/service/users/types";
import { UserService } from "@/service/users/UserServices";

export default defineComponent({
    props: {
        title: {
            type: String,
            required: true
        },
        action: {
            type: String,
            required: true
        },
        data: {
            type: Object,
        },

    },
    components: { TextField },
    setup(props, { emit }) {

        const userService = new UserService();
        const action = ref<any>(props.action || '');
        const profesionalAdd = ref<ProfesionalAdd>({
            id: props.data?.id || 0,
            user_id: props.data?.user?.id || 0,
            rut: props.data?.rut || '',
            role: 'ADMIN',
            password: props.data?.password || '',
            especiality: props.data?.especiality || '',
            name: props.data?.name || '',
            lastName: props.data?.lastName || '',
            minScore: props.data?.minScore || 0,
            maxScore: props.data?.maxScore || 0,
        });

        const saveChange = async () => {
            if (profesionalAdd.value.minScore >= profesionalAdd.value.maxScore) {
                toast.warning("El puntaje minimo debe ser inferior al maximo", {
                    autoClose: 4000,
                });
            } else {
                if (action.value == 'add') {
                    const response = await userService.addProfesional(profesionalAdd.value);
                    if (response.code == 200) {
                        toast.success("Profesional Registrado", {
                            autoClose: 4000,
                        });
                        emit('close');
                    } else {
                        toast.warning("Debe llenar todos los campos, no debe existir un rut o especialidad igual", {
                            autoClose: 4000,
                        });
                    }
                } else {
                    const response = await userService.updateProfesional(profesionalAdd.value);
                    if (response.code == 200) {
                        toast.success("Profesional Actualizado", {
                            autoClose: 4000,
                        });
                        emit('close');
                    } else {
                        toast.warning("Debe llenar todos los campos, no debe existir un rut o especialidad igual", {
                            autoClose: 4000,
                        });
                    }
                }
            }

        }

        const closeModal = (event: any) => {
            if (event.target === event.currentTarget) {
                emit('close');
            }
        }

        return {
            closeModal,
            saveChange,
            profesionalAdd
        }

    }
});
</script>
  
<style scoped>
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
}

.modal-dialog {
    max-width: 100%;
}

.modal-content {
    background-color: rgb(255, 255, 255);
    border-radius: 10px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    width: 190%;
    height: 190%;
}

.modal-header {
    background-color: #f8f9fa;
    padding: 1rem;
    border-bottom: 1px solid #dee2e6;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    font-weight: bold;
}

.close {
    outline: none;
    border: none;
    background-color: transparent;
    font-size: 1.5rem;
    cursor: pointer;
}
</style>