<template>
  <main>
    <form @submit.prevent="Submit()">
      <div id="fullname">
        <div class="inputContainer">
          <label for="firstname">სახელი</label>
          <input type="text" name="firstname" placeholder="გიორგი" :class="{
              success: validatedStuffInfo.firstname,
              failed: validatedStuffInfo.firstname == false,
            }" v-model="stuffInfo.firstname" @input="validation($event.target)" />
          <span>მინიმუმ 2 სიმბოლო, ქართული ასოები</span>
        </div>
        <div class="inputContainer">
          <label for="lastname">გვარი</label>
          <input type="text" name="lastname" placeholder="მაკასარაშვილი" :class="{
              success: validatedStuffInfo.lastname,
              failed: validatedStuffInfo.lastname == false,
            }" v-model="stuffInfo.lastname" @input="validation($event.target)" />
          <span>მინიმუმ 2 სიმბოლო, ქართული ასოები</span>
        </div>
      </div>

      <div :class="{ dropdown: true, open: !hiddenDeps }">
        <input type="button" class="form-select" :class="{
            success: validatedStuffInfo.department,
            failed: validatedStuffInfo.department == false,
          }" name="dep_id" id="dep_id" value="თიმი" @click="showDropdown" />
        <div class="dropdown-content" :class="{ hidden: hiddenDeps }" id="deps" @click="selectOption($event.target)">
          <div v-for="department in departments" :key="department">
            <p>{{ department }}</p>
          </div>
        </div>
      </div>

      <div :class="{ dropdown: true, open: !hiddenPositions }">
        <input type="button" class="form-select open" :class="{
            success: validatedStuffInfo.position,
            failed: validatedStuffInfo.position == false,
          }" name="position_id" id="position_id" value="პოზიცია" @click="showDropdown"
          :disabled="!validatedStuffInfo.department" />
        <div class="dropdown-content" :class="{ hidden: hiddenPositions }" id="positions"
          @click="selectOption($event.target)">
          <div v-for="pos in positions" :key="pos.position">
            <p v-if="pos.teamId == stuffInfo.department">{{ pos.position }}</p>
          </div>
        </div>
      </div>

      <div class="inputContainer">
        <label for="email">მეილი</label>
        <input type="text" name="email" placeholder="giorgimakasarashvili@redberry.ge" :class="{
            success: validatedStuffInfo.email,
            failed: validatedStuffInfo.email == false,
          }" v-model="stuffInfo.email" @input="validation($event.target)" />
        <span>უნდა მთავრდებოდეს @redberry.ge-ით</span>
      </div>

      <div class="inputContainer">
        <label for="phone_number">ტელეფონის ნომერი</label>
        <input type="text" name="phone_number" placeholder="+995571706632" :class="{
            success: validatedStuffInfo.phone_number,
            failed: validatedStuffInfo.phone_number == false,
          }" v-model="stuffInfo.phone_number" @input="validation($event.target)" />
        <span>უნდა აკმაყოფილებდეს ქართული მობ-ნომრის ფორმატს</span>
      </div>
      <button>შემდეგი</button>
    </form>
    <img src="../assets/images/LOGO-bottom.png" alt="logo" />
  </main>
</template>

<script setup>
import { isRef, onMounted, reactive, ref, toRef, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const stuffInfo = reactive({
  firstname: null,
  lastname: null,
  department: null,
  position: null,
  email: null,
  phone_number: null,
});
const validatedStuffInfo = reactive({
  firstname: null,
  lastname: null,
  department: null,
  position: null,
  email: null,
  phone_number: null,
});

const departments = ref([]);
const positions = ref([]);
const hiddenDeps = ref(true);
const hiddenPositions = ref(true);

function showDropdown(e) {
  e.target.id == "dep_id"
    ? (hiddenDeps.value = !hiddenDeps.value)
    : (hiddenPositions.value = !hiddenPositions.value);
}

function validation(e) {
  let name = e.name;
  let value = e.value;
  switch (e.name) {
    case "firstname":
    case "lastname":
      if (/^[ა-ჰ]+[ა-ჰ]+$/gm.test(value)) {
        validatedStuffInfo[name] = true;
      } else {
        validatedStuffInfo[name] = false;
      }
      break;
    case "email":
      if (/[a-z]+@redberry.ge$/gim.test(value)) {
        validatedStuffInfo[name] = true;
      } else {
        validatedStuffInfo[name] = false;
      }
      break;
    case "phone_number":
      if (/^\+9955/gm.test(value) && value.length == 13) {
        validatedStuffInfo[name] = true;
      } else {
        validatedStuffInfo[name] = false;
      }
      break;
  }
  saveLS();
}

function selectOption(e) {
  let selectedButton = e.parentElement.parentElement;
  selectedButton.previousSibling.value = e.innerText;

  if (selectedButton.id == "deps") {
    stuffInfo.department = departments.value.findIndex((dep) => {
      return dep == e.innerText;
    });
    hiddenDeps.value = true;
    validatedStuffInfo.department = true;
    document.getElementById("position_id").value = "პოზიცია";
    stuffInfo.position = null;
    validatedStuffInfo.position = null;
  }

  if (selectedButton.id == "positions") {
    stuffInfo.position = positions.value.findIndex((pos) => {
      return pos.position == e.innerText;
    });
    hiddenPositions.value = true;
    validatedStuffInfo.position = true;
  }

  saveLS();
}

function saveLS() {
  localStorage.setItem("stuffInfo", JSON.stringify(stuffInfo));
  localStorage.setItem(
    "validatedStuffInfo",
    JSON.stringify(validatedStuffInfo)
  );
}
function Submit() {
  for (let [key, value] of Object.entries(validatedStuffInfo)) {
    if (!value) {
      validatedStuffInfo[key] = false;
      return;
    }
  }
  router.replace({ path: "/AddItem/LaptopInfo" });
}

watch(hiddenDeps, (newValue) => {
  if (!newValue) {
    hiddenPositions.value = true;
  }
})

watch(departments, () => {
  if (stuffInfo.department !== null) {
    document.getElementById("dep_id").value =
      departments.value[stuffInfo.department];
  }
})

watch(positions, () => {
  if (stuffInfo.position && stuffInfo.position !== null) {
    document.getElementById("position_id").value =
      positions.value[stuffInfo.position].position;
  }
})

fetch("https://pcfy-a6684-default-rtdb.firebaseio.com/departments.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    departments.value = data;
  });

fetch("https://pcfy-a6684-default-rtdb.firebaseio.com/positions.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    positions.value = data;
  });

onMounted(() => {
  if (localStorage.stuffInfo) {
    for(let i of Object.entries(JSON.parse(localStorage.getItem("stuffInfo")))){
      stuffInfo[i[0]] = i[1]
    }
    for(let i of Object.entries(JSON.parse(localStorage.getItem("validatedStuffInfo")))){
      validatedStuffInfo[i[0]] = i[1]
    }
  }
})
</script>

<style scoped>
main {
  margin: auto;
  width: 66%;
  padding: 3% 5%;
  border-radius: 0.5rem;
  background-color: white;
}

form {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

#fullname {
  display: flex;
  justify-content: space-between;
  gap: 10%;
}

.inputContainer {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.inputContainer>input {
  margin: 0.25rem 0;
  padding: 0.5rem 0.8rem;
  font-size: 1rem;
  border-radius: 0.5rem;
  outline: none;
  border: 0.1rem solid var(--inputBorder);
}

span {
  font-size: small;
  opacity: 0.6;
}

select {
  background-color: var(--backgroundColor);
  padding: 0.5rem 0.8rem;
  font-size: 1rem;
}

.dropdown {
  position: relative;
}

.form-select {
  position: relative;
  background-color: var(--backgroundColor);
  width: 100%;
  border: none;
  border-radius: 0.5rem;
  padding: 0.8rem;
  text-align: left;
  font-size: 1rem;
  font-weight: bold;
}

.dropdown::after {
  content: url("../assets/images/option_arrow.png");
  position: absolute;
  width: 1.5rem;
  height: 1.5rem;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}

.dropdown-content {
  position: absolute;
  width: 100%;
  background-color: white;
  box-shadow: 0 0 0.4rem black;
  border-radius: 0.5rem;
  overflow: hidden;
  z-index: 1;
  cursor: pointer;
}

.dropdown-content>div>p {
  padding: 0.5rem 0.8rem;
}

.dropdown-content>div:hover {
  background-color: var(--dropdownHover);
}

button {
  display: block;
  background-color: var(--buttonColor);
  color: white;
  border: none;
  border-radius: 0.5rem;
  padding: 1rem 2rem;
  width: 20%;
  margin-left: auto;
  cursor: pointer;
}

button:hover {
  background-color: var(--buttonColorHover);
}

button:active {
  background-color: var(--buttonColorActive);
}

img {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 3rem;
}

.hidden {
  display: none;
}

.open::after {
  transform: rotateX(180deg) translateY(50%);
}

input[class|="success"],
.success {
  border: 0.1rem solid green;
}

input[class|="failed"],
.failed {
  border: 0.1rem solid red;
}

@media screen and (max-width: 1000px) {
  #fullname {
    flex-direction: column;
    gap: 1rem;
  }

  button {
    width: 50%;
  }
}

@media screen and (max-width: 500px) {
  main {
    padding: 0 0.2rem;
  }

  main,
  button {
    width: 100%;
  }
}
</style>