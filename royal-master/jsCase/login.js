function login() {
    console.log("hllo")
    // event.preventDefault();
    let username = document.getElementById("inputUserName").value
    let password = document.getElementById("inputPassword").value;

    let appUser = {
        nameUser: username,
        passwordUser: password
    }
    $.ajax({
        type: "POST",
        headers: {
            //kiểu dữ liệu nhận về
            // 'Accept': 'application/json',
            // kiểu truyền đi
            'Content-Type': 'application/json'
        },
        url: "http://localhost:8080/login",
        data: JSON.stringify(appUser),
        //xử lý khi thành công
        success: function (data) {
            console.log(data);
            localStorage.setItem("token", data.token);
            localStorage.setItem("idUser",data.id);
            localStorage.setItem("nameUser",data.userName);
            location.href = "index.html"
        },
        error: function (err) {
            location.href = "login.html"
        }
    })
}
let listUser=[];
getDataListUser();
function getDataListUser(){
    $.ajax({
        type: "GET",
        headers: {
            //kiểu dữ liệu nhận về
            'Accept': 'application/json',
            // kiểu truyền đi
            'Content-Type': 'application/json'
        },
        url: "http://localhost:8080/appuser",
        //xử lý khi thành công
        success: function (data) {
            listUser=data;
            console.log(data)
        },
        error: function (err) {
            console.log(err)
        }
    })
}
function label(){
    let label = document.getElementsByClassName("label");
    for (let i=0;i<label.length;i++){
        label[i].innerHTML="";
    }
}
function register(event){
    console.log("hello ban !")
    event.preventDefault();
    let arrUser = document.getElementsByTagName("input")
    console.log(arrUser)
    let userName = arrUser[0].value
    let phone = arrUser[1].value
    let cmt = arrUser[2].value
    let eMail = arrUser[3].value
    let pass = arrUser[4].value
    if (userName=="" || cmt=="" || phone=="" || eMail==""||pass==""){
        label()
        alert("Nhập đầy đủ các trường")
        return;
    }
    if (isNaN(cmt)){
        label()
        alert("Nhập Cmt không có chữ")
        return;
    }
    if (isNaN(phone)){
        label()
        alert("Nhập đúng số điện thoại")
        return;
    }


    let username = document.getElementById("nameUser").value;
    let cccdUser =document.getElementById("cccdUser").value;
    let phoneUser = document.getElementById("phoneUser").value;
    let email = document.getElementById("email").value;
    let passwordUser= document.getElementById("passwordUser").value;
    let appUser = {
        nameUser: username,
        cccdUser: cccdUser,
        phoneUser :phoneUser,
        email:email,
        passwordUser:passwordUser
    }
    let check=true;
    let messageUserName="";
    let messagePhoneNumber="";
    let messageEmail="";
    for (let i = 0; i < listUser.length; i++) {
        if (listUser[i].nameUser===username){
            messageUserName="Tài khoản đã tồn tại"
            document.getElementById("messageUserName").innerText = messageUserName;
            check=false;
            console.log(check)
            return;
        }else {
            label()
            check=true;
            console.log(check)
        }
        if (listUser[i].phoneUser===phoneUser){
            messagePhoneNumber="Số điện thoại đã có người sử dụng";
            document.getElementById("messagePhoneNumber").innerText = messagePhoneNumber;
            check=false;
            return;
        }else {
            label()
            check=true;
            console.log(check)
        }
        if (listUser[i].email===email){
            messageEmail="Email đã có người sử dụng";
            document.getElementById("messageEmail").innerText = messageEmail;
            check=false;
            return;
        }else {
            label()
            check=true;
            console.log(check)
        }
    }


    if (check){
        $.ajax({
            type: "POST",
            headers: {
                // 'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: "http://localhost:8080/register",
            data: JSON.stringify(appUser),
            //xử lý khi thành công
            success: function (){
                alert("đăng kí thành công")
                location.href = "login.html"
                console.log("okoko")
                console.log("okoko")
                console.log("okoko")
            },
            error: function (err) {
                console.log(err)
            }
        })
    }
}
localStorage.removeItem("token");
localStorage.removeItem("idUser");
localStorage.removeItem("nameUser");

function logout() {
    window.localStorage.setItem("token","")
    window.localStorage.setItem("userName","")
    window.location.href = "login.html"
}
function forgotpass(event){
    event.preventDefault();
    let username = document.getElementById("nameUser").value;
    let email = document.getElementById("email").value;
    let Appuser = {
        nameUser: username,
        email:email,
    }
    $.ajax({
        type: "POST",
        headers: {
            // 'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: "http://localhost:8080/forgotpass",
        data: JSON.stringify(Appuser),

        //xử lý khi thành công
        success: function (data){
            console.log(data);
            location.href="login.html"
        },
        error: function (err) {
            console.log(err)
        }
    })

}