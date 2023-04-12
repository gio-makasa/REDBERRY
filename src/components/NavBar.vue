<template>
  <nav>
    <router-link to="/Home" id="back_arrow">
      <picture>
        <source
          srcset="../assets/images/mobile-back.png"
          media="(max-width: 500px)"
        />
        <source srcset="../assets/images/back.png" />
        <img
          :class="{ mobile: screenSize <= 500 }"
          src="../assets/images/back.png"
          alt="back_arrow"
        />
      </picture>
    </router-link>

    <h2 v-if="activeList">ჩანაწერების სია</h2>
    <h2 v-else-if="activeDetails">ლეპტოპის ინფო</h2>

    <div v-else>
      <router-link
        v-if="activeStuff || screenSize > 500"
        to="/AddItem/StuffInfo"
        :class="{ active: activeStuff }"
        >თანამშრომლის ინფო</router-link
      >
      <router-link
        v-if="activeLaptop || screenSize > 500"
        to="/AddItem/LaptopInfo"
        :class="{ active: activeLaptop }"
        >ლეპტოპის მახასიათებლები</router-link
      >
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    activeStuff() {
      return this.$route.path.includes("StuffInfo");
    },
    activeLaptop() {
      return this.$route.path.includes("LaptopInfo");
    },
    activeList() {
      return this.$route.path.includes("list");
    },
    activeDetails() {
      return this.$route.path.includes("LaptopDetails");
    },
    screenSize() {
      return screen.width;
    },
  },
};
</script>

<style scoped>
nav,
nav > div {
  position: relative;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  margin: 1rem 0;
}

a {
  display: block;
  position: relative;
  text-decoration: none;
  font-weight: bold;
  color: black;
}

#back_arrow {
  position: absolute;
  height: 100%;
  left: 0;
  padding: 0.4rem;
}

img {
  height: 100%;
}

.mobile {
  height: 1.5rem;
}

.active {
  user-select: none;
}

.active::before {
  content: "";
  position: absolute;
  width: 80%;
  height: 0.1rem;
  left: 50%;
  top: 120%;
  transform: translateX(-50%);
  background-color: black;
}
</style>