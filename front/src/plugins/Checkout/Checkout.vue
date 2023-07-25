<template>
  <iframe src="http://localhost:3000/payments/bc311628-f5a6-4eda-a4ce-3835585348be/checkout" frameborder="0"></iframe>
</template>

<script setup>
import {onMounted} from "vue";

onMounted(async () => {
  window.addEventListener('message', (event) => {
    if (event.data.data.redirect_url) {
      window.location.href = event.data.data.redirect_url
    }
  });
})

</script>
