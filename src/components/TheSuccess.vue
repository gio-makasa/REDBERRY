<template>
  <div id="back">
    <div id="modal">
      <img src="../assets/images/done.png" alt="success" />
      <h3>ჩანაწერი დამატებულია!</h3>
      <router-link id="toList" to="/list">სიაში გადაყვანა</router-link>
      <router-link id="toHome" to="/home">მთავარი</router-link>
    </div>
  </div>
</template>

<script setup>
localStorage.clear();
</script>

<style scoped>
#back {
  position: absolute;
  background-color: #4a4a4a;
  height: 100vh;
  width: 100%;
  top: 0;
  left: 0;
}

#modal {
  position: relative;
  background-color: white;
  width: 50%;
  border-radius: 0.5rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
}

a {
  display: block;
  border-radius: 0.5rem;
  text-decoration: none;
  padding: 1rem 2rem;
  margin: auto;
  text-align: center;
  width: 40%;
}

#toList {
  color: white;
  background-color: var(--buttonColor);
  margin: 5rem auto 1rem;
}

#toHome {
  color: var(--buttonColor);
}</style>