<template>
  <h3>The game ID is: <span id="gameId" class="unloaded">{{ gameId }}</span></h3>
  <h4>Share this link to let others join your game: <a :href="gameUrl">{{ gameUrl }}/</a></h4>
  <div v-if="restartGame">
    <Button :onClick="reloadGame" text="Create new game" />
  </div>
</template>
<script>

import Button from '@/components/input/Button.vue'

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
      gamePassword() {
        if (!this.$store.state.gameId) {
          return 'loading...'
        }
        return this.$store.state.gameIdPassword
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
        fetch('http://localhost:8000/create')
        .then(res => res.json())
        .then(data => {
          this.$store.commit('setGameId', data.id)
          this.$store.commit('setGamePassword', data.password)
          this.setLoadedClassList()
        })
        .catch(err => console.log(err.message))
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
