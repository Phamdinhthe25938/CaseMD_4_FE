showRoom()
function showRoom(){
    console.log("TTTTT1")
    let tbody = document.getElementById("list");
    let addForm = document.getElementById("addForm");
    let editForm = document.getElementById("editForm");

        $.ajax({
            type: "GET",
            headers:{
                Authorization: 'Bearer ' + localStorage.getItem('token')
            },
            url: 'http://localhost:8080/room',
            success: function (data) {
                console.log(data)
                display(data);


            },
            error: function (error) {
                console.log(error)
            }
        })

    }
    function display(data) {
        let str = "";
        console.log(data)
        for (const r of data) {
            str += `<div class="col-lg-3 col-sm-6">
                        <div class="accomodation_item text-center">
                            <div class="hotel_img">
                                <img src="${r.pictures[0].img}" alt="">
                                <a href="blog-single.html" class="btn theme_btn button_hover">Chi tiết Phòng</a>
                            </div>
                            <a href="#"><h4 class="sec_h4">Double Deluxe Room</h4></a>
                            <h5>${r.priceRoom}</h5>
                        </div>
                    </div>`
        }
        console.log(str)
        document.getElementById("roomList").innerHTML=str
    }

    //
    // function showAddForm() {
    //     $("#exampleModal").modal("show");
    //
    // }
    // function add() {
    //     let formData = new FormData(addForm);
    //     console.log(formData)
    //     $.ajax({
    //         type: "POST",
    //         headers:{
    //             Authorization: 'Bearer ' + localStorage.getItem('token')
    //         },
    //
    //         enctype: 'multipart/form-data',
    //         url: "http://localhost:8080/room",
    //         data: formData,
    //         processData: false,
    //         contentType: false,
    //         cache: false,
    //         timeout: 1000000,
    //         success: function (data) {
    //             console.log(data)
    //             $("#exampleModal").modal("hide");
    //             loadData()
    //             addForm.reset();
    //
    //         },
    //         errors: function (error) {
    //             console.log(error)
    //         }
    //     })
    //
    // }
    // function showEditForm(id) {
    //     $("#exampleModal1").modal("show");
    //
    //     $.ajax({
    //         type: "GET",
    //         headers:{
    //             Authorization: 'Bearer ' + localStorage.getItem("token")
    //         },
    //         url: "http://localhost:8080/room/" + id,
    //         success: function (data) {
    //             console.log(data)
    //             document.getElementById('idRoom').value = data.idRoom;
    //             document.getElementById('roomTypeEdit').value = data.roomType;
    //             document.getElementById('roomKindEdit').value = data.roomKind;
    //             document.getElementById('viewEdit').value = data.view;
    //             document.getElementById('statusRoomEdit').value = data.statusRoom;
    //             document.getElementById('priceRoomEdit').value = data.priceRoom;
    //             document.getElementById('newFile').innerHTML = `<img src="photos/${data.picture1}" width="100px" ">`;
    //
    //         }
    //     })
    // }
    //
    //
    // function update() {
    //     let id = document.getElementById('id').value;
    //     let formData = new FormData(editForm);
    //     $.ajax({
    //         type: "PUT",
    //         headers:{
    //             Authorization: 'Bearer ' + localStorage.getItem("token")
    //         },
    //         enctype: 'multipart/form-data',
    //         url: "http://localhost:8080/room/" + id,
    //         data: formData,
    //         processData: false,
    //         contentType: false,
    //         cache: false,
    //         success: function () {
    //
    //             // $('#exampleModal').modal('hide');
    //
    //             loadData();
    //             editForm.reset();
    //         },
    //         error: function (error) {
    //             console.log(error)
    //         }
    //     })
    // }
    // function showDeleteForm(id) {
    //     if (confirm("Are you sure ???")) {
    //         $.ajax({
    //             headers:{
    //                 Authorization: 'Bearer ' + localStorage.getItem("token")
    //             },
    //             type: 'DELETE',
    //             url: 'http://localhost:8080/room/' + id,
    //             success: function () {
    //                 loadData()
    //             },
    //             error: function (error) {
    //                 console.log(error)
    //             }
    //         })
    //     }
    // }
    //
    //
// }