<template>
    <Error :errors="errors" />
    <div v-if="!submitted">
      <p>Disconnect from any screen sharing application and hide your screen to keep your word a secret</p>
      <Textbox :onEnter="onEnter" v-model:textValue="txtGameWord" placeholderValue="Racoon" />
      <Button :onClick="submitWord" text="Submit Word" />
    </div>
    <div v-if="submitted">
      <p class="success">{{ success }}</p>
    </div>
</template>

<script>
import Textbox from '@/components/input/Textbox'
import Button from '@/components/input/Button'
import Error from '@/components/validation/Error'
import ApiClient from '@/services/ApiClient'

export default {
  name: 'SubmitWord',
  components: {
    Textbox,
    Button,
    Error,
  },
  mounted() {
    if(this.$store.state.gameId == null) { 
      this.$router.push({ name: "Home" })
    }
  },
  data() {
    return {
      txtGameWord: '',
      errors: [],
      success: null,
      submitted: false,
    }
  },
  methods: {
    onEnter() {
      this.submitWord()
    },
    submitWord() {
      const gameWord = this.txtGameWord
      this.errors = []
      this.success = null
      if (gameWord.length < 1) {
        this.errors.push("The word cannot be empty")
      }
      if(this.errors.length == 0) {
        const gameId = this.$store.state.gameId
        ApiClient.submitWord(gameId, { gameWord })
        .then((res => {
          if (res.status === 201) {
            this.success = "Word submitted!"
            this.submitted = true
            this.$store.commit('setSubmittedWord', true)
          } else {
            this.errors.push(res.data.message)
          }
        }))
        .catch((e => console.log(e)))
      }
    },
  }
}
</script>

<style scoped>
  .success {
    color: green;
  }
</style>