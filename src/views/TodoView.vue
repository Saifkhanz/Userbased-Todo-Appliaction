<template>
    <div class="home pa-0">
        <!-- <snackbar /> -->
        <v-app-bar app color="teal-darken-4" image="https://picsum.photos/1920/1080?random" prominent>
            <template v-slot:image>
                <v-img gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"></v-img>
            </template>
            <v-app-bar-title>Todos</v-app-bar-title>
            <v-spacer></v-spacer>
            <search-bar />
            <v-btn icon>
                <v-icon>mdi-heart</v-icon>
            </v-btn>
        </v-app-bar>
        <navigation />

        <input-component :refrence="r" />
        <!-- <task v-if="$store.state.tasks.length" /> -->
        <task />
        <!-- <no-tasks v-else /> -->
    </div>
</template>

<script setup>
import navigation from '@/components/navigation.vue';
import searchBar from '@/components/Tools/searchBar.vue';
import { useRoute } from 'vue-router';
import inputComponent from '@/components/Tools/inputComponent.vue';
import task from '@/components/task.vue';
import { useTodoStore } from '@/store/todoStore';
// import NoTasks from '@/components/Todo/NoTasks.vue'
import { db } from '../firebase.js';
import {
    collection, onSnapshot, addDoc, doc, deleteDoc, updateDoc
    , query, orderBy
} from 'firebase/firestore'
const store = useTodoStore();
const route = useRoute();
const userUID = route.params.id;
console.log("DEBUGGING userUID  from todo View", userUID)
const userR = collection(db, 'USER')
const r = collection(db, "USER", userUID, "TODOS")
// passing R into inputComponent for Adding Task
// console.log("RRRR", r, "USERUID", userUID)

// onMounted(() => {
//     store.link.value = r
//     console.log('CHECKING', store.link)
// })
</script>
