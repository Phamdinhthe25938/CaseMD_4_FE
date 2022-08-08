

function getEdit(id) {
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: "http://localhost:8080/admin/" + id,
        //xử lý khi thành công
        success: function (data) {
            showEdit(data);
        },
        error: function (err) {
            console.log(err)
        }
    })

}

function showEdit(appUser) {
    document.getElementById("nameUserEdit").value = appUser.nameUser;
    document.getElementById("cccdUserEdit").value = appUser.cccdUser;
    document.getElementById("phoneUserEdit").value = appUser.phoneUser;
    document.getElementById("emailEdit").value = appUser.email;
    document.getElementById("idUser").value = appUser.idUser;
    // let s = "<select>" ;
    // for (let i = 0; i < appUser.roles.length; i++) {
    //     s += `
    //    <option>${appUser.roles[i].nameRole}</option>
    //      `
    // }
    // s += "</select>"
    // document.getElementById("roles").innerHTML = s;
    // console.log(s)
}

    function checkEdit() {
        let idUser = $("#idUser").val();
        let nameUser = $("#nameUserEdit").val();
        let cccdUser = $("#cccdUserEdit").val();
        let phoneUser = $("#phoneUserEdit").val();
        let email = $("#emailEdit").val();
        let idRole = $("#roles").val();
        let appUser = {
            idUser: idUser,
            nameUser: nameUser,
            cccdUser: cccdUser,
            phoneUser: phoneUser,
            email: email,
            roles: [{idRole: idRole}]
        }
        console.log(appUser)
        console.log(appUser)
        callEdit(appUser);

    }

    function callEdit(appUser) {
        $.ajax({
            type: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            url: "http://localhost:8080/admin",
            data: JSON.stringify(appUser),
            //xử lý khi thành công
            success: function (data) {
                getData(data);
            },
            error: function (err) {
                console.log(err)
            }
        })
    }

