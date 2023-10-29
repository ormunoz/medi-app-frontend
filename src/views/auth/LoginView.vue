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
                        <TextField v-model="userLogin.rut" type="text" label="Rut o Usuario" placeholder="Rut o Usuario" />
                        <TextField v-model="userLogin.password" type="password" label="Contraseña" placeholder="Password" />
                        <button class="w-100 btn btn-lg btn-info mt-4" @click="login" :disabled="loading">
                            {{ loading ? 'Cargando...' : 'Iniciar Sesión' }}
                        </button>
                        <div class="spinner-border text-info" v-if="loading" role="status">
                            <span class="sr-only"></span>
                        </div>
                    </div>
                    <div class="mt-5">
                        <router-link to="/home" class="button mt-5 mb-3 text-muted" style="text-decoration: none; ">
                            ¿Quieres ser nuestro paciente, haz click aquí?
                        </router-link>
                    </div>
                </article>
            </section>
        </aside>
    </header>
</template>
  
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { userLogin } from '@/service/auth/types';
import { AuthService } from "@/service/auth/AuthServices";
import { useAuthStore } from '../../service/stores/auth';
import { useRouter } from 'vue-router';
import TextField from '@/components/general/atoms/TextField.vue'
import { toast } from 'vue3-toastify';
import NavigationLink from '@/components/general/atoms/NavigationLink.vue'

export default defineComponent({
    components: {
        TextField, NavigationLink
    },
    setup() {
        const router = useRouter();
        const authStore = useAuthStore();
        const authService = new AuthService()
        const loading = ref<boolean>(false)
        const userLogin = ref<userLogin>({
            rut: '',
            password: ''
        });

        const init = async () => {
            const hasValidSession = await authService.hasValidUserSession();
            if (hasValidSession) {
                const authToken = authStore.user;
                if (authToken?.role === 'ADMIN') {
                    return router.push({ name: 'profesionals' });
                } else {
                    if (authToken?.role === 'PATIENT') {
                        return router.push({ name: 'info_patient' });
                    } else {
                        return router.push({ name: '/' });
                    }
                }
            }
        }

        onMounted(init)

        const verifyForm = () => {
            if (userLogin.value.rut.length === 0) return 1
            if (userLogin.value.password.length === 0) return 2
            return 0
        };

        const login = async () => {
            loading.value = true
            const verification = verifyForm();
            if (verification === 0) {
                await authService.login(userLogin.value)
                    .then(async (response) => {
                        if (response.code === 200) {
                            const { token, user } = response.data.data;
                            authStore.setUser(user)
                            authStore.setToken(token)
                            const itsUserActive = await authService.hasValidUserSession()
                            if (user.role === 'ADMIN') {
                                itsUserActive ? router.push('profesionals') : router.push('/')
                            } else {
                                itsUserActive ? router.push('info_patient') : router.push('/')
                            }
                            loading.value = false
                        } else {
                            toast.warning("contraseña o nombre de usuario incorrecto", {
                                autoClose: 4000,
                            });
                        }
                    })
            } else {
                toast.info(
                    verification == 1 ? "Debe ingresar un rut" : "Debe ingresar una contraseña",
                    { autoClose: 4000 }
                );
                loading.value = false
            }
        };

        return { userLogin, login, loading };
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