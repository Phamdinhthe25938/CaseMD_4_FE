getData();

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


