// tạo 1 mảng chứa giá trị dạng table
const VALUES = [
    {id : "scissors", values: "✌️"},
    {id : "rock", values: "✊"},
    {id : "paper", values: "🖐"}
]//độ dài là 3
// thắng: 1 - 0 = 1
//        2 - 1 = 1
//        0 - 2 = -2 
//       indexPlayer - indexComputer = 1 || -2 => 1
// hòa : indexPlayer - indexComputer = 0       => 0
// thua: else(còn lại)                         => -1
let i = 0;
const handleChange = ()=>{
    let computer = document.querySelector("#computer")
    computer.textContent = VALUES[i].values;
    computer.dataset.id = VALUES[i].id//cài thêm data-id cho máy tính
    if(i === VALUES.length - 1){
        i = 0;
    }else{
        i++;
    }
}
// setInterval(callback Function,milisecond): gọi cf mỗi milisecond
let interval = setInterval(handleChange,100)
// lưu interval để dành cho trường hợp cần nó ngưng lại 

// valuePlayer: rock        |       valueComputer: scissors
//      => index:   1       |       =>index: 0

// Viết 1 cái hàm so sánh 2 giá trị valuePlayer và valueComputer
// từ đó return 1 0 -1
const compare = (valuePlayer, valueComputer) =>{
    const indexPlayer = VALUES.findIndex(item => item.id == valuePlayer)
    const indexComputer = VALUES.findIndex(item => item.id == valueComputer)
    check = indexPlayer - indexComputer;
    if(check == 1 || check == -2){
        return 1;
    }else if(check == 0){
        return 0;
    }else{
        return -1;
    }

}
// làm sự kiện click của người hcowi
const playerItem = document.querySelectorAll(".user")
playerItem.forEach(item =>{
    item.addEventListener("click", event =>{
        // khi 1 nút user bị click thì thằng máy sẽ dừng lại
        clearInterval(interval)
        let valuePlayer = event.target.id;
        let valueComputer = computer.dataset.id
        let result = compare(valuePlayer, valueComputer)
        // alert(result)//xem kết quả trước
        // xóa actived trên các nút user và chặn sự kiện chuột trên các nút này
        playerItem.forEach(_item => {
            _item.classList.remove("actived")
            _item.style.pointerEvents = "none"
        });
        event.target.classList.add("actived")// đặt actived cho nút vừa nhấn

        // làm thông báo(làm 1 cái div để thông báo kết quả)
        const alertDiv = document.createElement("div")
        alertDiv.classList.add("alert")
        let msg = '';
        if(result == 1){
            msg = "bạn thắng"
            alertDiv.classList.add("alert-success")
        }else if(result == 0){
            msg = "bạn hòa"
            alertDiv.classList.add("alert-warning")
        }else{
            msg = "bạn thua"
            alertDiv.classList.add("alert-dark")
        }
        alertDiv.textContent = msg
        document.querySelector(".notification").appendChild(alertDiv)
        document.querySelector("#play-again").classList.remove("d-none")
    })
})
document.querySelector(".btn-play-again").addEventListener("click",event =>{
    interval = setInterval(handleChange,100)
    playerItem.forEach(_item => {
        _item.classList.remove("actived")
        _item.style.pointerEvents = ""
    });
    document.querySelector(".notification").innerHTML= " "
    document.querySelector("#play-again").classList.add("d-none")
})