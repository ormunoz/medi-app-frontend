<template>
    <header class="login-container">
        <section class="logo-container vertical-center">
            <img src="/img/logo.png" alt="Logo">
        </section>
        <aside class="vertical-center text-center">
            <section class="container">
                <article class="row">
                    <div class="col-md-6 offset-md-3">
                        <h1 class="h3 mb-3 fw-normal">Inicio de sesión</h1>
                        <TextField v-model="userLogin.rut" type="text" label="Usuario" placeholder="Usuario" />
                        <TextField v-model="userLogin.password" type="password" label="Contraseña" placeholder="Password" />
                        <button class="w-100 btn btn-lg btn-info mt-4" @click="login">Iniciar Sesión</button>
                        <p class="mt-5 mb-3 text-muted">
                            <a id="forgot-password" href="#">¿Ha olvidado su contraseña?</a>
                        </p>
                    </div>
                </article>
            </section>
        </aside>
    </header>
</template>
  
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { userLogin } from '@/service/auth/types';
import { AuthService } from "@/service/auth/AuthServices";
import { useAuthStore } from '../../service/stores/auth';
import { useRouter } from 'vue-router';
import TextField from '@/components/general/atoms/TextField.vue'
import { toast } from 'vue3-toastify';

export default defineComponent({
    components: {
        TextField
    },
    setup() {
        const router = useRouter();
        const authStore = useAuthStore();
        const authService = new AuthService()

        const userLogin = ref<userLogin>({
            rut: '',
            password: ''
        });

        const verifyForm = () => {
            if (userLogin.value.rut.length === 0) return 1
            if (userLogin.value.password.length === 0) return 2
            return 0
        };

        const login = async () => {
            const verification = verifyForm();
            if (verification === 1 || verification === 2) console.log(verification === 1 ? 'debe ingresar un rut' : 'debe ingresar una contraseña')
            if (verification === 0) {
                await authService.login(userLogin.value)
                    .then(async (response) => {
                        console.log(response)
                        if (response.code === 200) {
                            const { token, user } = response.data.data;
                            authStore.setUser(user)
                            authStore.setToken(token)
                            const itsUserActive = await authService.hasValidUserSession()
                            if (user.role === 'ADMIN') {
                                itsUserActive ? router.push('profesionals') : router.push('/')
                            } else {
                                itsUserActive ? router.push('home') : router.push('/')
                            }
                        } else {
                            toast.warning("Problemas al logearse", {
                                autoClose: 4000,
                            });
                        }
                    })
            }
        };

        return { userLogin, login };
    }
});
</script>
  

<style scoped>
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