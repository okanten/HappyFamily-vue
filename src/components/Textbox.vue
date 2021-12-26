<template>
  <input type="text" :value="{ textValue }" />
</template>
<script>
  export default {
    name: 'Textbox',
    props: {
      textValue: {
        type: String,
        default: 'Value',
      },
    }
  }
</script>

<style scoped>
  input {
    margin-bottom: 1.2em;
    width: 100%;
  }
</style>
