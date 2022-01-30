<template>
  <Button :onClick="handleClick" :text="btnDisplayWordsText" /> 
  <div v-if="isDisplayingWords"> 
    <div v-for="(word, index) in words" :key="index"> 
      <p>{{ word }}</p>
    </div>
  </div>

</template>
<script lang="ts">
import { defineComponent } from 'vue'

import Button from '@/components/input/Button.vue'
import ApiClient from '@/services/ApiClient'

  export default {
    name: 'DisplayWords',
    components: {
      Button
    },
    computed: {
      words() {
        return this.$store.state.submittedWords
      }
    },
    data() {
      return {
        btnDisplayWordsText: 'Display words',
        isDisplayingWords: false,
        hasRetrievedWords: false,
      }
    },
    methods: {
      handleClick() {
        if(this.isDisplayingWords) {
          this.btnDisplayWordsText = "Display words"
          this.hideWords()
        } else {
          this.displayWords()
          this.btnDisplayWordsText = "Hide words"
        }
      },
      hideWords() {
        this.isDisplayingWords = false
      },
      displayWords() {
        if (this.hasRetrievedWords) {
          this.isDisplayingWords = true
        } else {    
          const gameId = this.$store.state.gameId
          const gameIdPassword = this.$store.state.gameIdPassword

          ApiClient.getWords(gameId, { password: gameIdPassword })
          .then((res => {
            if(res.status === 200) {
              this.success = res.data.message
              this.$store.commit('setSubmittedWords', res.data.words)
              this.isDisplayingWords = true
              this.hasRetrievedWords = true
            } else {
              this.errors.push(res.data.message)
            }
          }))
          .catch((e => console.log(e)))  
        }
      }
    }
  }
</script>

<style lang="scss">
  .loaded {
    color: rgb(0, 4, 255);
  }

  .unloaded {
    color: rgb(255, 30, 0);
  }
</style>
