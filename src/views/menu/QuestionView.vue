<template>
    <main id="HomeView" class="no-scroll">
        <div class="card">
            <div class="card-body">
                <h1 class="card-title">Menu Preguntas Creadas</h1>

                <!-- Display an accordion component for questions if not loading -->
                <Accordion v-if="!loading" :id="questionAccordionId" :items="questionOption" dataToggle="collapse"
                    @edit-option="editOption" @delete-option="deleteOption" @add-option="addOption"
                    @add-question="addQuestion" @edit-question="editQuestion" @delete-question="deleteQuestion">
                </Accordion>

                <!-- Display a loading spinner if loading data -->
                <div style=" display: flex; justify-content: center;">
                    <div class="spinner-border text-info" v-if="loading">
                        <span class="sr-only"></span>
                    </div>
                </div>

                <!-- Display a modal for questions when showModal is true -->
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
        const loading = ref<boolean>(false);
        const questionOption = ref<QuestionOption[]>([]);
        const questionOptionAdd = ref<QuestionOptionAdd[]>();

        // Load question data when the component is mounted
        const loadData = async () => {
            try {
                loading.value = true;
                const response = await questionService.getQuestion();
                if (response.code === 200) {
                    if (response.data) {
                        const data = response.data.data;
                        data.forEach((question: QuestionOption) => {
                            question.expanded = false;
                        });
                        questionOption.value = data;
                    } else {
                        toast.warning("No questions are registered", {
                            autoClose: 4000,
                        });
                    }
                } else {
                    toast.warning("Error fetching questions", {
                        autoClose: 4000,
                    });
                }
                loading.value = false;
            } catch (error) {
                loading.value = false;
                console.error(error);
            }
        };

        // Function to toggle the expansion of a question
        const toggleQuestion = (question: QuestionOption) => {
            question.expanded = !question.expanded;
        };

        // Execute the load data function when the component is mounted
        onMounted(loadData);

        // Function to edit an option of a question
        const editOption = (selectOption: any, question: number) => {
            action.value = 'edit';
            title.value = 'Edit Option';
            type.value = 'option';
            questionId.value = question;
            questionOptionAdd.value = selectOption;
            showModal.value = true;
        }

        // Function to edit a question
        const editQuestion = (question: any) => {
            action.value = 'edit';
            title.value = 'Edit Question';
            type.value = 'question';
            questionOptionAdd.value = question;
            showModal.value = true;
        }

        // Function to add a new question
        const addQuestion = (countOption: number) => {
            if (countOption >= 5) {
                toast.warning("You cannot add more than 5 questions", {
                    autoClose: 4000,
                });
            } else {
                action.value = 'add';
                title.value = 'Create Question';
                type.value = 'question';
                showModal.value = true;
            }
        }

        // Function to add a new option to a question
        const addOption = (countOption: number, question: number) => {
            if (countOption >= 3) {
                toast.warning("You cannot add more than 3 options", {
                    autoClose: 4000,
                });
            } else {
                action.value = 'add';
                title.value = 'Add Option';
                type.value = 'option';
                questionId.value = question;
                showModal.value = true;
            }
        }

        // Function to delete an option of a question
        const deleteOption = async (option: number) => {
            const result = await $swal.fire({
                title: 'Are you sure you want to delete this option?',
                text: 'This action cannot be undone.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete',
                cancelButtonText: 'No, cancel',
            });

            if (result.isConfirmed) {
                const response = await questionService.optionDelete(option);
                toast.success("Option deleted successfully", {
                    autoClose: 4000,
                });
                loadData();
            }
        }

        // Function to delete a question
        const deleteQuestion = async (question: number) => {
            const result = await $swal.fire({
                title: 'Are you sure you want to delete this question?',
                text: 'Deleting the question will also delete all the options.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete',
                cancelButtonText: 'No, cancel',
            });

            if (result.isConfirmed) {
                const response = await questionService.questionDelete(question);
                toast.success("Question deleted successfully", {
                    autoClose: 4000,
                });
                loadData();
            }
        }

        // Function to close the modal
        const closeModal = () => {
            showModal.value = false;
            questionOptionAdd.value = [];
            loadData();
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
            questionId,
            loading
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
  