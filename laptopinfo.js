const API = 'https://pcfy.redberryinternship.ge/api';
const token = '89780f3fccc1efbf3d8cf02dd67fe582';
const infoelement = document.getElementById('info');
const ID = sessionStorage.getItem('ID').toString();

var teams = [];
var positions = [];
var brands = [];

getteams(API+'/teams');
getpositions(API+'/positions');
getbrands(API+'/brands');

var main = document.createElement('div');

async function getteams(url){
  let resp = await fetch(url);
  let respdata = await resp.json();

  respdata.data.forEach(element => {
    teams[element.id] = element.name;
  });
}

async function getpositions(url){
  let resp = await fetch(url);
  let respdata = await resp.json();
  
  respdata.data.forEach(element => {
    positions[element.id] = element.name;
  });
}

async function getbrands(url){
  let resp = await fetch(url);
  let respdata = await resp.json();
  
  respdata.data.forEach(element => {
    brands[element.id] = element.name;
  });
}

getinfo(API+'/laptop/'+ID+'?token='+token);

async function getinfo(url){
  let resp = await fetch(url);
  let respdata = await resp.json();

  infochanger(respdata.data);
}

function infochanger(info){
  info.user.team_id = teams[info.user.team_id];
  info.user.position_id = positions[info.user.position_id];
  info.laptop.brand_id = brands[info.laptop.brand_id];

  if(info.laptop.purchase_date == null){
    info.laptop.purchase_date = 'ინფორმაცია არაა';
  }

  if(info.laptop.state == 'new'){
    info.laptop.state = 'ახალი';
  } else {
    info.laptop.state = 'მეორადი';
  }

  isa(info);
}

function isa(info){
  main.innerHTML = `<div class="col-12" id="main">
    <img src="${'https://pcfy.redberryinternship.ge'+info.laptop.image}" alt="laptopimage" class="col-6">
    <table class="col-6" id="info">
    <tr>
      <td>სახელი:</td>
      <td>${info.user.name} ${info.user.surname}</td>
    </tr>
    <tr>
      <td>თიმი:</td>
      <td>${info.user.team_id}</td>
    </tr>
    <tr>
      <td>პოზიცია:</td>
      <td>${info.user.position_id}</td>
    </tr>
    <tr>
      <td>მეილი:</td>
      <td>${info.user.email}</td>
    </tr>
    <tr>
      <td>ტელ. ნომერი:</td>
      <td>${info.user.phone_number}</td>
    </tr>
    </table>
    </div>

    <hr>

    <table class="col-6">
    <tr>
      <td>ლეპტოპის სახელი:</td>
      <td>${info.laptop.name}</td>
    </tr>
    <tr>
      <td>ლეპტოპის ბრენდი:</td>
      <td>${info.laptop.brand_id}</td>
    </tr>
    <tr>
      <td>RAM:</td>
      <td>${info.laptop.ram}</td>
    </tr>
    <tr>
      <td>მეხსიერების ტიპი:</td>
      <td>${info.laptop.hard_drive_type}</td>
    </tr>
    </table>

    <table class="col-6">
    <tr>
      <td>CPU:</td>
      <td>${info.laptop.cpu.name}</td>
    </tr>
    <tr>
      <td>CPU-ს ბირთვი:</td>
      <td>${info.laptop.cpu.cores}</td>
    </tr>
    <tr>
      <td>CPU-ს ნაკადი:</td>
      <td>${info.laptop.cpu.threads}</td>
    </tr>
    </table>

    <hr>

    <table class="col-6">
    <tr>
      <td>ლეპტოპის მდგომარეობა:</td>
      <td>${info.laptop.state}</td>
    </tr>
    <tr>
      <td>ლეპტოპის ფასი:</td>
      <td>${info.laptop.price}</td>
    </tr>
    </table>

    <table class="col-6">
    <tr>
      <td>შევსების რიცხვი:</td>
      <td>${info.laptop.purchase_date}</td>
    </tr>
    </table>`;
}

infoelement.appendChild(main);