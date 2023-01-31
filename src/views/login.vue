<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { useUserStore } from '@/store/userStore';
const store = useUserStore();
const email = ref('')
const password = ref('')
const router = useRouter()
const loading=ref(false)
const login = async () => {
    loading.value = true;
    setTimeout(() => {
        loading.value = false;
        store.login(email.value, password.value)
        if (!store.isAuthenticated) {
            password.value = '';
            loading.value = false;
        }
        else {
            loading.value = true;
        } 

    }, 2000)
    console.log("Before push the route",store.userProfile)
        
}


</script>
<template>
    <div class="hero is-fullheight">
        <div class="hero-body is-justify-content-center is-align-items-center">
            <div class="columns is-flex is-flex-direction-column box">
                <div class="column">
                    <label for="email">Email</label>
                    <input class="input is-primary" type="text" placeholder="Email address" v-model.trim="email">
                </div>
                <div class="column">
                    <label for="Name">Password</label>
                    <input class="input is-primary" type="password" placeholder="Password" v-model="password">

                </div>
                <div class="column">
                    
                    <!-- <button class="button is-primary is-fullwidth" type="submit" @click="login()">Login</button> -->
                    <v-btn :loading="loading" :disabled="loading" color="blue-grey" prepend-icon="mdi-login" @click="login()">
                        Login
                    </v-btn>
                </div>

                <div class="has-text-centered">
                    <p class="is-size-7">Don't have an account?</p>
                    <router-link :to="{ name: 'signup' }" class="has-text-primary">SignUp</router-link>
                </div>
            </div>
        </div>
        
    </div>
</template>

<style scoped>
.temp {
    display: flex;
    justify-content: space-between;
}

body {
    background-color: #8BC6EC;
    background-image: linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%);
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