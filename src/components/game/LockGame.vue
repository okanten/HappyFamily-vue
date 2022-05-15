<template>
  <Error :errors="errors" />
  <Button :onClick="changeGameStatus" :text="btnLockText" />
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted, onUpdated } from 'vue'
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
      
      const gameLocked = ref(store.state.hasLockedGame)
      // const errors: Array<string> = []
      const errors = ref([""])
      const success = ref("")
      //let success: string = ''



      onMounted(() => { 
        if(store.state.gameId == null) { 
          router.push({ name: "Home" })
        }
      }) 
      
      onUpdated(() => {
        gameLocked.value = store.state.hasLockedGame
      })
      
      const btnLockTextFunc = (): string => {
        if(gameLocked.value) {
          return "Open game for additional submissions"
        }
        return "Lock game for further submissions"
      }

      const btnLockText = ref(btnLockTextFunc())
      
      const unlockGame = (gameId: string, data: Object): void => {
        ApiClient.openGame(gameId, data)
        .then((res => {
          if (res.status === 200 || res.status === 201) {
            gameLocked.value = false 
            btnLockText.value = btnLockTextFunc()
            store.commit(MutationType.SetLockedGame, false)
            success.value = res.data.message
          } else {
            errors.value.push(res.data.message)
          }
        }))
        .catch(err => console.log(err.message))
      }
      
      const lockGame = (gameId: string, data: Object): void => {
        ApiClient.closeGame(gameId, data)
        .then((res => {
          if (res.status === 200 || res.status === 201) {
            gameLocked.value = true
            btnLockText.value = btnLockTextFunc()
            store.commit(MutationType.SetLockedGame, true)
            success.value = res.data.message
          } else {
            errors.value.push(res.data.message)
          }
        }))
        .catch((e => console.log(e.message)))
      }

      const changeGameStatus = (): void => {
        errors.value = []
        success.value = ''

        const gameId: string = store.state.gameId
        const data: Object = { password: store.state.gameIdPassword }
        
        if(gameLocked.value) {
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