<template>
  <h3>The game ID is: <span id="gameId" class="unloaded">{{ gameId }}</span></h3>
  <h4>Share this link to let others join your game: <a :href="gameUrl">{{ gameUrl }}/</a></h4>
  <div v-if="restartGame">
    <Button :onClick="reloadGame" text="Create new game" />
  </div>
</template>
<script>

import Button from '@/components/input/Button.vue'
import ApiClient from '@/services/ApiClient'

  export default {
    name: 'NewGame',
    components: {
      Button
    },
    mounted() {
      if (!this.$store.state.gameId) {
        this.fetchNewGame()
      } else {
        this.setLoadedClassList()
      }
    },
    computed: {
      gameId() {
        if (!this.$store.state.gameId) {
          return 'loading...'
        }
        return this.$store.state.gameId
      },
      instanceUrl() {
        return this.$store.state.instanceUrl
      },
      gameUrl() {
        if(!this.$store.state.gameId) {
          return null
        }
        return this.$store.state.instanceUrl + "join/" + this.$store.state.gameId
      }
    },
    data() {
      return {
        restartGame: false
      }
    },
    methods: {
      fetchNewGame() {
        ApiClient.createGame()
        .then((res => {
          console.log(res)
          if (res.status == 200) {
            this.$store.commit('setGameId', res.data.id)
            this.$store.commit('setGamePassword', res.data.password)
            this.setLoadedClassList()
          } else {
            throw new Error(res)
          }
        }))
        .catch((e => console.log(e)))
      },
      setLoadedClassList() {
        document.getElementById("gameId").classList.add("loaded")
        document.getElementById("gameId").classList.remove("unloaded")
      },
      reloadGame() {
        this.fetchNewGame()
      }
    }
  }
</script>

<style lang="scss">
  .loaded {
    color: rgb(0, 4, 255);
  }

  .unloaded {
    color: rgb(255, 30, 0);
  }
</style>
