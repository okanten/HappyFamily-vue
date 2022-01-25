<template>
    <Textbox v-model:textValue="txtGameWord" placeholderValue="Racoon" />
    <Button :onClick="joinGame" text="Submit word" />
</template>

<script>
import Textbox from '@/components/input/Textbox'
import Button from '@/components/input/Button'


export default {
  name: 'SubmitWord',
  components: {
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
