<template>
  <iframe :src="src" frameborder="0" width="100%" height="600px"></iframe>
</template>

<script setup>
import {onMounted} from "vue";

defineProps({
  src: {
    type: String,
    required: true
  }
});

onMounted(async () => {
  window.addEventListener('message', (event) => {
    if (event.data.data.redirect_url) {
      window.location.href = event.data.data.redirect_url
    }
  });
})

</script>
