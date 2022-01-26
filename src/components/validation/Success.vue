<template>
    <div v-for="(success, index) in successes" :key="index">
      <p class="success">{{ success }}</p>
    </div>
</template>

<script>

export default {
  name: 'Success',
  props: {
    successes: Array,
  } 
}
</script>

<style scoped>
  .success {
    color: green;
  }
</style>