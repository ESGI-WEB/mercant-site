<template>
  <iframe :src="src" frameborder="0" width="100%" height="600px"></iframe>
</template>

<script setup>
import {onMounted} from "vue";

const emit = defineEmits(['choice'])

defineProps({
  src: {
    type: String,
    required: true
  }
});

onMounted( () => {
  window.addEventListener('message', (event) => {
    emit('choice', event);
  });
})

</script>
