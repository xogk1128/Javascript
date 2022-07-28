var itemlist = [];
var addBtn = document.querySelector("#add");
addBtn.addEventListener("click",addList);

function addList(){
    var item = document.querySelector("#item").value;
    if(item!=null){
        itemlist.push(item);
        document.querySelector("#item").value = "";
        document.querySelector("#item").focus();
    }
    showList();
}

function showList(){
    // 목록 추가하기
    var list = "<ul>";
    for(var i=0; i < itemlist.length; i++){
        list += "<li>" + itemlist[i] + "<span class='close' id" + "=" + i + ">❌</span>"+"</li>";
    }
    list += "</ul>";

    document.querySelector("#itemList").innerHTML = list;
    
    // 목록 제거하기
    var remove = document.querySelectorAll(".close");
    for(var i=0; i<itemlist.length; i++){
        remove[i].addEventListener("click",removeList);
    }
}

function removeList(){
    var id = this.getAttribute("id");
    itemlist.splice(id,1);
    showList();
}