<template>
  <Error :errors="errors" />
  <Button :onClick="changeGameStatus" :text="btnLockText" />
</template>

<script>
import Button from '@/components/input/Button'
import Error from '@/components/validation/Error'

export default {
  name: 'SubmitWord',
  components: {
    Button,
    Error,
  },
  mounted() {
    if(this.$store.state.gameId == null) { 
      this.$router.push({ name: "Home" })
    }
  },
  computed: {
    btnLockText() {
      if(this.gameLocked) {
        return "Open game for additional submissions"
      } else {
        return "Lock game for further submissions"
      }
    }
  },
  data() {
    return {
      gameLocked: this.$store.state.hasLockedGame,
    }
  },
  methods: {
    changeGameStatus() {

      const gameIdPassword = this.$store.state.gameIdPassword
      const options = {
        method: 'POST',
        body: JSON.stringify({ password: gameIdPassword }),
        headers: {
          'Content-Type': 'application/json'
        },
      }
      
      if(this.gameLocked) {
        this.unlockGame(options)
      } else {
        this.lockGame(options)
      }
    },
    unlockGame(options) {

      this.errors = []
      this.success = null

      const gameId = this.$store.state.gameId
      
      let status = ''
      
      const url = 'http://localhost:8000/game/' + gameId + "/open"
      fetch(url, options)
      .then(res => {
        let json = res.json()
        status = res.status
        console.log(status)
        
        return json 
      })
      .then(data => {
        if (status == 200) {
          this.gameLocked = false 
          this.$store.commit('setLockedGame', false)
          this.success = data.message
        } else {
          this.errors.push(data.message)
        }
      })
      .catch(err => console.log(err.message))
    },

    lockGame(options) {
      this.errors = []
      this.success = null

      const gameId = this.$store.state.gameId
      
      let status = ''
      
      const url = 'http://localhost:8000/game/' + gameId + "/close"
      fetch(url, options)
      .then(res => {
        let json = res.json()
        status = res.status
        console.log(status)
        
        return json 
      })
      .then(data => {
        if (status == 200) {
          this.gameLocked = true 
          this.$store.commit('setLockedGame', true)
          this.success = data.message
        } else {
          this.errors.push(data.message)
        }
      })
      .catch(err => console.log(err.message))
    },
  }
}
</script>

<style scoped>
  .error {
    color: red;
  }
  .success {
    color: green;
  }
</style>