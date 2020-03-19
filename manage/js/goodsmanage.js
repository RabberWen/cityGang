const myGood = document.querySelector('#myGood')
const myImg = document.querySelector('#myGood img')
const btn = document.querySelector('#btn')
const myTable = document.querySelector('#myTable')
let btnIndex = 0
const searchBtn = document.querySelectorAll("#search input[type=button]")
const keyword = document.querySelector("#search input[type=text]");
const goodTypeEnum = {
    1:"热门手机回收",
    2:"优品精选",
    3:"媒体报道"
}
getGoodList()
btn.addEventListener('click',()=>{
    const formdata = new FormData(myGood)
    const xhr = new XMLHttpRequest()
    let menthods = 'post'
    if(document.goodForm.id.value) menthods='put'
    xhr.open(menthods,'/good')
    xhr.send(formdata)
    xhr.onload = ()=>{
        const data = JSON.parse(xhr.responseText)
        const code = data.code
        if(code===1){
            getGoodList()
            myGood.reset()
            btn.value = '提交'
        }else{
            alert(data.msg)
        }
        myImg.src = ''
    }
})
function getGoodList(pageI=1){
    const xhr = new XMLHttpRequest()
    xhr.open('get','/good?pageIndex='+pageI+'&goodType='+btnIndex+'&keyword='+keyword.value)
    xhr.send()
    xhr.onload = ()=>{
        const data = JSON.parse(xhr.responseText)
        data.code===1 ? myTable.innerHTML=baidu.template('tp',data) : alert(data.msg)
    }
}
function goodInfoById(id){
    const xhr = new XMLHttpRequest()
    xhr.open('get','/good/'+id)
    xhr.send()
    xhr.onload = function(){
        const data = JSON.parse(xhr.responseText)
        if(data.code === 1){
            document.goodForm.goodTitle.value = data.goodInfo.advTitle;
            document.goodForm.goodHref.value = data.goodInfo.advHref;
            document.goodForm.goodType.value = data.goodInfo.advType;
            document.goodForm.orderBy.value = data.goodInfo.orderBy;
            document.goodForm.id.value = data.goodInfo._id;
            myImg.src = data.goodInfo.goodPic;
            btn.value = "修改";
        }else{
            alert(data.msg);
        }
    }
}
function changeImg(_this) {
    // 读取图片信息
    const reader = new FileReader();// 读取文件。
    reader.readAsDataURL(_this.files[0]);// 将文件转为base64格式。
    // 异步的操作。
    reader.onload = function(ev){
        myImg.src = ev.target.result;
    }
}