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
  import { useStore } from 'vuex'
  import { key } from '@/store/index'
  import { MutationType } from "@/store/mutations";

  export default defineComponent({
    name: 'DisplayWords',
    components: {
      Button
    },
    setup() {
      const store = useStore(key)
      
      let btnDisplayWordsText: string = "Display words"
      let isDisplayingWords: Boolean = false
      let hasRetrievedWords: Boolean = false
      
      const words = (): Array<string> => {
        return store.state.submittedWords
      }
      
      const hideWords = (): void => {
        isDisplayingWords = false
      }
      
      const displayWords = (): void => {
        if (hasRetrievedWords) {
          isDisplayingWords = true
        } else {    
          const gameId = store.state.gameId
          const gameIdPassword = store.state.gameIdPassword

          ApiClient.getWords(gameId, { password: gameIdPassword })
          .then((res => {
            if(res.status === 200) { 
              store.commit(MutationType.SetSubmittedWords, res.data.words)
              isDisplayingWords = true
              hasRetrievedWords = true
            }
          }))
          .catch((e => console.log(e)))  
        }
      }

      const handleClick = (): void => {
        if(isDisplayingWords) {
          btnDisplayWordsText = "Display words"
          hideWords()
        } else {
          displayWords()
          btnDisplayWordsText = "Hide words"
        }
      }
      
      
      return {
        words,
        handleClick,
        btnDisplayWordsText,
        isDisplayingWords,
      }

    },
  })
</script>

<style lang="scss">
  .loaded {
    color: rgb(0, 4, 255);
  }

  .unloaded {
    color: rgb(255, 30, 0);
  }
</style>
