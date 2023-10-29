<template>
  <div class="modal" @click="closeModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ title }} </h5>
        </div>
        <div class="modal-body">
          <slot v-if="type === 'question'">
            <TextField v-model="indice" type="number" label="orden a elegir"
              placeholder="Escriba el orden que quiere verlo" />
            <TextField v-model="question" type="text" label="Escribir Pregunta" placeholder="Escribir Pregunta" />
            <div class="modal-footer">
              <button type="button" @click="closeModal" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>

              <button v-if="action == 'edit'" class="btn btn-warning me-2 " @click="saveChange" :disabled="loading">
                {{ loading ? '' : 'Editar' }}
                <div class="spinner-border text-info" v-if="loading" role="status">
                  <span class="sr-only"></span>
                </div>
              </button>

              <button v-else class="btn btn-success me-2 " @click="saveChange" :disabled="loading">
                {{ loading ? '' : 'Agregar' }}
                <div class="spinner-border text-info" v-if="loading" role="status">
                  <span class="sr-only"></span>
                </div>
              </button>

            </div>
          </slot>
          <slot v-else-if="type === 'option'">
            <div>
              <TextField v-model="indice" type="number" label="orden a elegir"
                placeholder="Escriba el orden que quiere verlo" />
              <TextField v-model="text" type="text" label="Escribir Alternativa" placeholder="Escribir Alternativa" />
              <TextField v-model="score" type="number" label="Puntaje" placeholder="Puntaje" />
            </div>
            <div class="modal-footer">
              <button type="button" @click="closeModal" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
              
              <button v-if="action == 'edit'" class="btn btn-warning me-2 " @click="saveChange" :disabled="loading">
                {{ loading ? '' : 'Editar' }}
                <div class="spinner-border text-info" v-if="loading" role="status">
                  <span class="sr-only"></span>
                </div>
              </button>

              <button v-else class="btn btn-success me-2 " @click="saveChange" :disabled="loading">
                {{ loading ? '' : 'Guardar' }}
                <div class="spinner-border text-info" v-if="loading" role="status">
                  <span class="sr-only"></span>
                </div>
              </button>

            </div>
          </slot>
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
      type: Object,
    },

  },
  components: { TextField },
  setup(props, { emit }) {
    const questionService = new QuestionService();
    const question = ref<any>(props.data?.question || '');
    const score = ref<any>(props.data?.score || '');
    const indice = ref<any>(props.data?.indice || 0);
    const text = ref<string>(props.data?.text || 0);
    const questionId = ref<number>(props.questionId || 0);
    const id = ref<number>(props.data?.id || 0);
    const loading = ref<boolean>(false)



    const saveChange = async () => {
      loading.value = true
      if (props.action == 'edit') {
        if (props.type == 'option') {
          const response = await questionService.optionUpdate(id.value, score.value, text.value, indice.value);
          if (response.code == 200) {
            toast.success("option agregada correctamente", {
              autoClose: 4000,
            });
            loading.value = false
            emit('close');
          } else {
            toast.warning("Debe llenar todos los campos, no debe existir la alternativa para esta pregunta", {
              autoClose: 4000,
            });
          }
        } else {
          const response = await questionService.questioUpdate(id.value, question.value, indice.value);
          if (response.code == 200) {
            toast.success("pregunta actualizada correctamente", {
              autoClose: 4000,
            });
            loading.value = false
            emit('close');
          } else {
            toast.warning("Debe llenar todos los campos, la pregunta no debe repetirse", {
              autoClose: 4000,
            });
          }
        }
      } else {
        if (props.type == 'option') {
          const response = await questionService.optionAdd(score.value, text.value, indice.value, questionId.value);
          if (response.code == 200) {
            toast.success("option agregada correctamente", {
              autoClose: 4000,
            });
            loading.value = false
            emit('close');
          } else {
            toast.warning("Debe llenar todos los campos, no debe repetirse la alternativa para esta pregunta", {
              autoClose: 4000,
            });
          }
        } else {
          const response = await questionService.questioAdd(question.value, indice.value);
          if (response.code == 200) {
            toast.success("pregunta agregada correctamente", {
              autoClose: 4000,
            });
            loading.value = false
            emit('close');
          } else {
            toast.warning("Debe llenar todos los campos, no debe existir la pregunta", {
              autoClose: 4000,
            });
          }
        }
      }
      loading.value = false
    }

    const closeModal = (event: any) => {
      if (event.target === event.currentTarget) {
        emit('close');
      }
    }

    return {
      closeModal,
      saveChange,
      question,
      score,
      text,
      indice,
      loading
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