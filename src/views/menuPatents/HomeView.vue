<template>
    <header class="login-container">
        <section class="logo-container vertical-center">
            <img src="/img/logo.png" alt="Logo">
        </section>
        <aside class="vertical-center text-center">
            <section class="container">
                <article class="row">
                    <div class="col-md-9 offset-md-2">
                        <h1 class="h3 mb-3 fw-normal radio-question">Registro de Paciente</h1>
                        <div class="row">
                            <div class="col-md-3">
                                <TextField v-model="userRegister.rut" type="text" label="Rut" placeholder="Rut" />
                            </div>
                            <div class="col-md-3">
                                <TextField v-model="userRegister.name" type="text" label="Nombre" placeholder="Nombre" />
                            </div>
                            <div class="col-md-3">
                                <TextField v-model="userRegister.last_name" type="text" label="Apellido"
                                    placeholder="Apellido" />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-3">
                                <TextField v-model="userRegister.email" type="text" label="Email" placeholder="Email" />
                            </div>
                            <div class="col-md-3">
                                <TextField v-model="userRegister.city" type="text" label="Ciudad" placeholder="Ciudad" />
                            </div>
                            <div class="col-md-3">
                                <TextField v-model="userRegister.password" type="password" label="Contraseña"
                                    placeholder="Password" />
                            </div>
                        </div>
                        <hr>

                        <div class="row options-container" v-for="(question, qIndex) in questionOption" :key="question.id">
                            <h4 class="radio-question">{{ question.question }}</h4>
                            <div class="options-container">
                                <div v-for="option in question.option" :key="option.id" class="radio-option">
                                    <input type="radio" :id="`option${option.id}`" :value="option.id"
                                        v-model="userRegister.option[qIndex]">
                                    <label :for="`option${option.id}`">{{ option.text }}</label>
                                </div>
                            </div>
                        </div>


                        <div class="row">
                            <div class="col-md-6">
                                <button class="w-100 btn btn-lg btn-info mt-4" @click="RegisterUser">Registrarse</button>
                            </div>
                            <div class="col-md-6">
                                <router-link to="/" class="button text-muted" style="text-decoration: none; ">
                                    <button class="w-100 btn btn-lg btn-secondary mt-4" @click="Back">Volver al
                                        Login</button>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </article>
            </section>
        </aside>
    </header>
</template>
  
  
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { userRegister } from '@/service/auth/types';
import TextField from '@/components/general/atoms/TextField.vue'
import { toast } from 'vue3-toastify';
import { QuestionService } from "../../service/questions/QuestionServices";
import { UserService } from "@/service/users/UserServices";
import { useRouter } from 'vue-router';

export default defineComponent({
    components: {
        TextField
    },
    setup() {
        const router = useRouter();
        const userService = new UserService();
        const questionService = new QuestionService();
        const questionOption = ref<any>({});
        const userRegister = ref<userRegister>({
            rut: '',
            password: '',
            role: 'PATIENT',
            name: '',
            last_name: '',
            city: '',
            email: '',
            option: [],
            totalScore: 0,
        });

        const loadData = async () => {
            try {
                const response = await questionService.getQuestion();
                if (response.code === 200 && response.data) {
                    questionOption.value = response.data.data;
                }
            } catch (error) {
                console.error(error);
            }
        };

        onMounted(loadData);

        const RegisterUser = async () => {
            let countOption = 0
            const selectedScores = userRegister.value.option.map(optionId => {
                const selectedOption = questionOption.value
                    .map((question: { option: any; }) => question.option)
                    .flat()
                    .find((option: { id: any; }) => option.id === optionId);
                countOption += 1
                return selectedOption ? selectedOption.score : 0;
            });
            const totalScore = selectedScores.reduce((total, score) => total + score, 0);
            userRegister.value.totalScore = totalScore;
            if (countOption == 5) {
                const response = await userService.addPatient(userRegister.value);
                if (response.code == 200) {
                    toast.success("Paciente Registrado. Ahora volverá al Login.", {
                        autoClose: 4000,
                    });
                    setTimeout(() => {
                        router.push('/');
                    }, 4000);
                } else {
                    toast.warning("Debe llenar todos los campos o rut ingresado ya existe", {
                        autoClose: 4000,
                    });
                }
            } else {
                toast.warning("Debe llenar todas las opciones ", {
                    autoClose: 4000,
                });
            }

        };

        const Back = () => {
            router.push('/');
        }
        return { userRegister, RegisterUser, questionOption, Back };
    }
});
</script>
  

<style scoped>
.options-container {
    display: flex;
    flex-direction: column;
}

.radio-option {
    display: flex;
    align-items: center;
    margin-left: 50px;

}

.radio-question {
    display: flex;
    align-items: center;
}

.radio-option input {
    margin-right: 5px;
    /* Espacio entre el radio y la etiqueta, ajusta según sea necesario */
}

.login-container {
    display: grid;
    grid-template-columns: 50% 50%;
    height: 100vh;
    width: 100vw;
}

.vertical-center {
    color: rgb(27, 90, 141);
    background: rgb(88, 240, 194);
    display: flex;
    justify-content: center;
    align-items: center;
}

.logo-container {
    background-color: #ffffff;
}

.logo-container img {
    max-width: 300px;
}

.btn-primary {
    background-color: #003489;
    border: #003489;
}

a {
    color: #003489;
}

@media (max-width: 575.98px) {
    .login-container {
        grid-template-columns: 100%;
    }

    .logo-container {
        display: none;
    }
}
</style>