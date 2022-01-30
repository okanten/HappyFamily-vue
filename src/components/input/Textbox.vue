<template>
  <div class="input-wrapper">  
    <input type="text" @input="handleInput" v-on:keyup.enter="onEnter" :value="textValue" :placeholder="placeholderValue" />
  </div>
</template>

<script lang="ts">

  import { Options, Vue } from 'vue-class-component';
  
  @Options({
    name: 'Textbox',
    props: {
      textValue: {
        type: String,
      },
      placeholderValue: {
        type: String,
      },
      onEnter: {
        type: Function,
        required: false,
      },
    },
    methods: {
      handleInput(event: any) {
        this.$emit("update:textValue", event.target.value)
      }
      
    }
  })

  export default class Textbox extends Vue {}
</script>

<style lang="scss" scoped>
  input {
    padding: 1em;
    border-style: dashed;
    border-color: gray;
    font-size: 1em;
    text-align: center;
    border-width: 0.2em;
    margin-bottom: 1.2em;
    background-color: rgba(0,0,0, 0.05);
    &:focus {
      outline: none;
      border-style: solid;
      border-color: green;
      border-width: 0.2em;
    }
  }
  .input-wrapper { 
  }
</style>
