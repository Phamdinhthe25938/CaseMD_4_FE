let token = localStorage.getItem("token");
let idUser = localStorage.getItem("idUser");
console.log("hello")
getDataDrink();
function getDataDrink(){
    $.ajax({
        type: "GET",
        headers:{
            'Accept': 'application/json'
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", "Bearer " + token);
        },
        url: "http://localhost:8080/user/drinks",
        success: function (data) {
                 showDataDrink(data);
                 statusDrink(data);
                 displayDataLocalSelect();
                 quantityLocalQuantityDrinkExist(data);
        },
        error: function (err) {
            console.log(err)
            location.href = "login.html"
        }
    })
}
function statusDrink(data){
    for(let i=0;i<data.length;i++){
        if(data[i].quantityDrink!==0){
            information[i].innerHTML=`
                  <span class="label label-default" style=" background: green; padding: 8px 12px;">Active</span>
            `
        }
        else {
            information[i].innerHTML=`
                <span class="label label-default" style="background: #ccc;padding: 7px;color:red">UnActive</span>
            `
        }
    }
}
function showDataDrink(data){
    let str="";
    for (let i=0;i<data.length;i++){
        str+=`
         <tr>
                            <input type="text" class="idDrink" value="${data[i].idDrink}" hidden>
                            <td>
                                <img src="${data[i].imgDrink}" alt="">
                                <a href="#" class="user-link">${data[i].nameDrink}</a>
                                <span class="user-subhead">Admin</span>
                            </td>
                            <td style="text-align: center" class="priceDrink">
                               ${data[i].priceDrink}
                            </td>
                        
                            <td style="text-align: center" class="quantityExist">
                                ${data[i].quantityDrink}
                            </td>
                            <td class="text-center information">
                                <span class="label label-default" style=" background: green; padding: 8px 12px;">Active</span>
                            </td>
                            <td style="text-align: center">
                            <button onclick="selectItemDrinksMinus(${i},${data[i].quantityDrink})"   class="minusBtn " style="background: azure"><i class="fa-solid fa-minus"></i></button>
                            <span style="padding: 0 12px;font-size: 15px;">
                            <div style="display: inline-block;width: 15px" class="quantitySelect">0</div>
                            </span>                       
                            <button onclick="selectItemDrinksAdd(${i},${data[i].quantityDrink})" class="addBtn "><i class="fa-solid fa-plus"></i></button> 
                             </td>
        `
    }
    document.getElementById("bodyListDrink").innerHTML=str;
}
let quantitySelect = document.getElementsByClassName("quantitySelect");
let quantityExist = document.getElementsByClassName("quantityExist");
let information = document.getElementsByClassName("text-center information");
function localSelect (){
    array=[]
    localStorage.removeItem("listSelect");
    let arrayLocalSelect=[];
    for (let i=0;i<quantitySelect.length;i++){
        arrayLocalSelect.push(quantitySelect[i].innerHTML);
    }
    localStorage.setItem("listSelect",arrayLocalSelect);
}
function displayDataLocalSelect(){
    let dataLocalSelect = localStorage.getItem("listSelect");
    console.log(dataLocalSelect);
    console.log(dataLocalSelect[0]);
    console.log(dataLocalSelect[1]);
    for (let i=0;i<quantitySelect.length;i++){
              if(i===0){
                quantitySelect[i].innerHTML = dataLocalSelect[i];
            }
              else if(i>0) {
                  quantitySelect[i].innerHTML = dataLocalSelect[i+i];
              }
        console.log(dataLocalSelect[quantitySelect[i].innerHTML]);
        }
}
function quantityLocalQuantityDrinkExist(data){
    for(let i=0;i<data.length;i++){
        let a= data[i].quantityDrink -Number(quantitySelect[i].innerHTML);
        quantityExist[i].innerHTML = a;
    }
}
function selectItemDrinksAdd(i,q){
    let str="";
    str+=`<span class="label label-default" style="background: #ccc;padding: 7px;color:red">UnActive</span>`
    // alert(q)
    let kq = Number(quantitySelect[i].innerText);
    kq++;
    quantitySelect[i].innerText=kq;
    let kq1 = Number(quantityExist[i].innerText)
    kq1--;
    quantityExist[i].innerText=kq1;
    if(kq1<=0){
        kq1=0;
        quantitySelect[i].innerText=q;
        quantityExist[i].innerText=kq1;
        information[i].innerHTML =str;
    }
}
function selectItemDrinksMinus(i,q){
    let str="";
    str+=`  <span class="label label-default" style="background: green; padding: 8px 12px;">Active</span>`
    let kq = Number(quantitySelect[i].innerText);
    kq--;
    quantitySelect[i].innerText=kq ;
    if(kq<=0){
        kq=0
        quantitySelect[i].innerText=kq;
        quantityExist[i].innerText=q;
    }
    else if(kq>0){
       let kq1 = Number(quantityExist[i].innerText)
       kq1++;
       quantityExist[i].innerText=kq1;
           information[i].innerHTML =str;

   }

}
let array=[];
class listSelect{
    idUser
    idDrink
    nameDrink
    quantitySelect
    priceDrink
    constructor(idUser,idDrink,nameDrink,quantitySelect,priceDrink){
        this.idUser = idUser;
        this.idDrink = idDrink;
        this.nameDrink = nameDrink;
        this.quantitySelect = quantitySelect;
        this.priceDrink= priceDrink;
    }
}
let idDrinks = document.getElementsByClassName("idDrink")
let nameDrinks = document.getElementsByClassName("user-link");
let priceDrinks = document.getElementsByClassName("priceDrink");
function pay(){
    array=[];
    for(let i=0;i<quantitySelect.length;i++){
        let a=   Number(quantitySelect[i].innerHTML);
        if(a!==0){
            let b = Number(idDrinks[i].value)
            let c = nameDrinks[i].innerHTML;
            let d = priceDrinks[i].innerHTML;
            array.push(new listSelect(idUser,b,c,a,d));
        }
    }
    console.log(array);
    let str=" ";
    let kqTotal=0;
    for(let i=0;i<array.length;i++){
         let kq= Number(array[i].quantitySelect) * Number(array[i].priceDrink);
          str+=`
                 <div class="form-group" style="display: flex;justify-content: space-between">
                       <div style="width: 58%">
                             <label>${array[i].nameDrink}</label>
                             <input type="email" value="${array[i].quantitySelect}" class="form-control" readonly required>
                         </div>   
                    <div>
                         <label>Số tiền</label>
                         <input type="email" value="${kq}" class="form-control" readonly required>
                     </div>             
                  </div>
          `
        kqTotal +=kq;
    }
    str+=`
            <div>
                  <label>Tổng Tiền </label>
                   <input type="email" value="${kqTotal}" class="form-control" readonly required>
           </div> 
       `
    document.getElementById("modal_body").innerHTML= str;
}
function resetSelect(){
    array=[];
}

function saveDataUserSelect(){
    let array1 = [];
    for(let i=0;i<array.length;i++){
        let appUserSelect = {
            appUser:{
                idUser:array[i].idUser
            },
            drink:{
                idDrink:array[i].idDrink
            },
            quantity:array[i].quantitySelect
        }
        array1.push(appUserSelect);
    }
    array=[];
    console.log(array1);
        for(let i=0;i<quantityExist.length;i++){
            if(Number(quantityExist[i].innerHTML)===0){

            }
        }
    localStorage.removeItem("listSelect");
    // document.getElementById("fa-bell").style.color="red";
    $.ajax({
        type: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", "Bearer " + token);
        },
        url: "http://localhost:8080/user/pay/"+idUser,
        data: JSON.stringify(array1),
        //xử lý khi thành công
        success: function (data) {
            getDataDrink();
        },
        error: function (err) {
            console.log(err)
        }
    })}
// localStorage.removeItem("listSelect");
console.log("hello")

