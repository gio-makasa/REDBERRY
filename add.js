const API = 'https://pcfy.redberryinternship.ge/api';
const info = {}; //save info for localstorage
const lapinfo = {}; //save info for localstorage
var formData = new FormData(); //saves info for API
const token = '89780f3fccc1efbf3d8cf02dd67fe582';

//tanamshromlis info
const team = document.getElementById('team_id');
const teams = document.getElementById('teams');
const position = document.getElementById('position_id');
const positions = document.getElementById('positions');

getteams(API+'/teams');
getinfo();

if(sessionStorage.getItem('page') == 2){
    emp_validateForm();
}

async function getteams(url){
    let resp = await fetch(url);
    let respdata = await resp.json();

    respdata.data.forEach(team => {
        let option = document.createElement('p');
        option.id = team.id;
        option.value = team.name;
        option.innerHTML = team.name;
        
        teams.appendChild(option);
    });
}

teams.addEventListener('mouseup', (e) => {
    team.value = e.target.value;
    position.value = 'პოზიცია';
    getpositions(API+'/positions');
});

async function getpositions(url){
    let resp = await fetch(url);
    let respdata = await resp.json();
    let ID;
    
    for(let p of teams.children){
        if(p.innerHTML == team.value){
            ID = p.id;
        }
    }

    positions.innerHTML = '';

    respdata.data.forEach(position => {
        let option = document.createElement('p');
        if(position.team_id == ID){
            option.id = position.id;
            option.value = position.name;
            option.innerHTML = position.name;

            positions.appendChild(option);
        }
    });

    position.disabled = false;
}

positions.addEventListener('mouseup', (e) => {
    position.value = e.target.value;
});

function emp_validateForm(){
    var error = 0; //counts errors
    // p-pattern, r-result
    
    //checking first name
    let fname = document.forms['empinfo']['name'];
    let fname_p = /^[ა-ჰ]+[ა-ჰ]+$/gm;
    let fname_r = fname_p.test(fname.value);
    if(!fname_r){
        fname.style.borderColor = 'red';
        fname.nextElementSibling.style.color = 'red';
        fname.previousElementSibling.style.color = 'red';
        error++;
    } else {
        fname.style.borderColor = '#8AC0E2';
        fname.nextElementSibling.style.color = 'black';
        fname.previousElementSibling.style.color = 'black';
    }

    //checking last name
    let lname = document.forms['empinfo']['surname'];
    let lname_p = /^[ა-ჰ]+[ა-ჰ]+$/gm;
    let lname_r = lname_p.test(lname.value);
    if(!lname_r){
        lname.style.borderColor = 'red';
        lname.nextElementSibling.style.color = 'red';
        lname.previousElementSibling.style.color = 'red';
        error++;
    } else {
        lname.style.borderColor = '#8AC0E2';
        lname.nextElementSibling.style.color = 'black';
        lname.previousElementSibling.style.color = 'black';
    }

    //checking team
    let team = document.forms['empinfo']['team_id'];
    
    if(team.value == 'თიმი'){
        team.style.border = 'solid 1px red';
        error++;
    } else {
        team.style.border = 'none';
    }

    //checking position
    let position = document.forms['empinfo']['position_id'];

    if(position.value == 'პოზიცია'){
        position.style.border = 'solid 1px red';
        error++;
    } else {
        position.style.border = 'none';
    }

    //checking email
    let email = document.forms['empinfo']['email'];
    let email_p = /[a-z]+@redberry.ge$/gim;
    let email_r = email_p.test(email.value);
    if(!email_r){
        email.style.borderColor = 'red';
        email.nextElementSibling.style.color = 'red';
        email.previousElementSibling.style.color = 'red';
        error++;
    } else {
        email.style.borderColor = '#8AC0E2';
        email.nextElementSibling.style.color = 'black';
        email.previousElementSibling.style.color = 'black';
    }

    //checking phone number
    let pnumber = document.forms['empinfo']['phone_number'];
    let pnumber_p = /^\+9955/gm;
    let pnumber_r = pnumber_p.test(pnumber.value);
    if(pnumber.value.length == 13 && pnumber_r){
        pnumber.style.borderColor = '#8AC0E2';
        pnumber.nextElementSibling.style.color = 'black';
        pnumber.previousElementSibling.style.color = 'black';
    } else {
        pnumber.style.borderColor = 'red';
        pnumber.nextElementSibling.style.color = 'red';
        pnumber.previousElementSibling.style.color = 'red';
        error++;
    }

    //checks errors
    if(error == 0){
        if(window.innerWidth < 600){
            let nav = document.getElementById('nav');
            nav.children[0].classList.add('hide');
            nav.children[1].classList.remove('hide');
            let border = document.getElementById('bottomborder');
            border.innerHTML = '2/2';
        }
        document.getElementById('emp_info').classList.add('hide');
        document.getElementById('laptop').classList.remove('hide');
        document.getElementById('bottomborder').style.left = '50%';
        document.getElementById('bottomborder').style.width = '42%';

        sessionStorage.setItem('page',2); //saves page number
    }
}

//laptop info
const brand = document.getElementById('laptop_brand_id');
const brands = document.getElementById('laptop_brands');
const cpu = document.getElementById('laptop_cpu');
const cpus = document.getElementById('laptop_cpus');

getbrands(API+'/brands');
getcpus(API+'/cpus');
getinfo();

async function getbrands(url){
    let resp = await fetch(url);
    let respdata = await resp.json();

    respdata.data.forEach(brand => {
        let option = document.createElement('p');
        option.id = brand.id;
        option.innerHTML = brand.name;
        
        brands.appendChild(option);
    });
}

brands.addEventListener('mouseup', (e) => {
    brand.value = e.target.value;
});

async function getcpus(url){
    let resp = await fetch(url);
    let respdata = await resp.json();

    respdata.data.forEach(cpu => {
        let option = document.createElement('p');
        option.id = cpu.id;
        option.value = cpu.name;
        option.innerHTML = cpu.name;
        
        cpus.appendChild(option);
    });
}

cpus.addEventListener('mouseup', (e) => {
    cpu.value = e.target.value;
});

function loadFile(event) {
    var imginput = document.getElementById('imageinput');
    imginput.classList.remove('image_free');
    imginput.classList.add('image_occupied');
	imginput.children[0].src = URL.createObjectURL(event.target.files[0]); //preview image
    imginput.children[0].style.width = '100%';
    imginput.children[0].classList.remove('hide');
    imginput.children[2].src = 'resource/checked.png'; //change error icon to checked
    imginput.children[2].classList.remove('hide');
    imginput.children[3].innerHTML = event.target.files[0].name; //show file name
    imginput.children[4].innerHTML = 'თავიდან ატვირთე';
    imginput.children[4].classList.remove('hide'); //if button(h5) is hide, show (on responsive)

    let p = document.createElement('p');
    let size = event.target.files[0].size;

    p.innerHTML = Math.round(size/1024) + 'KB';

    if(imginput.children[imginput.childElementCount-1].tagName == 'P'){
        imginput.children[imginput.childElementCount-1].innerHTML = p.innerHTML;
    } else {
        imginput.appendChild(p);
    }
}

function lap_validateForm(){
    var error = 0; //counts errors
    
    //checking image
    let img = document.getElementById('laptop_image');
    if(img.files.length == 0){
        img.nextElementSibling.classList.remove('hide');
        img.parentElement.style.borderColor = 'rgb(200, 0, 0)';
        img.parentElement.style.backgroundColor = '#e78a8a2f';
        img.nextElementSibling.nextElementSibling.style.color = 'rgb(200, 0, 0)';
        error++;
    }

    //checking laptop name
    let lapname = document.forms['lapinfo']['laptop_name'];
    let lapname_p = /[a-z]+[!@#$%^&*()_+=]*/gim;
    let lapname_r = lapname_p.test(lapname.value);
    if(!lapname_r){
        lapname.style.borderColor = 'red';
        lapname.nextElementSibling.style.color = 'red';
        lapname.previousElementSibling.style.color = 'red';
        error++;
    } else {
        lapname.style.borderColor = '#8AC0E2';
        lapname.nextElementSibling.style.color = 'black';
        lapname.previousElementSibling.style.color = 'black';
    }

    //checking laptop brand
    let brand = document.forms['lapinfo']['laptop_brand_id'];

    if(brand.value == ''){
        brand.style.border = 'solid 1px red';
        error++;
    } else {
        brand.style.border = 'none';
    }

    //checking cpu
    let cpu = document.forms['lapinfo']['laptop_cpu'];

    if(cpu.value == ''){
        cpu.style.border = 'solid 1px red';
        error++;
    } else {
        cpu.style.border = 'none';
    }

    //checking cpu core
    let cpucore = document.forms['lapinfo']['laptop_cpu_cores'];
    let cpucore_p = /\d+/gm;
    let cpucore_r = cpucore_p.test(cpucore.value);
    if(!cpucore_r){
        cpucore.style.borderColor = 'red';
        cpucore.nextElementSibling.style.color = 'red';
        cpucore.previousElementSibling.style.color = 'red';
        error++;
    } else {
        cpucore.style.borderColor = '#8AC0E2';
        cpucore.nextElementSibling.style.color = 'black';
        cpucore.previousElementSibling.style.color = 'black';
    }

    //checking cpu thread
    let cputhread = document.forms['lapinfo']['laptop_cpu_threads'];
    let cputhread_p = /\d+/gm;
    let cputhread_r = cputhread_p.test(cputhread.value);
    if(!cputhread_r){
        cputhread.style.borderColor = 'red';
        cputhread.nextElementSibling.style.color = 'red';
        cputhread.previousElementSibling.style.color = 'red';
        error++;
    } else {
        cputhread.style.borderColor = '#8AC0E2';
        cputhread.nextElementSibling.style.color = 'black';
        cputhread.previousElementSibling.style.color = 'black';
    }

    //checking RAM
    let RAM = document.forms['lapinfo']['laptop_ram'];
    let RAM_p = /\d+/gm;
    let RAM_r = RAM_p.test(RAM.value);
    if(!RAM_r){
        RAM.style.borderColor = 'red';
        RAM.nextElementSibling.style.color = 'red';
        RAM.previousElementSibling.style.color = 'red';
        error++;
    } else {
        RAM.style.borderColor = '#8AC0E2';
        RAM.nextElementSibling.style.color = 'black';
        RAM.previousElementSibling.style.color = 'black';
    }

    //checking memory type
    let memorytype = document.getElementsByName('laptop_hard_drive_type');

    for(let element of memorytype){
        if(element.checked){
            element.parentElement.firstElementChild.style.color = 'black';
            document.getElementById("memoryerror").classList.add("hide");
            break;
        } else {
            element.parentElement.firstElementChild.style.color = 'red';
            document.getElementById("memoryerror").classList.remove("hide");
        }
    };

    if(memorytype[0].parentElement.firstElementChild.style.color == 'red'){
        error++;
    }

    //checking date
    let date = document.forms['lapinfo']['laptop_purchase_date'];
    let date_p = /^[0-9]{1,2}[/]{1}[0-9]{1,2}[/]{1}[0-9]{4}$/gm;
    let date_r = date_p.test(date.value);

    if(date.value == '' || date_r){
        date.style.borderColor = '#8AC0E2';
        date.previousElementSibling.style.color = 'black';
    } else {
        date.style.borderColor = 'red';
        date.previousElementSibling.style.color = 'red';
    }

    //checking price
    let price = document.forms['lapinfo']['laptop_price'];
    let price_p = /\d+/gm;
    let price_r = price_p.test(price.value);
    if(!price_r){
        price.parentElement.style.borderColor = 'red';
        price.parentElement.nextElementSibling.style.color = 'red';
        price.parentElement.previousElementSibling.style.color = 'red';
        error++;
    } else {
        price.parentElement.style.borderColor = '#8AC0E2';
        price.parentElement.nextElementSibling.style.color = 'black';
        price.parentElement.previousElementSibling.style.color = 'black';
    }


    //checking condition
    var condition = document.getElementsByName('laptop_state');

    for(let element of condition){
        if(element.checked){
            element.parentElement.firstElementChild.style.color = 'black';
            document.getElementById("conditionerror").classList.add("hide");
            break;
        } else {
            element.parentElement.firstElementChild.style.color = 'red';
            document.getElementById("conditionerror").classList.remove("hide");
        }
    };

    if(condition[0].parentElement.firstElementChild.style.color == 'red'){
        error++;
    }
    
    //checks errors
    if(error == 0){
        finish();
    }
}




"change keyup mouseup".split(" ").forEach((e) => {
    document.forms['empinfo'].addEventListener(e, ()=> {
        setinfo();
    });

    document.forms['lapinfo'].addEventListener(e, ()=> {
        setinfo();
    });
});

//save info (localstorage and API)
function setinfo(){
    formData = new FormData(document.getElementById('empinfo'));
    let lapinfoData = new FormData(document.getElementById('lapinfo'));

    //save empdata
    formData.set(team.id,team.value);
    formData.set(position.id,position.value);
    for ([key, value] of formData) {
        info[key] = value;
    }
    localStorage.setItem('info', JSON.stringify(info));

    //save laptop data
    lapinfoData.set(brand.id,brand.value);
    lapinfoData.set(cpu.id,cpu.value);
    for ([key, value] of lapinfoData) {
        lapinfo[key] = value;
        formData.append(key, value);
    }
    localStorage.setItem('lapinfo', JSON.stringify(lapinfo));
}

function getinfo(){
    let getinfo = JSON.parse(localStorage.getItem('info'));
    let getlapinfo = JSON.parse(localStorage.getItem('lapinfo'));
    
    for(let info in getinfo){
        document.forms['empinfo'][info].value = getinfo[info];

        if(getinfo['team_id'] != 'თიმი'){
            getpositions(API+'/positions');
        }
    }
    
    for(let info in getlapinfo){
        if(info == 'laptop_image'){
            continue;
        }
        document.forms['lapinfo'][info].value = getlapinfo[info];
    }
}

function back(){
    document.getElementById('emp_info').classList.remove('hide');
    document.getElementById('laptop').classList.add('hide');
    sessionStorage.setItem('page',1);

    if(window.innerWidth < 600){
        const nav = document.getElementById('nav');
        nav.children[0].classList.remove('hide');
        nav.children[1].classList.add('hide');

        const border = document.getElementById('bottomborder');
        border.innerHTML = '1/2';
    } else{
        document.getElementById('bottomborder').style.left = '9%';
        document.getElementById('bottomborder').style.width = '30%';
    }
}

function finish(){
    document.getElementById('laptop').classList.add('hide');
    document.getElementById('popupback').classList.remove('hide');

    let getlapinfo = JSON.parse(localStorage.getItem('lapinfo'));

    for(let info in getlapinfo){
        formData.append(info,getlapinfo[info]);
    }
    
    for(i of teams.children){
        if(i.innerHTML == formData.get('team_id')){
            formData.set('team_id', i.id);
        }
    }
    
    for(i of positions.children){
        if(i.innerHTML == formData.get('position_id')){
            formData.set('position_id', i.id);
        }
    }
    
    for(i of brands.children){
        if(i.innerHTML == formData.get('laptop_brand_id')){
            formData.set('laptop_brand_id', i.id);
        }
    }

    formData.append('token',token);

    const request = new XMLHttpRequest();
    request.open("POST", API+"/laptop/create");
    request.send(formData);
    request.onload = () => console.log(request.responseText);

    localStorage.clear();
}

//show select options
function show(e) {
    e.nextElementSibling.classList.toggle("hide");
}

//close select options
window.onclick = function(event) {
    if (!event.target.matches('.form-select')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      for (i = 0; i < dropdowns.length-1; i++) {
        dropdowns[i].classList.add('hide');
      }
    }
}

//responsive
if(window.innerWidth < 600){
    const nav = document.getElementById('nav');
    nav.children[1].classList.add('hide');

    const border = document.getElementById('bottomborder');
    border.innerHTML = '1/2';

    const imginput = document.getElementById('imageinput');
    imginput.children[0].src = 'resource/camera.png';
    imginput.children[0].classList.remove('hide');
    imginput.children[0].style.width = '50px';
    imginput.children[3].innerHTML = 'ლეპტოპის ფოტოს ატვირთვა';
    imginput.children[4].classList.add('hide');
}