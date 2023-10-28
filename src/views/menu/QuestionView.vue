<template>
    <main id="HomeView" class="no-scroll">
        <div class="card">
            <div class="card-body">
                <h1 class="card-title">Menu de Preguntas</h1>
                <Accordion :id="questionAccordionId" :items="questionOption" dataToggle="collapse" @edit-option="editOption"
                    @delete-option="deleteOption" @add-option="addOption" @add-question="addQuestion"
                    @edit-question="editQuestion" @delete-question="deleteQuestion">
                </Accordion>

                <ModalComponent v-if="showModal" @close="closeModal" :action="action" :title="title"
                    :data="questionOptionAdd" :type="type" :questionId="questionId">
                </ModalComponent>
            </div>
        </div>
    </main>
</template>

<script lang="ts">
import { ref, computed, onMounted, inject } from 'vue';
import { QuestionService } from "../../service/questions/QuestionServices";
import { QuestionOption, QuestionOptionAdd } from "@/service/questions/types";
import Accordion from "@/components/general/atoms/Accordion.vue";
import ModalComponent from "@/components/general/molecule/ModalComponent.vue"
import { toast } from 'vue3-toastify';
import $swal from 'sweetalert2';

export default {
    name: 'TrainingList',
    components: {
        Accordion,
        ModalComponent
    },
    setup() {

        const questionService = new QuestionService();
        const questionAccordionId = ref<string>('questionAccordion');
        const action = ref<string>();
        const title = ref<string>();
        const type = ref<string>();
        const questionId = ref<number>();
        const showModal = ref<boolean>(false);
        const questionOption = ref<QuestionOption[]>([]);
        const questionOptionAdd = ref<QuestionOptionAdd[]>();

        const loadData = async () => {
            try {
                const response = await questionService.getQuestion();
                if (response.code === 200) {
                    if (response.data) {
                        const data = response.data.data;
                        data.forEach((question: QuestionOption) => {
                            question.expanded = false;
                        });
                        questionOption.value = data;
                    } else {
                        toast.warning("No hay preguntas registradas", {
                            autoClose: 4000,
                        });
                    }
                } else {
                    toast.warning("Error al obtener las preguntas", {
                        autoClose: 4000,
                    });
                }
            } catch (error) {
                console.error(error);
            }
        };

        const toggleQuestion = (question: QuestionOption) => {
            question.expanded = !question.expanded;
        };

        onMounted(loadData);

        const editOption = (selectOption: any, question: number) => {
            action.value = 'edit'
            title.value = 'Editar Alternativa'
            type.value = 'option'
            questionId.value = question
            questionOptionAdd.value = selectOption
            showModal.value = true
        }

        const editQuestion = (question: any) => {
            action.value = 'edit'
            title.value = 'Editar Pregunta'
            type.value = 'question'
            questionOptionAdd.value = question
            showModal.value = true
        }

        const addQuestion = (countOption: number) => {
            if (countOption >= 5) {
                toast.warning("no se puede agregar mas de 5 preguntas", {
                    autoClose: 4000,
                });
            } else {
                action.value = 'add'
                title.value = 'Crear Pregunta'
                type.value = 'question'
                showModal.value = true
            }
        }

        const addOption = (countOption: number, question: number) => {
            if (countOption >= 3) {
                toast.warning("no se puede agregar mas de 3 alternativas", {
                    autoClose: 4000,
                });
            } else {
                action.value = 'add'
                title.value = 'Agregar Alternativa'
                type.value = 'option'
                questionId.value = question
                showModal.value = true
            }
        }

        const deleteOption = async (option: number) => {
            const result = await $swal.fire({
                title: '¿Estás seguro de que quieres eliminar esta alternativa?',
                text: 'Esta acción no se puede deshacer.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'No, cancelar',
            });

            if (result.isConfirmed) {
                const response = await questionService.optionDelete(option);
                toast.success("Alternativa eliminada con exito", {
                    autoClose: 4000,
                });
                loadData()
            }
        }

        const deleteQuestion = async (question: number) => {
            const result = await $swal.fire({
                title: '¿Estás seguro de que quieres eliminar esta Pregunta?',
                text: 'Al eliminar la pregunta se eliminaran todas las alternativas.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'No, cancelar',
            });

            if (result.isConfirmed) {
                const response = await questionService.questionDelete(question);
                toast.success("Pregunta eliminada con exito", {
                    autoClose: 4000,
                });
                loadData()
            }
        }

        const closeModal = () => {
            showModal.value = false
            questionOptionAdd.value = []
            loadData()
        }

        return {
            questionOption,
            toggleQuestion,
            questionAccordionId,
            editOption,
            deleteOption,
            addOption,
            addQuestion,
            editQuestion,
            deleteQuestion,
            showModal,
            action,
            title,
            questionOptionAdd,
            type,
            closeModal,
            questionId
        };
    },
};
</script>
  
<style scoped>
body {
    background: var(--light);
}

.no-scroll {
    overflow-y: hidden;
    /* Oculta el desplazamiento vertical */
    overflow-x: auto;
    /* Permite el desplazamiento horizontal si es necesario */
}
</style>
  