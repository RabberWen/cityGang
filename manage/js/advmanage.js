const myAdv = document.querySelector('#myAdv')
const myImg = document.querySelector('#myAdv img')
const btn = document.querySelector('#btn')
const myTable = document.querySelector('#myTable')
let btnIndex = 0
const searchBtn = document.querySelectorAll("#search input[type=button]")
const keyword = document.querySelector("#search input[type=text]");
const advTypeEnum = {
    1:"轮播图",
    2:"轮播图底部",
    3:"热门回收",
    4:"优品精选"
}
getAdvList()
btn.addEventListener('click',()=>{
    const formdata = new FormData(myAdv)
    const xhr = new XMLHttpRequest()
    let menthods = 'post'
    if(document.advForm.id.value) menthods='put'
    xhr.open(menthods,'/adv')
    xhr.send(formdata)
    xhr.onload = () => {
        const data = JSON.parse(xhr.responseText)
        const code = data.code
        if(code===1){
            getAdvList()
            myAdv.reset()
            btn.value = '提交'
        }else{
            alert(data.msg)
        }
        myImg.src = ''
    }
})
function getAdvList(pageI=1){
    const xhr = new XMLHttpRequest()
    xhr.open('get','/adv?pageIndex='+pageI+'&advType='+btnIndex+'&keyword='+keyword.value)
    xhr.send()
    xhr.onload = ()=>{
        const data = JSON.parse(xhr.responseText)
        data.code===1 ? myTable.innerHTML=baidu.template('tp',data) : alert(data.msg)
    }
}
function advInfoById(id){
    const xhr = new XMLHttpRequest()
    xhr.open('get','/adv/'+id)
    xhr.send()
    xhr.onload = function(){
        const data = JSON.parse(xhr.responseText)
        if(data.code === 1){
            document.advForm.advTitle.value = data.advInfo.advTitle;
            document.advForm.advHref.value = data.advInfo.advHref;
            document.advForm.advType.value = data.advInfo.advType;
            document.advForm.orderBy.value = data.advInfo.orderBy;
            document.advForm.id.value = data.advInfo._id;
            myImg.src = data.advInfo.advPic;
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