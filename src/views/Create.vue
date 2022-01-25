<template>
  <div class="home">
    <Header title="Happy Family!"/>
    <NewGame /> 
    <Button :onClick="readySubmit" text="I am ready to submit my word" />
    <div v-if="isReadyToSubmit">
      <p>Disconnect from any screen sharing application and hide your screen to keep your word a secret</p>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
import NewGame from '@/components/NewGame'
import Button from '@/components/input/Button'


export default {
  name: 'CreateGame',
  components: {
    Header,
    NewGame,
    Button,
  },
  computed: {
    gameId() {
      return this.$store.state.gameId
    },
    gamePassword() {  
      return this.$store.state.gameIdPassword
    }
  },
  data() {
    return {
      isReadyToSubmit: false,
    }
  },
  methods: {
    readySubmit() {
      this.isReadyToSubmit = !this.isReadyToSubmit;
    }
  }
}
</script>
