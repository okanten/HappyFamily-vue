<template>
  <div class="home">
    <Header title="Happy Family!"/>
    <div v-for="(error, index) in errors" :key="index">
      <p class="error">{{ error }}</p>
    </div>
    <Textbox v-model:textValue="txtGameId" placeholderValue="PaleDisk" />
    <p>{{ this.$router.query }}</p>
    <Button :onClick="joinGame" text="Join Game" />
  </div>
</template>

<script>
import Header from '@/components/Header'
import Textbox from '@/components/input/Textbox'
import Button from '@/components/input/Button'
import { useRoute } from 'vue-router'


export default {
  name: 'Join',
  components: {
    Header,
    Textbox,
    Button,
  },
  setup() {
    const gameIdFromUrl = null;
  },
  mounted() {
    const route = useRoute()  
    this.gameIdFromUrl = route.params.gameId
    if (this.gameIdFromUrl != null) {
      this.txtGameId = this.gameIdFromUrl
      this.joinGame()
    }
  },
  data() {
    return {
      txtGameId: '',
      errors: []
    }
  },
  computed: {
    gameIdUrl() {
      if(this.$store.state.gameId == 'loading...') {
        return ''
      }
      return this.$store.state.gameId
    },
  },
  methods: {
    joinGame() {
      this.errors.splice(0, this.errors.length)
      let gameId = this.txtGameId
      if(!gameId) {
        this.errors.push("Game ID can not be empty")
      } else if(gameId.length < 3) {
        this.errors.push("Length must be longer than 3 characters")
      } else if(/\d/.test(gameId)) {
        this.errors.push("Game ID cannot contain numbers")
      }
      if(this.errors.length == 0) {
        this.checkIfGameExists(gameId)
      }
    }, 
    checkIfGameExists(gameId) { 
      const url = this.$store.state.apiUrl  + "/game/" + gameId + "/check"
        fetch(url)
        .then(res => { 
          if (!res.ok) {
            this.errors.push("The game does not exist")
            throw new Error("HTTP Status: " + res.status)
          }
          return res.json()
        })
        .then (data => {
          if (data.closed) {
            this.errors.push("That game is closed. Ask the game host to open it again")
          } else {
            this.$store.commit('setGameId', gameId)
            this.$router.push({ name: "Game" })
          }
        })
        .catch(err => {
          console.log(err.message)
        })
    }
  }
}
</script>

<style scoped>
  .error {
    color: red;
  }
</style>