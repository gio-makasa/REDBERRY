<template>
  <main>
    <img src="../assets/images/LOGO.png" alt="logo" id="logo" />
    <picture>
      <source
        srcset="../assets/images/mobile-main.png"
        media="(max-width: 600px)"
      />
      <source srcset="../assets/images/main.png" />
      <img src="../assets/images/main.png" alt="main_photo" id="main_photo" />
    </picture>
    <div id="buttons">
      <router-link to="/AddItem/StuffInfo">ჩანაწერის დამატება</router-link>
      <router-link to="/list">ჩანაწერების სია</router-link>
    </div>
  </main>
</template>

<style scoped>
main {
  padding: 0.2rem 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

#main_photo {
  height: 350px;
  margin-bottom: 2rem;
}

#buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 22rem;
  gap: 1.5rem;
}

a {
  display: block;
  background-color: var(--buttonColor);
  color: white;
  text-decoration: none;
  width: 100%;
  text-align: center;
  padding: 18px 0;
  border-radius: 0.5rem;
}

a:hover {
  background-color: var(--buttonColorHover);
}

button:active {
  background-color: var(--buttonColorActive);
}

@media screen and (max-width: 600px) {
  #main {
    width: 100%;
    height: auto;
  }
}
</style>