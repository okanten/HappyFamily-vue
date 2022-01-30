<template>
  <Error :errors="errors" />
  <Button :onClick="changeGameStatus" :text="btnLockText" />
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import Button from '@/components/input/Button'
  import Error from '@/components/validation/Error'
  import ApiClient from '@/services/ApiClient'

  export default defineComponent({
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
        this.errors = []
        this.success = null      

        const gameId: string = this.$store.state.gameId
        let data: Object = { password: this.$store.state.gameIdPassword }
        
        if(this.gameLocked) {
          this.unlockGame(gameId, data)
        } else {
          this.lockGame(gameId, data)
        }
      },
      unlockGame(gameId: string, data: Object) {
   
        ApiClient.openGame(gameId, data)
        .then((res => {
          if (res.status === 200 || res.status === 201) {
            this.gameLocked = false 
            this.$store.commit('setLockedGame', false)
            this.success = res.data.message
          } else {
            this.errors.push(res.data.message)
          }
        }))
        .catch(err => console.log(err.message))
      },

      lockGame(gameId: string, data: Object) {
        
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
  })
</script>

<style scoped>
  .error {
    color: red;
  }
  .success {
    color: green;
  }
</style>