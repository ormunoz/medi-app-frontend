<template>
    <aside :class="`${is_expanded ? 'is-expanded' : ''}`">
        <div class="logo">
            <img src="../../assets/logo.png" alt="Vue" /> MobiApp
        </div>
        <div class="menu-toggle-wrap">
            <button class="menu-toggle" @click="ToggleMenu">
                <span class="material-icons">keyboard_double_arrow_right</span>
            </button>
        </div>
        <h3>MobiApp Menu {{ role === 'ADMIN'? 'Admin' : 'Paciente'  }}</h3>
        <section class="menu" v-if="role === 'ADMIN'">
            <NavigationLink to="/profesionals" icon="admin_panel_settings" text="Profesionales" />
            <NavigationLink to="/patients" icon="group" text="Pacientes" />
            <NavigationLink to="/questions" icon="question_mark" text="Preguntas" />
        </section>
        <section class="menu" v-if="role === 'PATIENT'">
            <NavigationLink to="/info_patient" icon="person" text="Info Paciente" />
        </section>
        <span class="flex"></span>

        <section class="menu">
            <a class="button" @click="logout" style="cursor: pointer;">
                <span class="material-icons">logout</span>
                <span class="text">Logout</span>
            </a>
        </section>
    </aside>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'

import NavigationLink from '@/components/general/atoms/NavigationLink.vue'
import { AuthService } from "@/service/auth/AuthServices";
import { useAuthStore } from "@/service/stores/auth";
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';

export default defineComponent({
    components: { NavigationLink },
    setup() {
        const is_expanded = ref<boolean>(true)
        const authService = new AuthService()
        const router = useRouter();
        const authStore = useAuthStore()
        const role = authStore.user?.role
        const ToggleMenu = () => {
            is_expanded.value = !is_expanded.value
        }

        const logout = async () => {
            await authService.logout(authStore.token)
                .then((response) => {
                    if (response.code === 200) {
                        authStore.logout()
                        router.push({ name: 'root' });
                    } else {
                        toast.info("Error al hacer Logout", {
                            autoClose: 4000,
                        });
                    }
                })
        }

        return {
            ToggleMenu,
            is_expanded,
            logout,
            role
        };
    }
})

</script>

<style lang="scss" scoped>
aside {
    display: flex;
    flex-direction: column;

    background-color: var(--dark);
    color: var(--light);

    width: calc(2rem + 50px);
    overflow: hidden;
    min-height: 100vh;
    padding: 1rem;

    transition: 0.2s ease-in-out;

    .flex {
        flex: 1 1 0%;
    }

    .logo {
        margin-bottom: 1rem;

        img {
            width: 2rem;
        }
    }

    .menu-toggle-wrap {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 1rem;

        position: relative;
        top: 0;
        transition: 0.2s ease-in-out;

        .menu-toggle {
            transition: 0.2s ease-in-out;

            .material-icons {
                font-size: 2rem;
                color: var(--light);
                transition: 0.2s ease-out;
            }

            &:hover {
                .material-icons {
                    color: var(--primary-alt);
                    transform: translateX(0.5rem);
                }
            }
        }
    }

    h3,
    .button .text {
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
    }

    h3 {
        color: var(--grey);
        font-size: 0.875rem;
        margin-bottom: 0.5rem;
        text-transform: uppercase;
    }

    .menu {
        margin: 0 -1rem;

        .button {
            display: flex;
            align-items: center;
            text-decoration: none;

            transition: 0.2s ease-in-out;
            padding: 0.5rem 1rem;

            .material-icons {
                font-size: 2rem;
                color: var(--light);
                transition: 0.2s ease-in-out;
            }

            .text {
                color: var(--light);
                transition: 0.2s ease-in-out;
            }

            &:hover {
                background-color: var(--dark-alt);

                .material-icons,
                .text {
                    color: var(--primary);
                }
            }

            &.router-link-exact-active {
                background-color: var(--dark-alt);
                border-right: 5px solid var(--primary-alt);

                .material-icons,
                .text {
                    color: var(--primary);
                }
            }
        }
    }

    .footer {
        opacity: 0;
        transition: opacity 0.3s ease-in-out;

        p {
            font-size: 0.875rem;
            color: var(--grey);
        }
    }

    &.is-expanded {
        width: var(--sidebar-width);

        .menu-toggle-wrap {
            top: -3rem;

            .menu-toggle {
                transform: rotate(-180deg);
            }
        }

        h3,
        .button .text {
            opacity: 1;
        }

        .button {
            .material-icons {
                margin-right: 1rem;
            }
        }

        .footer {
            opacity: 0;
        }
    }

    @media (max-width: 1024px) {
        position: absolute;
        z-index: 99;
    }
}
</style>