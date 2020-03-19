// 求热门回收，返回结果
function getAdv(advType,limit,cb){
    const xhr = new XMLHttpRequest();
    xhr.open("get","http://127.0.0.1/adv/"+advType+"/"+limit);
    xhr.send();
    xhr.onload = function () {
        const data = JSON.parse(xhr.responseText);
        cb(data);
        // document.querySelector(".hot-hs-product .cnt-left").innerHTML = baidu.template("tp",data);
        // console.log(xhr.responseText)
    }
}
function getGood(goodType,limit,cb){
    const xhr = new XMLHttpRequest();
    xhr.open("get","http://127.0.0.1/good/"+goodType+"/"+limit);
    xhr.send();
    xhr.onload = function () {
        const data = JSON.parse(xhr.responseText);
        cb(data);
    }
}
getGood(1,5,data=>{
    document.querySelector("#huishoubox").innerHTML = baidu.template("huishoulist",data)
})
getGood(2,5,data=>{
    document.querySelector("#youpinbox").innerHTML = baidu.template("huishoulist",data)
})
getAdv(1,2,data=>{
    // 图片加载  img onload 预加载 懒加载
    let num = 0;
    for(let i=0;i<data.advList.length;i++){
        const img = new Image();
        img.src = data.advList[i].advPic;
        img.onload = function () {
            num++;
            if(num >= 2){
                document.querySelector("#box").innerHTML = baidu.template("bannerBox",data);
                init();
            }
        }
    }
})
// 轮播图底部??????????
getAdv(2,4,data=>{
    document.querySelector(".gaoshiqing").innerHTML = baidu.template("advBox",data)
})
// 调用热门回收
getAdv(3,1,data=>{
    document.querySelector(".hot-hs-product .cnt-left").innerHTML = baidu.template("tp",data);
});
// 优品精选
getAdv(4,1,data=>{
    document.querySelector(".hot-lp-product .cnt-left").innerHTML = baidu.template("tp",data);
});
