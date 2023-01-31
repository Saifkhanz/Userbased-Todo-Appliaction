<template>
    <!-- <v-text-field v-model="store.state.search" @input="$store.commit('setSearch', $event)"
        @focus="searchClosed = false" @blur="searchClosed = true" class="expanding-search mt-1"
        :class="{ 'closed' : searchClosed && !$store.state.search }" :disabled="$store.state.sorting"
        placeholder="Search" dense filled clearable prepend-inner-icon="mdi-magnify"></v-text-field> -->
        <v-text-field v-model="store.search" @focus="searchClosed = false"  @blur="searchClosed = true" class="expanding-search mt-4"
            :class="{ 'closed': searchClosed }" placeholder="Search" dense filled clearable
            prepend-inner-icon="mdi-magnify"></v-text-field>
</template>

<script setup>
import { ref ,watch} from 'vue';
import { useTodoStore } from '@/store/todoStore';
const store = useTodoStore();
const searchClosed = ref(true);
const search = ref('')
// function searchTask() {
//     console.log("search Task inside",search.value)
//     store.search = search.value
//     store.filtered()
// }
// store.search=search.value
watch(store.search, () => {
    store.saveTodo.value = store.newTodo.value.filter(todo => todo.content.toLowerCase().includes(store.search.value.toLowerCase()))
    console.log(store.search.value, "OO meri ", store.saveTodo.value)
})
</script>

<style>
.expanding-search {
    transition: max-width .5s;
}

.expanding-search .v-input__slot {
    cursor: pointer !important;
}

.expanding-search .v-input__slot:before,
.expanding-search .v-input__slot:after {
    border-color: transparent !important;
}

.expanding-search.closed {
    max-width: 45px;
    cursor: pointer !important;
}

.expanding-search.closed .v-input__slot {
    background: transparent !important;
}
</style>