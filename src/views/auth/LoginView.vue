<template>
    <header class="login-container">
        <section class="logo-container vertical-center">
            <img src="/img/logo.png" alt="Logo">
        </section>
        <aside class="vertical-center text-center">
            <section class="container">
                <article class="row">
                    <div class="col-md-6 offset-md-3">
                        <img class="mb-4" src="/img/logo.png" width="200">
                        <h1 class="h3 mb-3 fw-normal">Inicio de sesión</h1>
                        <TextField v-model="userLogin.userName" type="text" label="Nombre" placeholder="Nombre completo" />
                        <TextField v-model="userLogin.password" type="password" label="Contraseña" placeholder="Password" />
                        <button class="w-100 btn btn-lg btn-primary mt-4" @click="login">Iniciar Sesión</button>
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

export default defineComponent({
    components: {
        TextField
    },
    setup() {
        const router = useRouter();
        const authStore = useAuthStore();
        const authService = new AuthService()

        const userLogin = ref<userLogin>({
            userName: '',
            password: ''
        });

        const verifyForm = () => {
            if (userLogin.value.userName.length === 0) return 1
            if (userLogin.value.password.length === 0) return 2
            return 0
        };

        const login = async () => {
            const verification = verifyForm();
            if (verification === 1 || verification === 2) console.log(verification === 1 ? 'debe ingresar un nombre de usuario' : 'debe ingresar una contraseña')
            if (verification === 0) {
                await authService.login(userLogin.value)
                    .then((response) => {
                        if (response.code === 200) {
                            const { token, user } = response.data.data;
                            authStore.setUser(user)
                            authStore.setToken(token)
                            authService.hasValidUserSession()
                            router.push('home')
                        } else {
                            console.log('no se pudo Logear');
                        }
                    })
                router.push('home')

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
    display: flex;
    justify-content: center;
    align-items: center;
}

.logo-container {
    background-color: #ffd867;
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