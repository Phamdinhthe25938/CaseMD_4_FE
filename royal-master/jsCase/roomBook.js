const myKey = window.location.search;
const urlParams = new URLSearchParams(myKey);
const idRoom = urlParams.get('id')
console.log(id)
console.log(id)
console.log(id)
console.log(id)


$.ajax({
    type: "Get",
    headers: {
        'Accept': 'application/json', 'Content-text': 'application/json'
    }, url: 'http://localhost:8080/room/' + idRoom,
    //xử lý khi thành công
    success: function (data) {
        createRoomBook(data);
    }, error: function (err) {
        console.log(err)
    }
})

function createRoomBook(data) {
    let str = "";

    for (let i = 0; i < data.pictures.length; i++) {
        str += `  <div class="col-lg-3 col-sm-6">
                        <div class="accomodation_item text-center">
                            <div class="hotel_img">
                                <img src=${data.get(i).namePicture} alt="">
                            </div>
                        </div>
                    </div>`;
    }

    str += '<table border="1" cellpadding="5" style="background-color: antiquewhite">\n' +
        '        <tr>\n' +
        '            <th>Id</th>\n' +
        '            <th>Tên sản phẩm</th>\n' +
        '            <th>Giá bán</th>\n' +
        '            <th>Giảm giá</th>\n' +
        '            <th>Số lượng hàng nhập</th>\n' +
        '            <th>Số lượng hàng bán</th>\n' +
        '            <th>Hàng còn trong kho</th>\n' +
        '            <th>Ảnh sản phẩm</th>\n' +
        '            <th>Mô tả</th>\n' +
        '            <th>Loại sản phẩm</th>\n' +
        '            <th>nhãn hàng</th>\n' +
        '            <th>Sửa</th>\n' +
        '            <th>Xóa</th>\n' +
        '\n' +
        '        </tr>'

    document.getElementById("roomBook").innerHTML=str
}