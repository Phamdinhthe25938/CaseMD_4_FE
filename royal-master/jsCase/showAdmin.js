getData();
let idUser = localStorage.getItem("idUser");
let token = localStorage.getItem("token");
getDataNotificationConfirmAdmin();
function getDataNotificationConfirmAdmin(){
    console.log("hello22222")
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json'
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", "Bearer " + token);
        },
        url: "http://localhost:8080/admin/listNotificationAdmin",
        success: function (data) {
            console.log(data);
            showDataNotificationConfirmAdmin(data)
            statusConfirmNotificationAdmin(data);
        },
        error: function (err) {
            console.log(err)
        }
    })
}
function showDataNotificationConfirmAdmin(data){
    let str="";
    for (let i=data.length-1;i>=0;i--){
        str+=`
           <div class="MessageDialogList">
            <div class="MessageDialog-itemContent" style="height: 60px">  
                <div class="MessageDialog-itemInfor">
                     <h3 class="MessageDialog-itemInfor--title" style="font-size: 12px;margin: 0;">Đơn hàng :   <span style="color: red;margin-left: 5px">${data[i].timeSelect}</span></h3>
                     <h3  class="MessageDialog-itemInfor--title-sub" style="margin: 0;font-size: 12px;">Tên KH :<span style="color: blue;margin-left: 27px">${data[i].appUser.nameUser}</span></h3>
                     <h3  class="MessageDialog-itemInfor--title-sub1" style="font-size: 12px;"></h3>
                </div>             
                </div>
             </div>                       
           </div>`
    }
    document.getElementById('header_messageDialog--content').innerHTML = str;
}
function statusConfirmNotificationAdmin(data){
    for(let i=data.length-1;i>=0;i--){
        if(data[i].statusConfirm===true){
            document.getElementsByClassName("MessageDialog-itemInfor--title-sub1")[data.length-1-i].innerHTML=`
                 Tình trạng : <span style="color:green;margin-left: 19px;;">   Đã xác nhận</span>
            `
        }
        else {
            document.getElementsByClassName("MessageDialog-itemInfor--title-sub1")[data.length-1-i].innerHTML= `
          Tình trạng : <span style="color:red;margin-left: 19px;;">   Đang chờ xác nhận ...</span>
          `
        }
    }
}
let temp = 1;
function notificationAdmin (){
    if (temp === 1) {
        document.getElementById('header_messageDialog').style.display = 'block'
        document.getElementById("notifyQuantity").innerText=" ";
        document.getElementById("notify-bell-icon").style.color='#ccc'
        updateNotificationTo0Admin()
        getDataNotificationConfirmAdmin();
        temp=2;
    } else if (temp === 2) {
        document.getElementById('header_messageDialog').style.display = 'none'
        temp = 1;
    }
}
function updateNotificationTo0Admin(){
    console.log("555555555555")
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json'
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", "Bearer " + token);
        },
        url: "http://localhost:8080/admin/updateQuantiyNorificationTo0Admin",
        success: function (data){

        },
        error: function (err) {
            console.log(err)
        }
    })
}
quantityNotificationAdmin();
function quantityNotificationAdmin(){
    console.log("555555555555")
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json'
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", "Bearer " + token);
        },
        url: "http://localhost:8080/admin/quantityNoticationAdmin",
        success: function (data) {
            if(data>0){
                document.getElementById("notifyQuantity").innerText=data;
                document.getElementById("notify-bell-icon").style.color='red'
            }
            else {
                document.getElementById("notifyQuantity").innerText=" ";
            }
        },
        error: function (err) {
            console.log(err)
        }
    })
}
function getData() {
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: "http://localhost:8080/admin",
        //xử lý khi thành công
        success: function (data) {
            console.log("data")
            console.log(data)
            showData(data);
        },
        error: function (err) {
            console.log(err)
        }
    })
}
function showrole(data){
    let str = "";
    for (let i = 0; i < data.length; i++) {
        str +=`
               ${data[i].nameRole}
         `
    }
    return str;
}
function showData(data) {
    let str = "";
    for (let i = 0; i < data.length; i++) {
        str +=  `  
         <tr><td>${i+1}</td>
            <td>${data[i].nameUser}</td>
            <td>${data[i].cccdUser}</td>
            <td> ${data[i].phoneUser}</td>
            <td>${data[i].email}</td>
            <td>${showrole(data[i].roles)}</td>
            
            <td><button type="button" class="btn btn-warning"  data-toggle="modal" data-target="#myModalEdit" onclick="getEdit(${data[i].idUser})">Edit</button></td>
        </tr> `;

    }

    document.getElementById("show").innerHTML = str;
}




function search() {
    let search = document.getElementById("search").value;
    if (search==""){
       getData();
    }else {
        $.ajax({
            type: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: "http://localhost:8080/admin/search?email=" + search,
            //xử lý khi thành công
            success: function (data) {
                console.log(data)
                showData(data);
            },
            error: function (err) {
                console.log(err)
            }
        })
    }

}


