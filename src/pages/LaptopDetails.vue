<template>
  <NavBar />
  <main>
    <div class="Row">
      <img src="../assets/images/laptop.png" alt="laptop_photo" />
      <table>
        <tr>
          <td>სახელი:</td>
          <td>{{ info.firstname }} {{ info.lastname }}</td>
        </tr>
        <tr>
          <td>დეპარტამენტი:</td>
          <td>{{ department() }}</td>
        </tr>
        <tr>
          <td>პოზიცია:</td>
          <td>{{ position() }}</td>
        </tr>
        <tr>
          <td>მეილი:</td>
          <td>{{ info.email }}</td>
        </tr>
        <tr>
          <td>ტელ. ნომერი:</td>
          <td>{{ info.phone_number }}</td>
        </tr>
      </table>
    </div>
    <hr />

    <div class="Row">
      <table>
        <tr>
          <td>ლეპტოპის სახელი:</td>
          <td>{{ info.laptop_name }}</td>
        </tr>
        <tr>
          <td>ლეპტოპის ბრენდი:</td>
          <td>{{ brand() }}</td>
        </tr>
        <tr>
          <td>RAM:</td>
          <td>{{ info.RAM }}</td>
        </tr>
        <tr>
          <td>მეხსიერების ტიპი:</td>
          <td>{{ info.memory_type }}</td>
        </tr>
      </table>

      <table>
        <tr>
          <td>CPU:</td>
          <td>{{ CPU() }}</td>
        </tr>
        <tr>
          <td>CPU-ს ბირთი:</td>
          <td>{{ info.CPU_core }}</td>
        </tr>
        <tr>
          <td>CPU-ს ნაკადი:</td>
          <td>{{ info.CPU_threads }}</td>
        </tr>
      </table>
    </div>
    <hr />

    <div class="Row">
      <table>
        <tr>
          <td>ლეპტოპის მდგომარეობა:</td>
          <td>{{ info.laptop_state }}</td>
        </tr>
        <tr>
          <td>ლეპტოპის ფასი:</td>
          <td>{{ info.price }}</td>
        </tr>
      </table>

      <table>
        <tr>
          <td>შეძენის რიცხვი:</td>
          <td>{{ info.buy_date }}</td>
        </tr>
      </table>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const info = ref([]);
const departments = ref([]);
const positions = ref([]);
const brands = ref([]);
const CPUs = ref([]);
const route = useRoute();


function department() {
  return departments.value[info.value.department];
}
function position() {
  if (positions.value[info.value.position]) {
    return positions.value[info.value.position].position;
  }
}
function brand() {
  return brands.value[info.value.laptop_brand];
}
function CPU() {
  return CPUs.value[info.value.CPU];
}


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

fetch(
  `https://pcfy-a6684-default-rtdb.firebaseio.com/PCFY/${route.params.laptopId}.json`
)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    info.value = data;
  });
</script>

<style scoped>
main {
  width: 66%;
  margin: auto;
}

.Row {
  display: grid;
  grid-template-columns: 50% 50%;
  align-items: flex-start;
}

img {
  margin: auto;
}

table {
  margin: 2rem 0;
}

td {
  padding: 0.5rem 0;
}

td:first-child {
  font-weight: bold;
  width: 40%;
}

@media screen and (max-width: 1000px) {
  * {
    font-size: 95%;
  }

  main {
    width: 100%;
  }

  .Row {
    grid-template-columns: 100%;
  }

  td:first-child {
    width: 50%;
    padding-left: 0.5rem;
  }
}
</style>