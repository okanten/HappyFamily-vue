<template>
  <Error :errors="errors" />
  <Button :onClick="changeGameStatus" :text="btnLockText" />
</template>

<script>
import Button from '@/components/input/Button'
import Error from '@/components/validation/Error'
import ApiClient from '@/services/ApiClient'

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
      errors: [],
      success: null,
    }
  },
  methods: {
    changeGameStatus() {

      // reset errors and success
      this.errors = []
      this.success = null      

      const gameId = this.$store.state.gameId
      let data = { password: this.$store.state.gameIdPassword }
      
      if(this.gameLocked) {
        this.unlockGame(gameId, data)
      } else {
        this.lockGame(gameId, data)
      }
    },
    unlockGame(gameId, data) {
 
      ApiClient.openGame(gameId, data)
      .then((res => {
        if (res.status === 200 || res.status === 201) {
          this.gameLocked = false 
          this.$store.commit('setLockedGame', false)
          this.success = data.message
        } else {
          this.errors.push(data.message)
        }
      }))
      .catch(err => console.log(err.message))
    },

    lockGame(gameId, data) {
      
      ApiClient.closeGame(gameId, data)
      .then((res => {
        if (res.status === 200 || res.status === 201) {
          this.gameLocked = true
          this.$store.commit('setLockedGame', true)
          this.success = res.data.message
        } else {
          this.errors.push(res.data.message)
        }
      }))
      .catch((e => console.log(e.message)))
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