const API = 'https://pcfy.redberryinternship.ge/api';
var exc = 1; //get info from localstorage once
const info = {};
const lapinfo = {};
const formData = new FormData();
const token = '89780f3fccc1efbf3d8cf02dd67fe582';

"change keyup".split(" ").forEach((e) => {
    document.forms['empinfo'].addEventListener(e, ()=> {
        const empinfoData = new FormData(document.getElementById('empinfo'));

        for ([key, value] of empinfoData) {
            info[key] = value;
            formData.append(key, value);

            if(key == 'team_id'){
                for(i of teams.children){
                    if(i.value == value){
                        info[key] = i.id;
                        formData.append(key, i.id);
                    }
                }
            }
            if(key == 'position_id'){
                for(i of positions.children){
                    if(i.value == value){
                        info[key] = i.id;
                        formData.append(key, i.id);
                    }
                }
            }
        }

        localStorage.setItem("info", JSON.stringify(info));
    });
    document.forms['lapinfo'].addEventListener(e, ()=> {
        const lapinfoData = new FormData(document.getElementById('lapinfo'));

        for ([key, value] of lapinfoData) {
            lapinfo[key] = value;
            formData.append(key, value);
            

            if(key == 'laptop_brand_id'){
                for(i of laptop_brand_id.children){
                    if(i.value == value){
                        lapinfo[key] = i.id;
                        formData.append(key, i.id);
                    }
                }
            }
        }

        localStorage.setItem("lapinfo", JSON.stringify(lapinfo));
    });
});

//tanamshromlis info
const teams = document.getElementById('team_id');
const positions = document.getElementById('position_id');

getteams(API+'/teams');

async function getteams(url){
    let resp = await fetch(url);
    let respdata = await resp.json();

    teams.innerHTML = '<option class="hide" value="">თიმი</option>';
    positions.innerHTML = '<option class="hide" value="">პოზიცია</option>';

    respdata.data.forEach(team => {
        let option = document.createElement('option');
        option.id = team.id;
        option.innerHTML = team.name;
        
        teams.appendChild(option);
    });


    if(localStorage.info){
        let getinfo = JSON.parse(localStorage.getItem("info"));
        
        if(getinfo.team_id){
            for(j of teams.children){
                if(j.id == getinfo['team_id']){
                    document.forms['empinfo']['team_id'].value = j.value;
                    info.team_id = j.id;
                    getpositions(API+'/positions');
                }
            }
        }
    }
}

teams.addEventListener('change', ()=> {
    positions.value = '';

    for(i of teams.children){
        if(i.value == teams.value){
            info.team_id = i.id;
        }
    }

    getpositions(API+'/positions');
});

async function getpositions(url){
    let resp = await fetch(url);
    let respdata = await resp.json();
    
    positions.disabled = false;
    positions.innerHTML = '';
    positions.innerHTML = '<option class="hide" value="">პოზიცია</option>';

    let getinfo = JSON.parse(localStorage.getItem("info"));

    respdata.data.forEach(position => {
        if(position.team_id == getinfo.team_id){
            let option = document.createElement('option');
            option.id = position.id;
            option.innerHTML = position.name;
    
            positions.appendChild(option);
        }
    });


    if(getinfo.position_id){
        for(j of positions.children){
            if(j.id == getinfo['position_id']){
                document.forms['empinfo']['position_id'].value = j.value;
                info.position_id = j.id;
            }
        }
    }

    getinfoLS();
}

positions.addEventListener('change', ()=> {
    for(i of positions.children){
        if(i.value == positions.value){
            info.position_id = i.id;
        }
    }
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

    if(team.value == ''){
        team.style.border = 'solid 1px red';
        error++;
    } else {
        team.style.border = 'none';
    }

    //checking position
    let position = document.forms['empinfo']['position_id'];

    if(position.value == ''){
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
            const nav = document.getElementById('nav');
            nav.children[0].classList.add('hide');
            nav.children[1].classList.remove('hide');
            const border = document.getElementById('bottomborder');
            border.innerHTML = '2/2';
        }
        document.getElementById('emp_info').classList.add('hide');
        document.getElementById('laptop').classList.remove('hide');
        document.getElementById('bottomborder').style.left = '50%';
        document.getElementById('bottomborder').style.width = '42%';
    }
}

function back(){
    document.getElementById('emp_info').classList.remove('hide');
    document.getElementById('laptop').classList.add('hide');

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

function getinfoLS(){
    if(exc){
    let getinfo = JSON.parse(localStorage.getItem("info"));
    let getlapinfo = JSON.parse(localStorage.getItem("lapinfo"));
        
        for(i in getinfo){
            if(i == 'team_id' || i == 'position_id'){
                continue;
            }
            document.forms['empinfo'][i].value = getinfo[i];
        }

        for(i in getlapinfo){
            if(i == 'laptop_image'){
                continue;
            }
            if(i == 'laptop_brand_id'){
                for(j of document.forms['lapinfo']['laptop_brand_id'].children){
                    if(j.id == getlapinfo[i]){
                        document.forms['lapinfo'][i].value = j.value;
                        lapinfo.laptop_brand_id = j.id;
                    }
                }
                continue;
            }
            document.forms['lapinfo'][i].value = getlapinfo[i];
        }

        exc = 0;
    }
}


//laptop info
const brands = document.getElementById('laptop_brand_id');
const cpus = document.getElementById('laptop_cpu');

getbrands(API+'/brands');
getcpus(API+'/cpus');

async function getbrands(url){
    let resp = await fetch(url);
    let respdata = await resp.json();

    brands.innerHTML = '<option class="hide" value="">ლეპტოპის ბრენდი</option>';

    respdata.data.forEach(team => {
        let option = document.createElement('option');
        option.id = team.id;
        option.innerHTML = team.name;
        
        brands.appendChild(option);
    });
}

async function getcpus(url){
    let resp = await fetch(url);
    let respdata = await resp.json();

    cpus.innerHTML = '<option class="hide" value="">CPU</option>';

    respdata.data.forEach(team => {
        let option = document.createElement('option');
        option.id = team.id;
        option.innerHTML = team.name;
        
        cpus.appendChild(option);
    });
}

function loadFile(event) {
    var imginput = document.getElementById('imageinput');
    imginput.classList.remove('image_free');
    imginput.classList.add('image_occupied');
	imginput.children[0].src = URL.createObjectURL(event.target.files[0]);
    imginput.children[0].classList.remove('hide');
    imginput.children[0].style.width = '100%';
    imginput.children[2].src = 'resource/checked.png';
    imginput.children[2].classList.remove('hide');
    imginput.children[3].innerHTML = event.target.files[0].name;
    imginput.children[4].innerHTML = 'თავიდან ატვირთე';
    imginput.children[4].classList.remove('hide');

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
    } else{
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

function finish(){
    document.getElementById('laptop').classList.add('hide');
    document.getElementById('popupback').classList.remove('hide');

    formData.append('token',token);

    const request = new XMLHttpRequest();
    request.open("POST", API+"/laptop/create");
    request.send(formData);
    request.onload = () => console.log(request.responseText);

    localStorage.clear();
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