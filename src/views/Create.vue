<template>
  <div class="home">
    <Header title="Happy Family!"/>
    <NewGame /> 
    <div v-if="!hasSubmitted">
      <p>Not submitted</p>
      <Button :onClick="readySubmit" :text="readySubmitText()" />
    </div>
    <div v-if="isReadyToSubmit">
      <SubmitWord />
    </div>
    <div v-if="hasSubmitted">
      <LockGame />
    </div>
    <div v-if="checkIfLocked()">
      <DisplayWords />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, provide, onUpdated } from 'vue'
  import Header from '@/components/Header.vue'
  import NewGame from '@/components/game/NewGame.vue'
  import Button from '@/components/input/Button.vue'
  import SubmitWord from '@/components/game/SubmitWord.vue'
  import LockGame from '@/components/game/LockGame.vue'
  import DisplayWords from '@/components/game/DisplayWords.vue'
  import { useStore } from 'vuex'
  import { useRouter } from 'vue-router'
  import { key } from '@/store/index'
  import { MutationType } from "@/store/mutations";
  
  export default defineComponent({
    name: 'CreateGame',
    components: {
      Header,
      NewGame,
      Button,
      SubmitWord,
      LockGame,
      DisplayWords,
    },
    setup() {
      const store = useStore(key)
      const gameId = ref(store.state.gameId)
      const gamePassword = ref(store.state.gameIdPassword)
      const hasSubmitted = ref(store.state.hasSubmittedWord)
      const hasLockedGame = ref(store.state.hasLockedGame)
      let isReadyToSubmit = ref(false)
      //let readySubmitText = ref("")
      // const readySubmitText = ref('I am ready to submit my word')

      onUpdated(() => {
        console.log("Main updated")
      })

      const readySubmit = (): void => {
        isReadyToSubmit.value = !(isReadyToSubmit.value)
        if (isReadyToSubmit.value) {
          hasSubmitted.value = true
        }
      }
      
      const checkIfLocked = (): Boolean => {
        return store.state.hasLockedGame
      }
      
      const readySubmitText = (): string => {
        if(isReadyToSubmit.value) {
          return "Hide my word!"
        }
        return "I am ready to submit my word"
      }

      return {
        gameId,
        gamePassword,
        hasSubmitted,
        hasLockedGame,
        readySubmitText,
        isReadyToSubmit,
        readySubmit,
        checkIfLocked,
      }
    },
  })
</script>
