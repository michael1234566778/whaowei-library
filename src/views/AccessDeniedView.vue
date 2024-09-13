<template>
  <div class="access-denied">
    <h2>Access Denied</h2>
    <p>
      You do not have permission to view this page. Please
      <router-link to="/login">login</router-link> to continue.
    </p>
  </div>
</template>

<script setup>
// No specific script needed for this view
</script>

<style scoped>
.access-denied {
  max-width: 600px;
  margin: 100px auto;
  text-align: center;
}

.access-denied h2 {
  color: red;
}
</style>
