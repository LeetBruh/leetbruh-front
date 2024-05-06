import { defineStore } from 'pinia';

interface UserLogin {
    login: string;
    password: string;
}

interface UserRegister {
    login: string;
    password: string;
    firstName: string;
    lastName: string;
}

interface AuthResponse {
    token: string
}

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: null as string|null,
        loading: false as boolean,
        authenticated: false as boolean
    }),
    actions: {
        async loginUser(loginData: UserLogin) {
            const { data, pending } = await useFetch<AuthResponse>('https://api.leetbruh.alexereh.ru/user/login', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: {
                    login: loginData.login,
                    password: loginData.password,
                },
            });
            this.loading = pending.value;

            if (data.value) {
                this.authenticated = true
                this.token = data?.value?.token;
            }
        },
        async registerUser({ login, password, firstName, lastName }: UserRegister) {
            const { data, pending } = await useFetch<AuthResponse>('https://api.leetbruh.alexereh.ru/user/register', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: {
                    login: login,
                    password: password,
                    first_name: firstName,
                    last_name: lastName,
                    role: 'user'
                },
            });
            this.loading = pending.value;

            if (data.value) {
                this.authenticated = true
                this.token = data?.value?.token;
            }
        },
        logUserOut() {
            this.authenticated = false
            this.token = null
        }
    },
});

// make sure to pass the right store definition, `useAuth` in this case.
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}