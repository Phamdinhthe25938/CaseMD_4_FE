//-----------------------------load picture-------------------------------------


function loadFile() {
    let fileImg = document.getElementById("picHotel").files;
    if (fileImg.length === 0) {
        alert("chưa up ảnh");
        return;
    }
    let picture=[]
    for (let i = 0; i < fileImg.length; i++) {
        let formData = new FormData();
        formData.append("file", fileImg[i]);
        $.ajax({
            contentType: false,
            processData: false,
            type: "POST",
            data: formData,
            url: "http://localhost:8080/picture/img",
            success: function (data) {
                picture.push(data)
                console.log("fileImg:" + fileImg.length)
                console.log("luu anh ok")
                if (i == fileImg.length-1){
                    createPicture(picture)
                }
            }
        });
    }
}

//-----------------------------create picture-------------------------------------

function createPicture(data) {
    let pic = data
    let pictureRoom=[]
    for (let i = 0; i < pic.length; i++) {
        let obj = {
            img: data[i]
        }
        console.log("obj");
        console.log(obj);

        $.ajax({
            type: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: "http://localhost:8080/picture",
            data: JSON.stringify(obj),
            //xử lý khi thành công
            success: function (data) {
                pictureRoom.push(data)
                console.log("count:" + pic.length)
                console.log("du lieu anh ok")
                if (i==pic.length-1){
                    createRoom(pictureRoom)
                    console.log(pictureRoom)
                    console.log("cuoi cung da ok")
                }


            },
            error: function (err) {
                console.log(err)

            }
        })
    }
}

//-----------------------------tao phong-------------------------------------


function createRoom(Array) {
    let nameRoom = document.getElementById("nameRoom").value;
    let roomType = document.getElementById("roomType").value;
    let roomKind = document.getElementById("roomKind").value;
    let view = document.getElementById("view").value;
    let statusRoom = document.getElementById("statusRoom").value;
    let priceRoom = document.getElementById("priceRoom").value;

    let obj = {
        nameRoom: nameRoom,
        roomType: roomType,
        roomKind: roomKind,
        view: view,
        statusRoom: statusRoom,
        priceRoom: priceRoom,
        pictures: Array
    }

    console.log("obj");
    console.log(obj);

    $.ajax({
        type: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: "http://localhost:8080/room",
        data: JSON.stringify(obj),
        //xử lý khi thành công
        success: function (data) {
            console.log(data.content)
            location.href = "showRoom.html";
        },
        error: function (err) {
            console.log(err)
        }
    })
}

