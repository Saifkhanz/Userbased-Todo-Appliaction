<script setup>
import { useUserStore } from '@/store/userStore';
import { useTodoStore } from '../store/todoStore.js'
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from 'vue-router';
import { auth} from '../firebase.js';
import { ref, onMounted } from 'vue';
const store = useTodoStore();
const userStore = useUserStore();
let completeTask = ref([])
let favoriteTask = ref([])
const router = useRouter()
const items = ref([
    {
        text: 'ALL Task',
        icon: 'mdi-format-list-checks',
        clickHandler: function allTask() {
            store.saveTodo = store.newTodo
        }
    },
    {
        text: 'Completed',
        icon: 'mdi-checkbox-marked-circle-plus-outline',
        clickHandler: function completed() {
            for (let i = 0; i < store.newTodo.length; i++) {
                if (store.newTodo[i].done)
                    completeTask.value.push(store.newTodo[i])
            }

            store.saveTodo = completeTask.value
            completeTask.value = []

        }
    },
    {
        text: 'Favorite',
        icon: 'mdi-star-plus',
        clickHandler: function openFavorite() {
            for (let i = 0; i < store.newTodo.length; i++) {
                if (store.newTodo[i].favorite) {
                    favoriteTask.value.push(store.newTodo[i])
                }

            }
            store.saveTodo = favoriteTask.value
            favoriteTask.value = []
        }
    },
    {
        text: "Log-out",
        icon: 'mdi-logout',
        clickHandler: async function logout() {
            await auth.signOut()
            const authUser = onAuthStateChanged(auth, (user) => {
                if (user) {
                    console.log("Simple User", user)
                }
                else {
                    router.push({ name: "home" })
                }
            })
        }
    }
])
onMounted(() => userStore.getUserData()
)

</script>
<template>
    <div>
        <v-navigation-drawer expand-on-hover rail >
            <v-list>
                <v-list-item prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
                    :title="userStore.userData.firstName" :subtitle="userStore.userData.lastName"></v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-list>
                <v-list-subheader>Actions</v-list-subheader>
                <!-- <div v-for="item in items" :key="item.text" @click="item.clickHandler(item.text)">
    
                </div> -->
                <v-list-item v-for="(item, i) in items" :key="i" @click="item.clickHandler(item.text)" :value="item"
                    active-color="primary" rounded="xl">
                    <template v-slot:prepend>
                        <v-icon :icon="item.icon"></v-icon>
                    </template>

                    <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>
<style scoped>

</style>