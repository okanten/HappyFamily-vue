<template>
  <div class="home">
    <Header title="Happy Family!"/>
    <Splash />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

import Header from '@/components/Header.vue'
import Splash from '@/components/Splash.vue'
import Textbox from '@/components/input/Textbox.vue'

@Options({
  components: {
    Header,
    Splash,
    Textbox,
  },
})
export default class Home extends Vue {}
</script>
