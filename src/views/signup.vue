<template>
    <div>
        <!-- <v-form id="profile-form"> -->
        <v-card class="mx-auto" max-width="344" title="Create Your Account">
            <v-container>
                <v-text-field v-model="first" color="primary" label="First name" variant="underlined"></v-text-field> <v-text-field v-model="last" color="primary" label="Last name" variant="underlined"></v-text-field>
                <v-text-field v-model="phone" color="primary" label="Phone Number" variant="underlined"></v-text-field>
                  <v-file-input v-model="image" color="primary" label="Profile Image" placeholder="Add Your Pic"
                variant="underlined"></v-file-input>
                <v-text-field v-model="email" color="primary" label="Email" variant="underlined" required></v-text-field>
                <v-text-field v-model="password" color="primary" label="password" type="password" required variant="underlined"></v-text-field>
            </v-container>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn type="button" @click="signUp()" color="success">
                    Proceed
                    <v-icon icon="mdi-chevron-right" end></v-icon>
                </v-btn>
            </v-card-actions>
        </v-card>
        <div class="has-text-centered mt-3">
            <p class="is-size-5">Already have an account?</p>
            <router-link :to="{ name: 'home' }" class="has-text-primary is-size-5">Login</router-link>
        </div>
    </div>
    <!-- </v-form> -->
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '../store/userStore.js'
const store = useUserStore();
// const route = useRoute()
const router = useRouter()
const email = ref(); 
const password = ref();
const first = ref()
const last = ref()
const image = ref()
const phone = ref()
function signUp() {
    
    store.createUser(email.value, password.value, first.value, last.value, phone.value, image.value)
    // user.value = store.userProfile
    // if (store.isAuthenticated)
    // {  
    //     setTimeout(() => {
    //     router.push({ 
    //         name: "todoview", params: {
    //             id: store.userProfile.uid
    //         }
    //     })
    // }, 3000)}
    // else if(email.value.search("@")===-1||email.value.search(".com")===-1){email.value=''
    //     password.value = ''
    // }
//     else {
//         password.value = '';
//     // email.value='' 
//    }
}

</script>

<style scoped>
.temp {
    display: flex;
    justify-content: space-between;
}
</style>