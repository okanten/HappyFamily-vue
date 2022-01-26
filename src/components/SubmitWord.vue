<template>
    <Error :errors="errors" />
    <div v-if="!submitted">
      <p>Disconnect from any screen sharing application and hide your screen to keep your word a secret</p>
      <Textbox v-model:textValue="txtGameWord" placeholderValue="Racoon" />
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
    submitWord() {
      const gameWord = this.txtGameWord
      this.errors = []
      this.success = null
      if (gameWord.length < 1) {
        this.errors.push("The word cannot be empty")
      }
      if(this.errors.length == 0) {

        const gameId = this.$store.state.gameId
        
        const options = {
          method: 'POST',
          body: JSON.stringify({ gameWord: gameWord }),
          headers: {
            'Content-Type': 'application/json'
          },
        }
        
        let status = ''
        const url = 'http://localhost:8000/game/' + gameId + "/add"
        fetch(url, options)
        .then(res => {
          let json = res.json()
          status = res.status
          console.log(status)
          
          return json 
        })
        .then(data => {
          if(status != 201) {
            this.errors.push(data.message)
          } else {
            this.success = "Word submitted!"
            this.submitted = true
            this.$store.commit('setSubmittedWord', true)
          }
        })
        .catch(err => console.log(err.message))
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