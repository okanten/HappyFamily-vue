<template>
  <div class="home">
    <Header title="Happy Family!"/>
    <SubmitWord />
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue'
  import Header from '@/components/Header.vue'
  import SubmitWord from '@/components/game/SubmitWord.vue'
  import { useStore } from 'vuex'
  import { useRouter } from 'vue-router'
  import { key } from '@/store/index'
  import { MutationType } from "@/store/mutations";

  export default defineComponent({
    name: 'CreateGame',
    components: {
      Header,
      SubmitWord,
    },
    setup() { 
      const router = useRouter()
      const store = useStore(key)
      const txtGameWord = ref('')
      
      onMounted(() => { 
        if (store.state.gameId == '') {
          router.push({ name: "Home" })
        }
      })
      
      return {
        txtGameWord,
      } 
    },
  })
</script>
