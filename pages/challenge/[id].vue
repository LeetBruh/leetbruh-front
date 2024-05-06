<script setup lang="ts">
import {Codemirror} from "vue-codemirror";
import { oneDark } from '@codemirror/theme-one-dark'
import {useAuthStore} from "~/store/auth";

const route = useRoute()
const challengeId = route.params.id
const { token } = storeToRefs(useAuthStore())

interface ChallengeSample {
	explanation: string
}
interface FullChallengeResponse {
	id: bigint;
	title: string;
	body: string;
	samples: [ChallengeSample];
	difficulty: string
}

const code = ref('')

const challengeUrl = `https://api.leetbruh.alexereh.ru/challenges/id/${challengeId}`
const {data} = await useFetch<FullChallengeResponse>(challengeUrl, {
	method: "GET",
	headers: {'Content-Type': 'application/json'}
})

interface HighlightLanguagesResponse {
	languages: [string]
}
const highlightGetUrl = `https://api.leetbruh.alexereh.ru/highlight/get-languages`
const {data: languages} = await useFetch<HighlightLanguagesResponse>(highlightGetUrl, {
	method: "GET",
	headers: {'Content-Type': 'application/json'}
})

interface GetHighlightsResponse {
	tokens: [string]
}
const tokensGetUrl = `https://api.leetbruh.alexereh.ru/highlight/highlight`
const {data: highlightResponse} = await useFetch<GetHighlightsResponse>(tokensGetUrl, {
	method: "POST",
	headers: {'Content-Type': 'application/json'},
	body: {
		"language": "kotlin"
	}
})

async function send() {
	const url = `https://api.leetbruh.alexereh.ru/attempt/make`;
	await useFetch(url, {
		method: "PUT",
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token.value}`
		},
		body: {
			"code": code.value,
			"language": "kotlin",
			"challenge_id": challengeId
		}
	});
}

const extensions = [oneDark]
</script>

<template>
	<div class="pt-16 w-full flex flex-row">
		<UContainer class="flex flex-1 flex-col gap-6">
			<h2 class="text-3xl font-bold">
				{{ data?.title }}
			</h2>
			<p>
				{{data?.body}}
			</p>
			<div v-for="example in data?.samples">
				<p>
					{{example.explanation}}
				</p>
			</div>
		</UContainer>
		<UContainer class="flex w-full flex-1 flex-col gap-4">
			<UContainer class="w-full">
				<Codemirror
					v-model="code"
					placeholder="Code goes here..."
					:style="{ height: '300px' }"
					:autofocus="true"
					:indent-with-tab="true"
					:tab-size="4"
					:extensions="extensions"
				/>
			</UContainer>
			<UContainer class="flex flex-row">
				<UButton @click="send">Send attempt</UButton>
			</UContainer>
		</UContainer>
	</div>

</template>

<style scoped>

</style>