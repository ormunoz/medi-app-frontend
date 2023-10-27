<template>
    <div class="accordion" :id="id">
        <button @click="addQuestion(items)" class="btn btn-success me-3 col-2">Crear Pregunta</button>
        <hr>
        <div v-for="item in items" :key="item.id" class="accordion-item">
            <h2 class="accordion-header" :id="'heading' + item.id">
                <div class="d-flex justify-content-between">
                    <button class="accordion-button me-5" :class="{ 'collapsed': !item.expanded }" type="button"
                        data-bs-toggle="collapse" :data-bs-target="'#collapse' + item.id" :aria-expanded="!item.expanded"
                        :aria-controls="'collapse' + item.id" @click="toggleItem(item)">
                        {{ item.question }}
                    </button>
                    <button @click="editQuestion(item)" class="btn btn-warning me-2"><i
                            class="material-icons">edit</i></button>

                    <button @click="deleteQuestion(item)" class="btn btn-danger me-5"><i
                            class="material-icons ">delete</i></button>
                </div>
            </h2>
            <div :id="'collapse' + item.id" class="accordion-collapse collapse" :class="{ 'show': item.expanded }"
                :aria-labelledby="'heading' + item.id">
                <div class="accordion-body">
                    <ul class="list-group">
                        <button @click="addOption(item)" class="btn btn-outline-success me-3 col-2">Agregar
                            Alternativa</button>
                        <li v-for="option in item.option" :key="option.id"
                            class="list-group-item d-flex justify-content-between align-items-center">
                            {{ option.text }} (puntaje {{ option.score }})
                            <div>
                                <button @click="editOption(option, item.id)" class="btn btn-outline-warning me-3"><i
                                        class="material-icons">edit</i></button>
                                <button @click="deleteOption(option)" class="btn btn-outline-danger me-2"><i
                                        class="material-icons ">delete</i></button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
  
  
<script>

export default {
    props: {
        id: String,
        items: Array,
        dataToggle: String,
    },
    setup(props, { emit }) {

        const toggleItem = (item) => {
            item.expanded = !item.expanded;
        };

        const editOption = (option, questionId) => {
            emit('edit-option', option, questionId)

        };

        const editQuestion = (item) => {
            emit('edit-question', item)
        };

        const addOption = (item) => {
            const questionId = item.id
            emit('add-option', item.option.length, questionId)
        };

        const addQuestion = (items) => {
            emit('add-question', items.length)
        };

        const deleteQuestion = (item) => {
            emit('delete-question', item.id)
        };

        const deleteOption = (option) => {
            emit('delete-option', option.id)

        };

        return {
            toggleItem,
            editOption,
            addOption,
            addQuestion,
            editQuestion,
            deleteOption,
            deleteQuestion,
        };
    },
};
</script>
  