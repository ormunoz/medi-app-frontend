<template>
    <div class="modal" @click="closeModal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{ title }} {{ data[0].patients.name }} {{ data[0].patients.lastName }}</h5>
                </div>
                <div class="modal-body">
                    <div v-for="(item, index) in data" :key="index">
                        <h6>Pregunta N°{{ index +1 }}</h6>
                        <div>
                            <strong>Pregunta asociada:</strong> {{ item.option.questions.question }}
                        </div>
                        <div>
                            <strong>Opción seleccionada:</strong> {{ item.option.text }}
                            <strong>puntaje Individual :</strong> {{ item.option.score }}
                        </div>
                        <div>
                            <strong>puntaje Individual :</strong> {{ item.option.score }}
                        </div>
                        <hr />
                    </div>
                    <div>
                        <strong>Puntaje total del paciente:</strong> {{ data[0].patients.totalScore }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
  
<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import TextField from '@/components/general/atoms/TextField.vue'
import { QuestionService } from "@/service/questions/QuestionServices";
import { toast } from 'vue3-toastify';

export default defineComponent({
    props: {
        title: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        action: {
            type: String,
            required: true
        },
        questionId: {
            type: Number,
        },
        data: {
            type: Array,
        },

    },
    components: { TextField },
    setup(props, { emit }) {



        const closeModal = (event: any) => {
            if (event.target === event.currentTarget) {
                emit('close');
            }
        }

        return {
            closeModal,
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