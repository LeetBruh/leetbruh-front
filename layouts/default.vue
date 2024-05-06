<script setup lang="ts">
import {storeToRefs} from 'pinia';
import {useAuthStore} from '~/store/auth';

const {t} = useI18n({
	useScope: 'local'
})

const router = useRouter();

const {logUserOut} = useAuthStore();
const {authenticated} = storeToRefs(useAuthStore()); // make authenticated state reactive

const logout = () => {
	logUserOut();
	router.push('/login');
};

const links = [
	{
		label: t('home'),
		icon: 'i-heroicons-book-open',
		to: '/'
	},
	{
		label: t('about'),
		icon: 'i-heroicons-square-3-stack-3d',
		to: '/about'
	},
	{
		label: t('challenges'),
		icon: 'i-heroicons-square-3-stack-3d',
		to: '/challenges'
	},
	{
		label: t('profile'),
		icon: 'i-heroicons-square-3-stack-3d',
		to: '/profile'
	}
]
</script>

<template>
	<div>
		<UHeader :links="links">
			<template #left>
				<Logo class="w-auto h-6"/>
			</template>
			<template #right>
				<UColorModeButton/>

				<UButton v-if="!authenticated" class="loginBtn" style="float: right">
					<NuxtLink to="/login">{{ t('login') }}</NuxtLink>
				</UButton>
				<UButton v-if="authenticated" class="loginBtn" style="float: right">
					<NuxtLink @click="logout">{{ t('logout') }}</NuxtLink>
				</UButton>
			</template>
		</UHeader>
		<UContainer class="h-screen">
			<slot/>
		</UContainer>
	</div>
</template>

<i18n lang="json">
{
	"ru": {
		"home": "Главная",
		"about": "О сайте",
		"challenges": "Задачи",
		"profile": "Профиль",
		"logout": "Выход",
		"login": "Вход"
	},
	"en": {
		"home": "Home",
		"about": "About",
		"challenges": "Challenges",
		"profile": "Profile",
		"logout": "Logout",
		"login": "Login"
	}
}
</i18n>

<style scoped>

</style>