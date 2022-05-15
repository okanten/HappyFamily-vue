<template>
  <Button :onClick="handleClick" :text="btnDisplayWordsText" /> 
  <div v-if="isDisplayingWords"> 
    <div v-for="(word, index) in words" :key="index"> 
      <p>{{ word }}</p>
    </div>
  </div>

</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue'

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
      
      const btnDisplayWordsText = ref("")
      const isDisplayingWords = ref(false)
      const hasRetrievedWords = ref(false)
      
      const words = (): Array<string> => {
        return store.state.submittedWords
      }
      
      const hideWords = (): void => {
        isDisplayingWords.value = false
      }
      
      const displayWords = (): void => {
        if (hasRetrievedWords) {
          isDisplayingWords.value = true
        } else {    
          const gameId = store.state.gameId
          const gameIdPassword = store.state.gameIdPassword

          ApiClient.getWords(gameId, { password: gameIdPassword })
          .then((res => {
            if(res.status === 200) { 
              store.commit(MutationType.SetSubmittedWords, res.data.words)
              isDisplayingWords.value = true
            }
          }))
          .catch((e => console.log(e)))  
        }
      }

      const handleClick = (): void => {
        if(isDisplayingWords) {
          btnDisplayWordsText.value = "Display words"
          hideWords()
        } else {
          displayWords()
          btnDisplayWordsText.value = "Hide words"
        }
      }
      
      handleClick()
      
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
