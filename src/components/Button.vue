<template>
  <button @click="onClick" class="animated-button" :class="additionalClass" >{{ text }}</button>
</template>
<script>
  export default {
    name: 'Button',
    props: {
      text: {
        type: String,
        default: 'Button',
      },
      color: {
        type: String,
        default: 'green',
      },
      additionalClass: {
        type: String,
        default: '',
      },
      onClick: {
        type: Function,
        required: true,
      }
    }
  }
</script>

<style scoped>
  button {
    margin-bottom: 1.2em;
    width: 100%;
  }
</style>
