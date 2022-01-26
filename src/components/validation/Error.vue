<template>
    <div v-for="(error, index) in errors" :key="index">
      <p class="error">{{ error }}</p>
    </div>
</template>

<script>

export default {
  name: 'Error',
  props: {
    errors: Array,
  } 
}
</script>

<style scoped>
  .error {
    color: red;
  }
</style>