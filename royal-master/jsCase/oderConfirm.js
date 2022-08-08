getDataOderConfirm();
let token = localStorage.getItem("token");
console.log(token);
function getDataOderConfirm() {
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: "http://localhost:8080/admin/listOderConfirm",
        success: function (data) {
            console.log(data)
            showDataOderConfirm(data);
            iconOderConfirm(data);
        },
        error: function (err) {
            console.log(err)

        }
    })
}
function iconOderConfirm(data){
    for(let i=data.length-1;i>=0;i--){
        console.log(i+":"+data[i].statusConfirm);
        if(data[i].statusConfirm===true){
            console.log(i+"hello")
            document.getElementsByClassName("iconConfirm")[data.length-1-i].innerHTML=`
             <a data-placement="top" class="btn btn-success btn-xs glyphicon glyphicon-ok" href="#" title="View">
          `
            document.getElementsByClassName("label label-danger")[data.length-1-i].style.background="#5cb85c"
        }
        else {
            document.getElementsByClassName("iconConfirm")[data.length-1-i].innerHTML= `
            <div style="padding: 0 4px;color: red; background: #ccc;border-radius: 4px;display: inline-block;font-size: 17px; position: relative; top: 3px; margin-right: 0;">
                   <i class="fa-solid fa-circle-xmark"></i>
             </div>`
        }
    }
}
function showDataOderConfirm(data){
    let str="";
    for(let i=data.length-1;i>=0;i--){
        let time = `${data[i].timeOder}`;
        console.log(typeof time);
        let str1= "'".concat(data[i].timeOder,"'");
        str+=`
             <div class="row">
                <div class="col-md-1"><img src="https://bootdey.com/img/Content/user_3.jpg" class="media-object img-thumbnail" /></div>
                <div class="col-md-11">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="pull-right"  onclick="getDataDetailOderConfirm(${data[i].appUser.idUser},${str1})" ><label class="label label-danger" data-toggle="modal" data-target="#myModal" style="cursor: pointer;padding: 6px"> Chi tiết</label></div>
                            <span><strong style="color: red; margin-right: 12px;">${data[i].appUser.nameUser}</strong></span> <span class="label label-info">group name</span>
                            <br>
                            <div>
                              <span style="margin-right: 22px;color: darkblue;">Quantity : ${data[i].quantityOder}</span> 
                              <span style="color:brown;">cost : $  ${data[i].totalMoneyOder}</span>
                            </div>
                            <div style="display:inline-block" class="iconConfirm">
                            
                           </div>
                            <a data-placement="top" class="btn btn-danger btn-xs glyphicon glyphicon-trash" href="#" title="Danger"></a>
                            <a data-placement="top" class="btn btn-info btn-xs glyphicon glyphicon-usd" href="#" title="Danger"></a>
                        </div>
                        <div class="col-md-12">Order made on: ${data[i].timeOder}by <a href="#">Jane Doe </a></div>
                    </div>
                </div>
            </div>
        `
    }
    document.getElementById("contentDisplayData").innerHTML=str;
}
function hello(){
    console.log("hello")
}
function statusOderConfirm(data){
    for (let i=0;i<data.length;i++){
        console.log(data[i].statusConfirm)
    }
    if(data[0].statusConfirm===true){
        document.getElementById("btnConfirmOder").innerHTML=`
          <div class="btn btn-primary d-block h8" style="background: #cccc;color:red;">
                <span class=" ms-2"></span>Đã Thực hiện xác thực<span class="ms-3 "></span>
          </div>
          `
    }
}
function getDataDetailOderConfirm(id,time){
    let newTime = time.replace("T"," ");
    console.log(newTime);
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: "http://localhost:8080/admin/detailListOderConfirm/"+id+"/"+newTime,
        success: function (data) {
            console.log(data);
            showDataDetailOderConfirm(data);
            statusOderConfirm(data);
        },
        error: function (err) {
            console.log(err)

        }
    })
}
function showDataDetailOderConfirm(data){
    console.log(data.length)
    let totalMoney =0;
    for (let i=0;i<data.length;i++){
        totalMoney+=  data[i].quantity *  data[i].drink.priceDrink;
    }
    let timeSelect  = "'".concat(data[0].timeSelect,"'");
    let str=""
    str+=`<div class="box-left">
                                <p class="textmuted h8">Khách hàng</p>
                                <p class="fw-bold h7">${data[0].appUser.nameUser}</p>
                                <p class="textmuted h8">Số CCCD: ${data[0].appUser.cccdUser}</p>
                                <p class="textmuted h8 mb-2">Phone Number : ${data[0].appUser.phoneUser}</p>
                                <p class="textmuted h8 mb-2">Email: ${data[0].appUser.email}</p>
                                <div class="h8">
                                    <div class="row m-0 border mb-3">
                                        <div class="col-6 h8 pe-0 ps-2">
                                            <p class="textmuted py-2">Items</p>
                                           `
    for(let i=0;i<data.length;i++){
        str+=` 
                                    <span class="d-block py-2 border-bottom">${data[i].drink.nameDrink}</span>
                                         `
    }
    str+=          `</div>
                                        <div class="col-2 text-center p-0 ">
                                            <p class="textmuted p-2">Qty</p>                                       
                                    `
    for(let i=0;i<data.length;i++){
        str+=` 
                                      <span style="height:45px" class="d-block p-2 border-bottom">${data[i].quantity}</span>
                                         `
    }
    str+=    `   </div>
                                        <div class="col-2 p-0 text-center h8 ">
                                            <p class="textmuted p-2">Price</p>                                    
                                         `
    for (let i=0;i<data.length;i++){
        str+=`
                                         <span   style="height:45px" class="d-block border-bottom py-2"><span class="">${data[i].drink.priceDrink}</span></span>
                                        `
    }
    str+=     `</div>
                                        <div class="col-2 p-0 text-center">
                                            <p class="textmuted p-2">Total</p>
                                     
                                          `
    for(let i=0;i<data.length;i++){
        let total =  data[i].quantity *  data[i].drink.priceDrink
        str+=`
                                               <span style="height:45px"  class="d-block py-2 border-bottom"><span class="fas fa-dollar-sign"></span>${total}</span>
                                            `
    }
    str+=`</div>
                                   </div>
                                    <div class="d-flex h7 mb-2">
                                        <p class="">Tổng tiền : </p>
                                        <p  style="margin-left: 20px;color:red;" class="ms-auto"><span class="fas fa-dollar-sign"></span>${totalMoney}</p>
                                   </div>
                                    <div class="h8 mb-5">
                                        <p class="textmuted">Lorem ipsum dolor sit amet elit. Adipisci ea harum sed quaerat tenetur </p>
                                    </div>
                                </div>
                                <div class="">
                                    <p class="h7 fw-bold mb-1">Nội dung gửi</p>
                                    <p class="textmuted h8 mb-2">Make payment for this invoice by filling in the details</p>
                                    <div class="form">
                                        <div class="row">
                                            <div class="col-12">
                                                <div class="card border-0"> <input class="form-control ps-5" id="contentNotification" placeholder="Nội dùng gửi đến khách hàng">
                                                    <span class="far fa-credit-card"></span> </div>
                                            </div>       
                                            <p class="p-blue h8 fw-bold mb-3" style="margin-left: 15px;margin-top: 10px;">MORE PAYMENT METHODS</p>
                                        </div>
                                       <div id="btnConfirmOder">
                                           <div class="btn btn-primary d-block h8" data-dismiss="modal" onclick="contentNotificationOderConfirm(${data[0].appUser.idUser},${timeSelect})"> Xác nhận số tiền <span>  </span> 
                                            <span class=" ms-2"></span>${totalMoney}<span class=""></span>
                                           </div>
                                      </div>
                                    </div>
                                </div>
                            </div>
     `
    document.getElementById("contentDetailOderConfirm").innerHTML= str;
}
function contentNotificationOderConfirm(idUser,timeSelect){
    let contentNotification= document.getElementById("contentNotification").value;
    let newTimeSelect = timeSelect.replace("T"," ")
    let appUserConfirm = {
        appUser:{
            idUser:idUser
        },
        contentNotification: contentNotification
    }
    $.ajax({
        type: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", "Bearer " + token);
        },
        url: "http://localhost:8080/admin/confirmOder/"+newTimeSelect,
        data: JSON.stringify(appUserConfirm),
        //xử lý khi thành công
        success: function (data) {
            getDataOderConfirm();
        },
        error: function (err) {
            console.log(err)
        }
    })
}
