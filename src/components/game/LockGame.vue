<template>
  <Error :errors="errors" />
  <Button :onClick="changeGameStatus" :text="btnLockText" />
</template>

<script lang="ts">
  import { defineComponent, onMounted } from 'vue'
  import Button from '@/components/input/Button.vue'
  import Error from '@/components/validation/Error.vue'
  import ApiClient from '@/services/ApiClient'  
  import { useStore } from 'vuex'
  import { useRouter } from 'vue-router'
  import { key } from '@/store/index'
  import { MutationType } from "@/store/mutations";

  export default defineComponent({
    name: 'SubmitWord',
    components: {
      Button,
      Error,
    },
    setup() {
      const router = useRouter()
      const store = useStore(key)
      
      
      let gameLocked: Boolean = store.state.hasLockedGame
      let errors: Array<string> = []
      let success: string = ''

      onMounted(() => { 
        if(store.state.gameId == null) { 
          router.push({ name: "Home" })
        }
      }) 
      
      const btnLockText = (): string => {
        if(gameLocked) {
          return "Open game for additional submissions"
        } else {
          return "Lock game for further submissions"
        }
      }
      
      const unlockGame = (gameId: string, data: Object): void => {
        ApiClient.openGame(gameId, data)
        .then((res => {
          if (res.status === 200 || res.status === 201) {
            gameLocked = false 
            store.commit(MutationType.SetLockedGame, false)
            success = res.data.message
          } else {
            errors.push(res.data.message)
          }
        }))
        .catch(err => console.log(err.message))
      }
      
      const lockGame = (gameId: string, data: Object): void => {
        ApiClient.closeGame(gameId, data)
        .then((res => {
          if (res.status === 200 || res.status === 201) {
            gameLocked = true
            store.commit(MutationType.SetLockedGame, true)
            success = res.data.message
          } else {
            errors.push(res.data.message)
          }
        }))
        .catch((e => console.log(e.message)))
      }

      const changeGameStatus = (): void => {
        errors = []
        success = ''

        const gameId: string = store.state.gameId
        let data: Object = { password: store.state.gameIdPassword }
        
        if(gameLocked) {
          unlockGame(gameId, data)
        } else {
          lockGame(gameId, data)
        }
      }

      return {
        gameLocked,
        errors,
        success,
        btnLockText,
        changeGameStatus
      }

    },
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