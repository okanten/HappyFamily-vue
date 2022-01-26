<template>
  <div class="home">
    <Header title="Happy Family!"/>
    <NewGame /> 
    <div v-if="!hasSubmitted">
      <Button :onClick="readySubmit" :text="readySubmitText" />
    </div>
    <div v-if="isReadyToSubmit">
      <SubmitWord />
    </div>
    <div v-if="hasSubmitted">
      <LockGame />
    </div>
    <div v-if="hasLockedGame">
      <DisplayWords />
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
import NewGame from '@/components/NewGame'
import Button from '@/components/input/Button'
import SubmitWord from '@/components/SubmitWord'
import LockGame from '@/components/LockGame'
import DisplayWords from '@/components/DisplayWords'


export default {
  name: 'CreateGame',
  components: {
    Header,
    NewGame,
    Button,
    SubmitWord,
    LockGame,
    DisplayWords,
  },
  computed: {
    gameId() {
      return this.$store.state.gameId
    },
    gamePassword() {  
      return this.$store.state.gameIdPassword
    },
    
    hasSubmitted() {
      return this.$store.state.hasSubmittedWord
    },
    
    hasLockedGame() {
      return this.$store.state.hasLockedGame
    }
  },
  data() {
    return {
      isReadyToSubmit: false,
      readySubmitText: 'I am ready to submit my word',
    }
  },
  methods: {
    readySubmit() {
      this.isReadyToSubmit = !this.isReadyToSubmit;
      if(this.isReadyToSubmit) {
        this.readySubmitText = 'Hide my word!'
      } else {
        this.readySubmitText = 'I am ready to submit my word'
      }

    }
  }
}
</script>
