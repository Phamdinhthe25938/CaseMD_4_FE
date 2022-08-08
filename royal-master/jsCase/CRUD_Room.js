let tbody = document.getElementById("list");
let addForm = document.getElementById("addForm");
let editForm = document.getElementById("editForm");
loadData()

function loadData() {
    $.ajax({
        type: "GET",
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        },
        url: 'http://localhost:8080/room',
        success: function (data) {
            display(data);


        },
        error: function (error) {
            console.log(error)
        }
    })

}

function display(data) {
    let str = "";
    for (let i = 0; i < data.length; i++) {
        str += `<tr>
                                <td>${i + 1}</td>
                                <td>${data[i].nameRoom}</td>
                                <td>${data[i].roomType}</td>
                                <td>${data[i].roomKind}</td>
                                <td>${data[i].view}</td>
                                <td>${data[i].statusRoom}</td>
                                <td>${data[i].priceRoom}</td>
                                <td><img src = "pictures/${data[i].pictures}" width="100px"></td>
                                <td><button class="btn btn-primary" data-toggle="modal" data-target="#exampleModal1" onclick="getEdit('${data[i].idRoom}')">Edit</button></td>
                                <td><button class="btn btn-primary" onclick="showDeleteForm(${data[i].idRoom})">Delete</button></td>
                           </tr>`
    }
    tbody.innerHTML = str;


}

//EDIT

function checkEdit() {
    let fileImg = document.getElementById("imgEdit").files;
    console.log(fileImg.length)
    if (fileImg.length === 0) {
        editNoUpFile();
    } else {
        editYesUpFile()
    }
}

function getEdit(id) {

    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: "http://localhost:8080/room/" + id,
        //xử lý khi thành công
        success: function (data) {
            console.log(data)
            showEdit(data);
        },
        error: function (err) {
            console.log(err)
        }
    })

}

function showEdit(room) {
    document.getElementById("idRoom").value = room.idRoom;
    document.getElementById("nameRoomEdit").value = room.nameRoom;
    document.getElementById("roomTypeEdit").value = room.roomType;
    document.getElementById("imgEdit").src = room.img;
    document.getElementById("roomKindEdit").value = room.roomKind;
    document.getElementById("viewEdit").value = room.view;
    document.getElementById("statusRoomEdit").value = room.statusRoom;
    document.getElementById("priceRoomEdit").value = room.priceRoom;
}

function editNoUpFile() {

    let id = $('#idRoom').val();
    let nameRoom = $('#nameRoomEdit').val();
    let roomType = $('#roomTypeEdit').val();
    let roomKind = $('#roomKindEdit').val();
    let view = $('#viewEdit').val();
    let statusRoom = $('#statusRoomEdit').val();
    let priceRoom = $('#priceRoomEdit').val();
    let img = document.getElementById("imgEdit").src;

    let room = {
        idRoom: id,
        nameRoom: nameRoom,
        roomType: roomType,
        roomKind: roomKind,
        view: view,
        statusRoom: statusRoom,
        priceRoom: priceRoom,
        img: img

    }
    callEdit(room);
}

function callEdit(room) {
    $.ajax({
        type: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: "http://localhost:8080/room",
        data: JSON.stringify(room),
        //xử lý khi thành công
        success: function (data) {
            alert("sua thanh cong");
            loadData()
        },
        error: function (err) {
            console.log(err)
        }
    })
}


function editYesUpFile() {
    let id = $('#idRoom').val();
    let nameRoom = $('#nameRoomEdit').val();
    let roomType = $('#roomTypeEdit').val();
    let roomKind = $('#roomKindEdit').val();
    let view = $('#viewEdit').val();
    let statusRoom = $('#statusRoomEdit').val();
    let priceRoom = $('#priceRoomEdit').val();
    let fileImg = document.getElementById("imgEdit").files;
    let formData = new FormData();
    formData.append("file", fileImg[0]);
    $.ajax({
        contentType: false,
        processData: false,
        type: "POST",
        data: formData,
        url: "http://localhost:8080/room/upImg",
        success: function (data) {
            let room = {
                idRoom: id,
                nameRoom: nameRoom,
                roomType: roomType,
                roomKind: roomKind,
                view: view,
                statusRoom: statusRoom,
                priceRoom: priceRoom,
                img: data

            }
            callEdit(room)
        }
    });
}

//CREAT
function create(data) {
    let nameRoom = $('#nameRoom').val();
    let roomType = $('#roomType').val();
    let roomKind = $('#roomKind').val();
    let view = $('#view').val();
    let statusRoom = $('#statusRoom').val();
    let priceRoom = $('#priceRoom').val();

    let room = {
        nameRoom: nameRoom,
        roomType: roomType,
        roomKind: roomKind,
        view: view,
        statusRoom: statusRoom,
        priceRoom: priceRoom,
        img: data
    }
    console.log(room)
    $.ajax({
            type: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: "http://localhost:8080/room",
            data: JSON.stringify(room),
            //xử lý khi thành công
            success: function (data) {
                alert("them thanh cong")
                loadData()
            },
            error: function (err) {
                console.log(err)
            }
        }
    )
}

function uploadFile() {
    let fileImg = document.getElementById("pictures").files;
    if (fileImg.length === 0) {
        alert("ảnh chưa up");
        return;
    }
    let formData = new FormData();
    formData.append("file", fileImg[0]);
    $.ajax({
        contentType: false,
        processData: false,
        type: "POST",
        data: formData,
        url: "http://localhost:8080/room/upImg",
        success: function (data) {
            create(data);
        }
    });
}


//DELETE
function showDeleteForm(id) {
    if (confirm("Are you sure ???")) {
        $.ajax({
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("token")
            },
            type: 'DELETE',
            url: 'http://localhost:8080/room/' + id,
            success: function () {
                loadData()
            },
            error: function (error) {
                console.log(error)
            }
        })
    }
}
//search
function search() {
    let searchName = document.getElementById("search");
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/room/search?name=" + searchName.value,
        success: function (data) {
            console.log(data)
            display(data)
        }
    });
}