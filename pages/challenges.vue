<script setup lang="ts">

interface ChallengeInList {
	id: bigint
	title: string
}

const {data, error, pending} = await useFetch<[ChallengeInList]>('https://api.leetbruh.alexereh.ru/challenges/all', {
	method: "GET",
	headers: {'Content-Type': 'application/json'},
});
</script>

<template>
	<div class="flex flex-col gap-2 mt-2">
		<UContainer v-if="pending">Loading...</UContainer>
		<UContainer class="flex w-full flex-col gap-2"
		            v-else-if="data"
		            v-for="element in data">
			<ULink :to="'/challenge/' + element.id">
				<UCard class="w-full" >
					<template #header>
						<h1 class="font-bold text-xl">{{ element.title }}</h1>
					</template>
				</UCard>
			</ULink>
		</UContainer>
	</div>
</template>

<style scoped>

</style>