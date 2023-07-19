<script setup>
  import AuthProvider from './services/auth.vue';
  import Security from './views/Security.vue';
  import SecuredZone from './views/SecuredZone.vue';
</script>

<template>
    <AuthProvider #default="{ user }">
        <Security v-if="user === null" />
        <SecuredZone v-else />
    </AuthProvider>
</template>

<style scoped>

</style>
