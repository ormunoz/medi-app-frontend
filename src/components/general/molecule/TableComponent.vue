<template>
  <header class="container">
    <div class="card">
      <div class="card-body">
        <h1 class="card-title">{{ itsAdmin ? 'Informacion de los profesionales' : 'Informacion de los Pacientes' }}</h1>
        <section class="d-flex align-items-center overflow-x-auto mb-4 flex-md-row flex-column">
          <button v-if="itsAdmin" @click="addProfesional()" class="btn btn-outline-primary me-3 col-auto">Agregar
            Profesional</button>
          <Selector v-if="order" :name="'N° Filas'" class="col-2" :items="pageSelect" @item-selected="onUpdateFile">
          </Selector>
          <TextField v-model="searchText" type="text" label="Buscador" placeholder="Buscador" />
        </section>
        <section v-if="filteredItems.length >= 1">
          <article class="row">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th v-for="column in columns" :key="column.id">{{ column.label }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in filteredItems" :key="item.id">
                  <td v-for="column in columns" :key="column.name">
                    <span>{{ item[column.name] }}</span>
                  </td>
                  <td v-if="showButtons">
                    <div class="d-flex align-items-center">

                      <button v-for="button in buttons" :name="button.iconName" :key="button.id"
                        :class="['cursor-pointer px-2 py-2', button.className]" @click="button.action(item)"><i
                          class="material-icons">{{button.iconName}}</i></button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <nav aria-label="Page navigation example" v-if="!searchText">
              <ul class="pagination pagination-xl justify-content-center green-pagination">
                <li class="page-item" :class="{ disabled: currentPage === 1 }" @click="firstPage">
                  <a class="page-link"><font-awesome-icon icon="angles-left" /></a>
                </li>
                <li class="page-item" :class="{ disabled: currentPage === 1 }" @click="previousPage">
                  <a class="page-link"><font-awesome-icon icon="chevron-left" /></a>
                </li>
                <li v-for="page in totalPages" :key="page" class="page-item" :class="{ active: currentPage === page }">
                  <a class="page-link" @click.prevent="goToPage(page)">{{ page }}</a>
                </li>
                <li class="page-item" :class="{ disabled: currentPage === totalPages }" @click="nextPage">
                  <a class="page-link"><font-awesome-icon icon="chevron-right" /></a>
                </li>
                <li class="page-item" :class="{ disabled: currentPage === totalPages }" @click="lastPage">
                  <a class="page-link"><font-awesome-icon icon="angles-right" /></a>
                </li>
              </ul>
            </nav>
          </article>
        </section>
        <section v-else>
          <p v-if="itsAdmin">No hay datos para mostrar, porfavor hacer click en el boton "Agregar Profesional" para poder
            visualizar al profesional creado.
          </p>
          <p v-else>No hay datos de pacientes registrados en este momento, debe esperar a que alguno se registre para
            poder visualizarlo.
          </p>
        </section>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref, computed, PropType } from 'vue';
import ModalComponent from './ModalComponent.vue';
import Selector from '../atoms/Selector.vue';
import TextField from '@/components/general/atoms/TextField.vue'

export default defineComponent({
  props: {
    items: {
      type: Array as PropType<any>,
      required: true
    },
    columns: {
      type: Array,
      required: true
    },
    buttons: {
      type: Array,
      required: true
    },
    showButtons: {
      type: Boolean,
      default: false
    },
    itsAdmin: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'Tabla Por Defecto'
    },
    sectionAddButton: {
      type: String,
      default: ''
    },
    searchTableData: {
      type: Array as PropType<any>,
      required: false
    },
    perPage: {
      type: Number,
      default: 5
    },
    order: {
      type: Boolean,
      default: false
    },

  },

  components: { TextField, Selector, ModalComponent },
  setup(props, { emit }) {
    const searchText = ref<string>('')
    const currentPage = ref<number>(1)
    const matches = ref<boolean>(true)
    const perPageSelect = ref(props.perPage)
    const typeRange = ref()
    const showFirstPages = computed(() => currentPage.value <= 10);
    const showLastPages = computed(() => currentPage.value > totalPages.value - 10);
    const showModal = ref(false);
    const title = ref('Generar Venta');
    const titleError = ref('No hay productos agregados')
    const productPresent = ref(true);
    const pageSelect = ref([
      { id: 0, label: 'Por Defecto' },
      { id: 1, label: '0-2' },
      { id: 2, label: '0-20' },
      { id: 3, label: '0-40' },
      { id: 4, label: '0-60' },
      { id: 5, label: '0-100' },
      { id: 6, label: '0-150' },
    ])



    function onUpdateFile(value: any) {
      typeRange.value = value.id;
      switch (Number(typeRange.value)) {
        case 0: perPageSelect.value = props.perPage; break;
        case 1: perPageSelect.value = 2; break;
        case 2: perPageSelect.value = 20; break;
        case 3: perPageSelect.value = 40; break;
        case 4: perPageSelect.value = 60; break;
        case 5: perPageSelect.value = 100; break;
        case 6: perPageSelect.value = 150; break;
        default:
          break;
      }
      currentPage.value = 1;
    }


    const visiblePages = computed(() => {
      if (showFirstPages.value) {
        return Array.from(
          { length: Math.min(10, totalPages.value) },
          (_, index) => index + 1
        );
      } else if (showLastPages.value) {
        return Array.from(
          { length: Math.min(10, totalPages.value) },
          (_, index) => totalPages.value - 10 + index
        );
      } else {
        return Array.from({ length: 10 }, (_, index) => currentPage.value - 5 + index);
      }
    });
    const resetParams = () => {
      matches.value = true
    }

    const filteredItems = computed(() => {
      const start = (currentPage.value - 1) * perPageSelect.value
      const end = start + perPageSelect.value;
      let totalMatches = 0;
      if (searchText.value === '') {
        resetParams()
        return props.items.slice(start, end);
      } else {
        return props.items.filter((item: Record<string, string>) => {
          return Object.keys(item).some((key: string) => {
            if (props.searchTableData.includes(key)) {
              const value = item[key] ? item[key].toLowerCase() : ''
              const match = value.includes(searchText.value.toLowerCase())
              if (match) {
                resetParams()
                totalMatches++
                if (totalMatches <= perPageSelect.value) matches.value = false
              }
              return value.includes(searchText.value.toLowerCase())
            }
            return false
          });
        }).slice(start, end)
      }
    });

    const totalPages = computed(() => Math.ceil(props.items.length / perPageSelect.value));

    const goToPage = (page: number) => {
      if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
      }
    };

    const previousPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    };

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
      }
    };

    const lastPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value = totalPages.value;
      }
    };

    const firstPage = () => {
      currentPage.value = 1;
    };

    const addProfesional = () => {
      emit('add')
    };

    return {
      addProfesional,
      searchText,
      filteredItems,
      previousPage,
      nextPage,
      currentPage,
      totalPages,
      matches,
      pageSelect,
      onUpdateFile,
      typeRange,
      goToPage,
      lastPage,
      firstPage,
      visiblePages,
      showModal,
      title,
      titleError,
      productPresent,
    };
  },
});
</script>

<style scoped>
.green-pagination .page-link {
  color: rgb(22, 166, 223);
  border-color: rgb(0, 188, 221);
}

.green-pagination .page-link:hover {
  color: rgb(27, 164, 218);
}

.green-pagination .active .page-link {
  background-color: rgb(11, 121, 155);
  border-color: rgb(9, 111, 194);
  color: white;
}

.green-pagination .disabled .page-link {
  color: rgb(23, 150, 235);
}

.green-pagination .page-link:focus {
  outline: none;
  box-shadow: 0 0 10px rgba(0, 128, 0, 0.5);
  border-color: transparent;
}

.custom-input {
  background-color: #f0f8ea;
  color: black;
}

.custom-input:focus {
  border-color: green;
  box-shadow: 0 0 0 0.2rem rgba(0, 128, 0, 0.25);
}

.input-quantity {
  width: 70px;
  margin-right: 10%;
}
</style>