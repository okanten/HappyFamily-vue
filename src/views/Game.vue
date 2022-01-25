<template>
  <div class="home">
    <Header title="Happy Family!"/>
    <Textbox v-model:textValue="txtGameWord" placeholderValue="Racoon" />
    <Button :onClick="joinGame" text="Submit word" />
  </div>
</template>

<script>
import Header from '@/components/Header'
import Textbox from '@/components/input/Textbox'
import Button from '@/components/input/Button'


export default {
  name: 'CreateGame',
  components: {
    Header,
    Textbox,
    Button,
  },
  mounted() {

    if(this.$store.state.gameId == null) { 
      this.$router.push({ name: "Home" })
    }

  },
  data() {
    return {
      txtGameWord: ''
    }
  },
  methods: {
    joinGame() {
      console.log(this.gameId)
    }
  }
}
</script>
