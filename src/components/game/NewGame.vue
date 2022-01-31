<template>
  <h3>The game ID is: <span id="gameId" :class="gameIdClass">{{ gameId }}</span></h3>
  <h4>Share this link to let others join your game: <a :href="gameUrl">{{ gameUrl }}/</a></h4>
  <div v-if="restartGame">
    <Button :onClick="reloadGame" text="Create new game" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue'
  import Button from '@/components/input/Button.vue'
  import ApiClient from '@/services/ApiClient'
  import { useStore } from 'vuex'
  import { useRouter } from 'vue-router'
  import { key } from '@/store/index'
  import { MutationType } from "@/store/mutations";

  export default defineComponent({
    name: 'NewGame',
    components: {
      Button
    },
    setup() {
      const store = useStore(key)
      const router = useRouter()
      const gameId = ref('loading...')
      const gameUrl = ref('') 
      const gameIdClass = ref('unloaded')

      const fetchNewGame = (): void => {
        ApiClient.createGame()
        .then((res => {
          console.log(res)
          if (res.status == 200) {
            store.commit(MutationType.SetGameId, res.data.id)
            store.commit(MutationType.SetGamePassword, res.data.password)
            gameId.value = store.state.gameId
            gameUrlFunc()
            setLoadedClassList()
          } else {
            throw new Error(res)
          }
        }))
        .catch((e => console.log(e)))
      }

      const setLoadedClassList = (): void => {
        gameIdClass.value = 'loaded'
      }

      const reloadGame = (): void => {
        fetchNewGame()
      }

      onMounted(() => {
        if(store.state.gameId == "") {
          fetchNewGame()
        } else {
          setLoadedClassList()
        }
      })
      
      const gameIdFunc = (): void => {
        if (store.state.gameId = "") {
          gameId.value = 'loading...'
        }
        gameId.value = store.state.gameId
      }
      
      const instanceUrl = (): string => {
        return store.state.instanceUrl
      }
      
      const gameUrlFunc = (): void => {
        gameUrl.value = store.state.instanceUrl + "join/" + store.state.gameId
      }

      let restartGame: Boolean = false

      return {
        gameIdClass,
        restartGame,
        gameId,
        instanceUrl,
        gameUrl,
        reloadGame
      }
    }
  })
</script>

<style lang="scss">
  .loaded {
    color: rgb(0, 4, 255);
  }

  .unloaded {
    color: rgb(255, 30, 0);
  }
</style>
