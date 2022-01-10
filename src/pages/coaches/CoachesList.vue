<template>
    <button @click="test">TEST</button>
    <ul>
        <li v-for="item in coachesList" :key="item.name">{{ item.name }}  {{ item.rating }}</li>
    </ul>
</template>

<script>

export default {
    data(){
        return {
            
        }
    },
    methods : {
        test(){
          this.$store.dispatch('getCoaches');
        
        }
    },
    computed : {
        coachesList(){
            return this.$store.getters.coachesList
        } 
    }
}
</script>