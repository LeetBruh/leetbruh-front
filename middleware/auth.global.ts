import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/store/auth';

export default defineNuxtRouteMiddleware((to) => {
    const store = useAuthStore()
    const { authenticated } = storeToRefs(store); // make authenticated state reactive
    const token = store.token; // get token from cookies

    if (token!) {
        // check if value exists
        // todo verify if token is valid, before updating the state
        authenticated.value = true; // update the state to authenticated
    }

    // if token exists and url is /login redirect to homepage
    if (token! && to?.name === 'login') {
        return navigateTo('/');
    }

    // if token doesn't exist redirect to log in
    if (!token! && to?.name !== 'login') {
        abortNavigation();
        return navigateTo('/login');
    }
});