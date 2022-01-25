<template>
  <input type="text" @input="handleInput" :value="textValue" :placeholder="placeholderValue" />
</template>
<script>
  export default {
    name: 'Textbox',
    props: {
      textValue: {
        type: String,
      },
      placeholderValue: {
        type: String,
      }
    },
    methods: {
      handleInput(event) {
        this.$emit("update:textValue", event.target.value)
      }
    }
  }
</script>

<style scoped>
  input {
    margin-bottom: 1.2em;
  }
</style>
