<template>
  <NavBar />
  <router-view v-if="!send" @send="this.send = true"></router-view>
  <teleport to="body" v-else>
    <TheSuccess />
  </teleport>
</template>

<script setup>
import { ref } from "vue";
import TheSuccess from "../components/TheSuccess.vue";

const send = ref(false);
</script>