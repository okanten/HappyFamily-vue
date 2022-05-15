<template>
    <Error :errors="errors" />
    <div v-if="!submitted">
      <p>Disconnect from any screen sharing application and hide your screen to keep your word a secret</p>
      <Textbox :onEnter="onEnter" v-model:textValue="txtGameWord" placeholderValue="Racoon" />
      <Button :onClick="submitWord" text="Submit Word" />
    </div>
    <div v-if="submitted">
      <p class="success">{{ success }}</p>
    </div>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue'
  import Textbox from '@/components/input/Textbox.vue'
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
      Textbox,
      Button,
      Error,
    },
    setup() {
      const store = useStore(key)
      const router = useRouter()

      const txtGameWord = ref('')
      const errors = ref([""])
      const success = ref('')
      let submitted = ref(store.state.hasSubmittedWord)

      const submitWord = (): void => {
        const gameWord = txtGameWord.value
        errors.value = []
        success.value = ''
        if (gameWord.length < 1) {
          errors.value.push("The word cannot be empty")
        }
        if (errors.value.length == 0) {
          const gameId = store.state.gameId
          ApiClient.submitWord(gameId, { gameWord })
          .then((res => {
            if (res.status === 201) {
              success.value = "Word submitted!"
              submitted.value = true
              store.commit(MutationType.SetSubmittedWord, true)
            } else {
              errors.value.push(res.data.message)
            }
          }))
          .catch((e => console.log(e)))
        }
      }
      
      const onEnter = (): void => {
        submitWord()
      }

      onMounted(() => {
        if(store.state.gameId == '') {
          router.push({ name: "Home" })
        } 
      }) 
      
      return {
        txtGameWord,
        errors,
        success,
        submitted,
        onEnter,
        submitWord,
      }
    },
  })
</script>

<style scoped>
  .success {
    color: green;
  }
</style>