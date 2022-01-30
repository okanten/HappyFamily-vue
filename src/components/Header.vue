<template>
  <header>
    <h1>{{ title }}</h1>
  </header>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import Button from '@/components/input/Button.vue';

  export default defineComponent({
    name: 'Header',
    props: {
      title: {
        type: String,
        default: 'Know Your Friends!'
      }
    },
    components: {
      Button,
    }
  })
</script>

<style scoped>
  header {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1em;
  }
  h1 {  
    text-align: center;
  }
</style>
