const API = 'https://pcfy.redberryinternship.ge/api';
const token = '89780f3fccc1efbf3d8cf02dd67fe582';
const list = document.getElementById('list');

var listitem = document.createElement('div');
listitem.classList.add('listinfo');
listitem.classList.add('col-12');

getinfo(API+'/laptops?token='+token);

async function getinfo(url){
    let resp = await fetch(url);
    let respdata = await resp.json();
    console.log(respdata.data)
    respdata.data.forEach(info => {
        listitem.innerHTML=`
        <img src="${'https://pcfy.redberryinternship.ge'+info.laptop.image}" alt="laptop">
        <div class='info'>
            <h5>${info.user.name} ${info.user.surname}</h5>
            <p>${info.laptop.name}</p>
            <a href="laptopinfo.html" onClick="saveId(this)" id="${info.laptop.id}">მეტის ნახვა</a>
        </div>`;

        list.appendChild(listitem.cloneNode(true));
    });
}

function saveId(e){
    sessionStorage.clear();
    sessionStorage.setItem("ID", e.id);
}