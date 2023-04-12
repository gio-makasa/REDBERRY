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

<script>
export default {
  data() {
    return {
      info: {},
      departments: [],
      positions: [],
      brands: [],
      CPUs: [],
    };
  },

  methods: {
    department() {
      return this.departments[this.info.department];
    },
    position() {
      if (this.positions[this.info.position]) {
        return this.positions[this.info.position].position;
      }
    },
    brand() {
      return this.brands[this.info.laptop_brand];
    },
    CPU() {
      return this.CPUs[this.info.CPU];
    },
  },

  beforeCreate() {
    fetch("https://pcfy-a6684-default-rtdb.firebaseio.com/departments.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.departments = data;
      });

    fetch("https://pcfy-a6684-default-rtdb.firebaseio.com/positions.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.positions = data;
      });

    fetch("https://pcfy-a6684-default-rtdb.firebaseio.com/brands.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.brands = data;
      });

    fetch("https://pcfy-a6684-default-rtdb.firebaseio.com/CPUs.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.CPUs = data;
      });

    fetch(
      `https://pcfy-a6684-default-rtdb.firebaseio.com/PCFY/${this.$route.params.laptopId}.json`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.info = data;
      });
  },
};
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