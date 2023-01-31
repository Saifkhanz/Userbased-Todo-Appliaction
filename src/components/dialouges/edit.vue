<template>
    <v-dialog v-model="dialog" :value="true" persistent max-width="290">
        <v-card>
            <v-card-title class="text-h5">
                Edit task?
            </v-card-title>
            <v-card-text>This is a Model ,Where You Can Edit Your Task</v-card-text>
            <v-text-field v-model="taskTitle" @keyup.enter="saveTask" class="ma-6" />
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="$emit('close')" text>
                    Cancel
                </v-btn>
                <!-- <v-btn @click="saveTask()" :disabled="!taskTitle.length || taskTitle === task.content" text> -->
                <v-btn @click="saveTask(), $emit('close')"  text>
                    Save new
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { ref,onMounted,computed} from 'vue';
import { useTodoStore } from '@/store/todoStore';
const props = defineProps({
    task:Array
})
const data = computed(() => { props.task })
console.log("props",props,"props.task",props.task,data,"form props")
const store = useTodoStore();
const dialog = ref(true);
const taskTitle= ref('')
onMounted(() => {
    taskTitle.value = props.task.content
    }) 
    function saveTask() {
    const payload = {
            id: props.task.id,
            content: taskTitle.value
        }
        console.log(payload,"payload")
        store.updateTask(payload)
        // dialog.value = false; 
        //     $emit('close')
    //         this.$vuetify.goTo(0, { duration: 0 })
        }
    
</script>