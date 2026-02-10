<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useUserStore } from "@/store/userStore";
import { useI18n } from "vue-i18n";
import { setLanguage } from "@/i18n";

const store = useUserStore();
const { locale } = useI18n();
const email = ref("");
const password = ref("");
const router = useRouter();
const loading = ref(false);
const selectedLanguage = ref(locale);

const languages = [
	{ value: "en", label: "English" },
	{ value: "hi", label: "हिंदी" },
];

const changeLanguage = (lang) => {
	selectedLanguage.value = lang;
	setLanguage(lang);
};

const login = async () => {
	loading.value = true;
	setTimeout(() => {
		loading.value = false;
		store.login(email.value, password.value);
		if (!store.isAuthenticated) {
			password.value = "";
			loading.value = false;
		} else {
			loading.value = true;
		}
	}, 2000);
	console.log("Before push the route", store.userProfile);
};
</script>
<template>
	<div class="hero is-fullheight">
		<div class="language-selector">
			<select
				v-model="selectedLanguage"
				@change="changeLanguage($event.target.value)"
				class="language-dropdown"
			>
				<option value="en">English</option>
				<option value="hi">हिंदी</option>
			</select>
		</div>
		<div class="hero-body is-justify-content-center is-align-items-center">
			<div class="columns is-flex is-flex-direction-column box">
				<div class="column">
					<label for="email">{{ $t("app_email") }}</label>
					<input
						class="input is-primary"
						type="text"
						placeholder="Email address"
						v-model.trim="email"
					/>
				</div>
				<div class="column">
					<label for="Name">{{ $t("app_password") }}</label>
					<input
						class="input is-primary"
						type="password"
						placeholder="Password"
						v-model="password"
					/>
				</div>
				<div class="column">
					<!-- <button class="button is-primary is-fullwidth" type="submit" @click="login()">Login</button> -->
					<v-btn
						:loading="loading"
						:disabled="loading"
						color="blue-grey"
						prepend-icon="mdi-login"
						@click="login()"
					>
						Login
					</v-btn>
				</div>

				<div class="has-text-centered">
					<p class="is-size-7">Don't have an account?</p>
					<router-link :to="{ name: 'signup' }" class="has-text-primary"
						>SignUp</router-link
					>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.language-selector {
	position: absolute;
	top: 20px;
	right: 20px;
	z-index: 100;
}

.language-dropdown {
	padding: 8px 12px;
	border: 1px solid #ccc;
	border-radius: 4px;
	font-size: 14px;
	background-color: white;
	cursor: pointer;
	transition: all 0.3s ease;
}

.language-dropdown:hover {
	border-color: #999;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.language-dropdown:focus {
	outline: none;
	border-color: #007bff;
	box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
}

.temp {
	display: flex;
	justify-content: space-between;
}

body {
	background-color: #8bc6ec;
	background-image: linear-gradient(135deg, #8bc6ec 0%, #9599e2 100%);
}
.custom-loader {
	animation: loader 1s infinite;
	display: flex;
}

@-moz-keyframes loader {
	from {
		transform: rotate(0);
	}

	to {
		transform: rotate(360deg);
	}
}

@-webkit-keyframes loader {
	from {
		transform: rotate(0);
	}

	to {
		transform: rotate(360deg);
	}
}

@-o-keyframes loader {
	from {
		transform: rotate(0);
	}

	to {
		transform: rotate(360deg);
	}
}

@keyframes loader {
	from {
		transform: rotate(0);
	}

	to {
		transform: rotate(360deg);
	}
}
</style>