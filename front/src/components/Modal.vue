<script setup>
import { ref } from 'vue';

const open = ref(false);

function closeModal() {
  open.value = false;
}

function openModal() {
  open.value = true;
}
</script>

<template>
  <slot name="activator" :openModal="openModal"
  ><button @click="open = true">Open modal</button></slot
  >
  <div class="modal" v-show="open">
    <div class="backdrop" @click="closeModal"></div>
    <div class="modal-box">
      <div class="modal-title">
        <slot name="title"><h1>Modal title</h1></slot>
      </div>
      <div class="modal-content"><slot>Modal content</slot></div>
      <div class="modal-actions">
        <slot name="actions" :closeModal="closeModal"
        ><button @click="closeModal">Close</button></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 2rem;
  overflow: hidden;
}
.backdrop {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-box {
  width: 100%;
  max-width: 40rem;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.5);
  overflow: hidden;
}

.modal-title {
  padding: 1rem;
  font-size: 1.5rem;
  font-weight: bold;
  border-bottom: 1px solid #ccc;
}

.modal-content {
  padding: 1rem;
}

.modal-actions {
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid #ccc;
}
</style>