<template>
  <router-view></router-view>
</template>

<style>
:root {
  --buttonColor: #62a1eb;
  --buttonColorHover: #317ad0;
  --buttonColorActive: #1a5dab;
  --inputBorder: #8ac0e2;
  --backgroundColor: #ebebeb;
  --dropdownHover: #e7f0f8;
}
@font-face {
  font-family: Font;
  src: url(./assets/fonts/HelveticaNeue-01.ttf);
}
* {
  font-family: Font;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
body {
  padding: 0 1rem;
  background-color: #f6f6f6;
}

@media screen and (max-width: 500px) {
  body {
    padding: 0;
  }
}
</style>
