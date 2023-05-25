<template>
  <main>
    <form @submit.prevent="Submit()">
      <label class="imageinput" :class="{ errorImage: validatedLaptopInfo.laptop_image == false }" for="laptop_image">
        <img :class="{ hidden: !validatedLaptopInfo.laptop_image }" src="" id="laptopPhoto" alt="laptop" />
        <input type="file" name="laptop_image" id="laptop_image" @change="validation($event.target)" />
        <h4 v-if="!validatedLaptopInfo.laptop_image">ჩააგდე ან ატვირთე</h4>
        <h4 v-if="!validatedLaptopInfo.laptop_image">ლეპტოპის ფოტო</h4>
        <h5 v-if="validatedLaptopInfo.laptop_image">ატვირთე ახალი</h5>
        <h5 v-else>ატვირთე</h5>
      </label>

      <div class="multipleInput">
        <div class="inputContainer">
          <label for="laptop_name">ლეპტოპის სახელი</label>
          <input type="text" name="laptop_name" placeholder="15S" :class="{
              success: validatedLaptopInfo.laptop_name,
              failed: validatedLaptopInfo.laptop_name == false,
            }" v-model="laptopInfo.laptop_name" @input="validation($event.target)" />
          <span>ლათინური ასოები, ციფრები, !@#$%^&*()_+= </span>
        </div>

        <div :class="{ dropdown: true, open: !hiddenBrands }">
          <input type="button" class="form-select" name="laptop_brand" id="laptop_brand" value="ლეპტოპის ბრენდი"
            @click="showDropdown" />
          <div class="dropdown_content" :class="{ hidden: hiddenBrands }" id="laptop_brands"
            @click="selectOption($event.target)">
            <div v-for="brand in brands" :key="brand">
              <p>{{ brand }}</p>
            </div>
          </div>
        </div>
      </div>

      <hr />

      <div class="multipleInput">
        <div :class="{ dropdown: true, open: !hiddenCPUs }">
          <input type="button" class="form-select open" name="CPU" id="CPU" value="CPU" @click="showDropdown" />

          <div :class="{ dropdown_content: true, hidden: hiddenCPUs }" id="CPUs" @click="selectOption($event.target)">
            <div v-for="CPU in CPUs" :key="CPU">
              <p>{{ CPU }}</p>
            </div>
          </div>
        </div>

        <div class="inputContainer">
          <label for="CPU_core">CPU-ს ბირთვი</label>
          <input type="number" name="CPU_core" placeholder="6" :class="{
              success: validatedLaptopInfo.CPU_core,
              failed: validatedLaptopInfo.CPU_core == false,
            }" v-model="laptopInfo.CPU_core" @input="validation($event.target)" />
          <span>მხოლოდ ციფრები</span>
        </div>

        <div class="inputContainer">
          <label for="CPU_threads">CPU-ს ნაკადი</label>
          <input type="number" name="CPU_threads" placeholder="12" :class="{
              success: validatedLaptopInfo.CPU_threads,
              failed: validatedLaptopInfo.CPU_threads == false,
            }" v-model="laptopInfo.CPU_threads" @input="validation($event.target)" />
          <span>მხოლოდ ციფრები</span>
        </div>
      </div>

      <div class="multipleInput">
        <div class="inputContainer">
          <label for="RAM">ლეპტოპის RAM (GB)</label>
          <input type="number" name="RAM" placeholder="8" :class="{
              success: validatedLaptopInfo.RAM,
              failed: validatedLaptopInfo.RAM == false,
            }" v-model="laptopInfo.RAM" @input="validation($event.target)" />
          <span>მხოლოდ ციფრები</span>
        </div>

        <div class="inputContainer">
          <label :class="{
              success: validatedLaptopInfo.memory_type,
              failed: validatedLaptopInfo.memory_type == false,
            }">მეხსიერების ტიპი</label>
          <div class="radioButtons">
            <input type="radio" name="memory_type" value="SSD" id="SSD" v-model="laptopInfo.memory_type"
              @input="validation($event.target)" /><label for="SSD">SSD</label>
            <input type="radio" name="memory_type" value="HDD" id="HDD" v-model="laptopInfo.memory_type"
              @input="validation($event.target)" /><label for="HDD">HDD</label>
          </div>
        </div>
      </div>

      <hr />

      <div class="multipleInput">
        <div class="inputContainer">
          <label for="buy_date">შეძენის რიცხვი (არჩევითი)</label>
          <input type="date" name="buy_date" :class="{
              success: validatedLaptopInfo.buy_date,
              failed: validatedLaptopInfo.buy_date == false,
            }" v-model="laptopInfo.buy_date" @input="validation($event.target)" />
        </div>

        <div class="inputContainer">
          <label for="price">ლეპტოპის ფასი</label>
          <input type="number" name="price" placeholder="0000" :class="{
              success: validatedLaptopInfo.price,
              failed: validatedLaptopInfo.price == false,
            }" v-model="laptopInfo.price" @input="validation($event.target)" />
          <span>მხოლოდ ციფრები</span>
        </div>
      </div>

      <div class="multipleInput">
        <div class="inputContainer">
          <label :class="{
              success: validatedLaptopInfo.laptop_state,
              failed: validatedLaptopInfo.laptop_state == false,
            }">ლეპტოპის მდგომარეობა</label>
          <div class="radioButtons">
            <input type="radio" name="laptop_state" id="new" value="ახალი" v-model="laptopInfo.laptop_state"
              @input="validation($event.target)" /><label for="new">ახალი</label>
            <input type="radio" name="laptop_state" id="old" value="მეორადი" v-model="laptopInfo.laptop_state"
              @input="validation($event.target)" /><label for="old">მეორადი</label>
          </div>
        </div>
      </div>

      <div id="buttons">
        <router-link to="/AddItem/StuffInfo">უკან</router-link>
        <button>დამახსოვრება</button>
      </div>
    </form>
    <img src="../assets/images/LOGO-bottom.png" id="logo" alt="logo" />
  </main>
</template>

<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue';

const emit = defineEmits(['send']);

const stuffInfo = reactive({});
const laptopInfo = reactive({
  laptop_image: null,
  laptop_name: null,
  laptop_brand: null,
  CPU: null,
  CPU_core: null,
  CPU_threads: null,
  RAM: null,
  memory_type: null,
  buy_date: null,
  price: null,
  laptop_state: null,
});
const validatedLaptopInfo = reactive({
  laptop_image: null,
  laptop_name: null,
  laptop_brand: null,
  CPU: null,
  CPU_core: null,
  CPU_threads: null,
  RAM: null,
  memory_type: null,
  buy_date: null,
  price: null,
  laptop_state: null,
});
const brands = ref([]);
const CPUs = ref([]);
const hiddenBrands = ref(true);
const hiddenCPUs = ref(true);

function showDropdown(e) {
  e.target.id == "laptop_brand"
    ? (hiddenBrands.value = !hiddenBrands.value)
    : (hiddenCPUs.value = !hiddenCPUs.value);
}
function validation(e) {
  let name = e.name;
  let value = e.value;
  switch (e.name) {
    case "laptop_image":
      document.querySelector("#laptopPhoto").src = URL.createObjectURL(
        e.files[0]
      );
      laptopInfo.laptop_image = e.files[0];
      validatedLaptopInfo.laptop_image = true;
      break;
    case "laptop_name":
      if (value.length > 0) {
        validatedLaptopInfo[name] = true;
      } else {
        validatedLaptopInfo[name] = false;
      }
      break;
    case "CPU_core":
    case "CPU_threads":
    case "RAM":
    case "price":
      if (value.length > 0 && value * 1 > 0) {
        validatedLaptopInfo[name] = true;
      } else {
        validatedLaptopInfo[name] = false;
      }
      break;
    case "memory_type":
    case "buy_date":
    case "laptop_state":
      validatedLaptopInfo[name] = true;
      break;
  }
  saveLS();
}
function selectOption(e) {
  let selectedButton = e.parentElement.parentElement;
  selectedButton.previousSibling.value = e.innerText;

  if (selectedButton.id == "laptop_brands") {
    laptopInfo.laptop_brand = brands.value.findIndex((brand) => {
      return brand == e.innerText;
    });
    hiddenBrands.value = true;
    validatedLaptopInfo.laptop_brand = true;
  }

  if (selectedButton.id == "CPUs") {
    laptopInfo.CPU = CPUs.value.findIndex((cpu) => {
      return cpu == e.innerText;
    });
    hiddenCPUs.value = true;
    validatedLaptopInfo.CPU = true;
  }

  saveLS();
}
function saveLS() {
  localStorage.setItem("laptopInfo", JSON.stringify(laptopInfo));
  localStorage.setItem(
    "validatedLaptopInfo",
    JSON.stringify(validatedLaptopInfo)
  );
}
function Submit() {
  for (let [key, value] of Object.entries(validatedLaptopInfo)) {
    if (!value) {
      validatedLaptopInfo[key] = false;
      return;
    }
  }
  for (let i of Object.entries(JSON.parse(localStorage.getItem("stuffInfo")))) {
    stuffInfo[i[0]] = i[1]
  }

  let allData = { ...stuffInfo, ...laptopInfo };

  fetch("https://pcfy-a6684-default-rtdb.firebaseio.com/PCFY.json", {
    method: "POST",
    body: JSON.stringify(allData),
  }).then((response) => {
    console.log(response);
  });

  emit("send");
}

const state = computed(() => {
  return laptopInfo.laptop_state;
})
const memory = computed(() => {
  return laptopInfo.memory_type;
})

watch(brands, () => {
  if (laptopInfo.laptop_brand !== null) {
    document.getElementById("laptop_brand").value =
      brands.value[laptopInfo.laptop_brand];
  }
})

watch(CPUs, () => {
  if (laptopInfo.CPU !== null) {
    document.getElementById("CPU").value = CPUs.value[laptopInfo.CPU];
  }
})

watch([memory, state], () => {
  saveLS();
})

fetch("https://pcfy-a6684-default-rtdb.firebaseio.com/brands.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    brands.value = data;
  });

fetch("https://pcfy-a6684-default-rtdb.firebaseio.com/CPUs.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    CPUs.value = data;
  });

onMounted(() => {
  if (localStorage.laptopInfo) {
    for (let i of Object.entries(JSON.parse(localStorage.getItem("laptopInfo")))) {
      laptopInfo[i[0]] = i[1]
    }
    for (let i of Object.entries(JSON.parse(localStorage.getItem("validatedLaptopInfo")))) {
      validatedLaptopInfo[i[0]] = i[1]
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

/* image input starts*/
.imageinput {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: rgba(138, 192, 231, 0.2);
  width: 100%;
  height: fit-content;
  border: dashed 2px var(--buttonColor);
  border-radius: 1rem;
  padding: 3rem;
  overflow: hidden;
}

.imageinput>input {
  opacity: 0;
  position: absolute;
  width: 100%;
  height: 100%;
}

.imageinput>h4 {
  text-align: center;
  color: var(--buttonColor);
  letter-spacing: 0.5px;
  line-height: 1.8rem;
}

.imageinput>h5 {
  display: block;
  background-color: var(--buttonColor);
  color: white;
  border: none;
  border-radius: 0.5rem;
  letter-spacing: 0.5px;
  padding: 0.8rem 2.5rem;
  margin-top: 4rem;
}

#laptopPhoto {
  margin: auto;
}

/* image input ends*/

.multipleInput {
  display: flex;
  justify-content: space-between;
  gap: 10%;
}

.inputContainer {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  z-index: 1;
}

.inputContainer>input {
  margin: 0.25rem 0;
  padding: 0.5rem 0.8rem;
  font-size: 1rem;
  border-radius: 0.5rem;
  outline: none;
  border: 0.1rem solid var(--inputBorder);
  height: 2.5rem;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

.radioButtons {
  transform: translateY(100%);
}

input[type|="radio"]:not(:first-child) {
  margin-left: 2rem;
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
  width: 100%;
  height: 2.5rem;
  transform: translateY(50%);
  z-index: 2;
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

.dropdown_content {
  position: absolute;
  width: 100%;
  background-color: white;
  box-shadow: 0 0 0.4rem black;
  border-radius: 0.5rem;
  overflow: hidden;
  z-index: 1;
  cursor: pointer;
}

.dropdown_content>div>p {
  padding: 0.5rem 0.8rem;
}

.dropdown_content>div:hover {
  background-color: var(--dropdownHover);
}

#buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2rem 0 3rem;
}

a {
  color: var(--buttonColor);
  text-decoration: none;
}

button {
  display: block;
  background-color: var(--buttonColor);
  color: white;
  border: none;
  border-radius: 0.5rem;
  padding: 1rem 1%;
  width: 25%;
  margin-left: auto;
  text-align: center;
  cursor: pointer;
}

button:hover {
  background-color: var(--buttonColorHover);
}

button:active {
  background-color: var(--buttonColorActive);
}

#logo {
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

input[class|="success"] {
  border: 0.1rem solid green;
}

input[class|="failed"] {
  border: 0.1rem solid red;
}

label[class|="success"] {
  color: green;
}

label[class|="failed"] {
  color: red;
}

label[class~="errorImage"] {
  background-color: rgba(255, 0, 0, 0.1);
  border-color: red;
}

@media screen and (max-width: 1000px) {
  .multipleInput {
    flex-direction: column;
    gap: 3rem;
  }

  button {
    width: 50%;
  }
}

@media screen and (max-width: 500px) {
  main {
    width: 100%;
    padding: 0 0.2rem;
  }

  button {
    width: 60%;
  }
}
</style>