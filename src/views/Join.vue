<template>
  <div class="home">
    <Header title="Happy Family!"/>
    <div v-for="(error, index) in errors" :key="index">
      <p class="error">{{ error }}</p>
    </div>
    <Textbox :onEnter="joinGame" v-model:textValue="txtGameId" placeholderValue="PaleDisk" />
    <Button :onClick="joinGame" text="Join Game" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, provide, onUpdated, onMounted } from 'vue'
import Header from '@/components/Header.vue'
import Textbox from '@/components/input/Textbox.vue'
import Button from '@/components/input/Button.vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { key } from '@/store/index'


export default defineComponent ({
  name: 'Join',
  components: {
    Header,
    Textbox,
    Button,
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore(key)
    const errors = ref([""])
    const txtGameId = ref("")
    
    const gameIdFromUrl = (): string => {
      if (route.params.gameId) {
        return route.params.gameId.toString()
      }
      return ''
    }

    onMounted(() => {  
      if (gameIdFromUrl() != '') {
        txtGameId.value = gameIdFromUrl()
        joinGame()
      }
    })

    const gameIdUrl = (): string => {
      if(store.state.gameId == 'loading...') {
        return ''
      }
      return store.state.gameId
    }
    
    
    const joinGame = () => {
      errors.value.splice(0, errors.value.length)
      let gameId = txtGameId
      if(!gameId) {
        errors.value.push("Game ID can not be empty")
      } else if(gameId.value.length < 3) {
        errors.value.push("Length must be longer than 3 characters")
      } else if(/\d/.test(gameId.value)) {
        errors.value.push("Game ID cannot contain numbers")
      }
      if(errors.value.length == 0) {
        checkIfGameExists(gameId.value)
      }
    }
    

    const checkIfGameExists = (gameId: String) => { 
      const url = store.state.apiUrl  + "/game/" + gameId + "/check"
        fetch(url)
        .then(res => { 
          if (!res.ok) {
            errors.value.push("The game does not exist")
            throw new Error("HTTP Status: " + res.status)
          }
          return res.json()
        })
        .then (data => {
          if (data.closed) {
            errors.value.push("That game is closed. Ask the game host to open it again")
          } else {
            store.commit('SET_GAME_ID', gameId)
            router.push({ name: "Game" })
          }
        })
        .catch(err => {
          console.log(err.message)
        })
    }


    return {
      joinGame,
      gameIdUrl,
      errors,
      store,
      txtGameId
    }
  },
})
</script>

<style scoped>
  .error {
    color: red;
  }
</style>