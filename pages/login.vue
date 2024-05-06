<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/store/auth';
import { object, string } from 'yup';
const { t } = useI18n({
	useScope: 'local'
})
const { loginUser, registerUser } = useAuthStore(); // use auth store

const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive

const schema = object({
	login: string()
		//.min(5, 'Must be at least 5 characters')
		//.max(20, 'Must be maximum 20 characters')
		.required(t('field_required')),
	password: string()
		//.min(5, 'Must be at least 5 characters')
		.required(t('field_required')),
	firstName: string()
		//.min(5, 'Must be at least 5 characters')
		//.max(20, 'Must be maximum 20 characters')
		.required(t('field_required')),
	lastName: string()
		//.min(5, 'Must be at least 5 characters')
		//.max(20, 'Must be maximum 20 characters')
})

const loginState = reactive({
	login: '',
	password: ''
})

const registerState = reactive({
	login: '',
	password: '',
	firstName: '',
	lastName: ''
})
const router = useRouter();

const submitLogin = async () => {
	await loginUser(loginState);
	// redirect to homepage if user is authenticated
	if (authenticated.value) {
		await router.push('/');
	}
};

const submitRegister = async () => {
	await registerUser(registerState);
	// redirect to homepage if user is authenticated
	if (authenticated.value) {
		await router.push('/');
	}
};
</script>

<template>
	<UContainer class="flex flex-row gap-16 w-screen h-screen items-center justify-center">
		<UForm :state="loginState" :schema="schema" @submit="submitRegister" class="flex flex-col gap-3 justify-center">
			<UFormGroup :label="t('first_name_label')" name="firstName" required>
				<UInput v-model="registerState.firstName" />
			</UFormGroup>
			<UFormGroup :label="t('last_name_label')" name="lastName">
				<UInput v-model="registerState.lastName" />
			</UFormGroup>
			<UFormGroup :label="t('login_label')" name="login" required>
				<UInput v-model="registerState.login" />
			</UFormGroup>
			<UFormGroup :label="t('password_label')" name="password" required>
				<UInput v-model="registerState.password" type="password" />
			</UFormGroup>
			<UButton type="submit">Register</UButton>
		</UForm>
		<UForm :state="loginState" @submit="submitLogin" class="flex flex-col gap-3 justify-center">
			<UFormGroup :label="t('login_label')" name="login" required>
				<UInput v-model="loginState.login" />
			</UFormGroup>
			<UFormGroup :label="t('password_label')" name="password" required>
				<UInput v-model="loginState.password" type="password" />
			</UFormGroup>
			<UButton type="submit">Login</UButton>
		</UForm>
	</UContainer>

</template>

<i18n lang="json">
{
	"en": {
		"password_label": "Password",
		"login_label": "Login",
		"first_name_label": "First name",
		"last_name_label": "Last name (not required)",
		"field_required": "This field is required!"
	},
	"ru": {
		"password_label": "Пароль",
		"login_label": "Логин",
		"first_name_label": "Имя",
		"last_name_label": "Фамилия (не обязательно)",
		"field_required": "Это поле обязательно!"
	}
}
</i18n>

<style scoped>

</style>