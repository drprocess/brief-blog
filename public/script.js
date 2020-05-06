function ajaxRequest(method, url, callback, data) {
    let request = new XMLHttpRequest();
    request.onload = function () {
        let res = null;
        if (this.status === 200) {
            if (method === "GET")
                res = JSON.parse(this.responseText);
            callback(res);
        }
    };
    request.open(method, url, true);

    if (method === "POST" || method === "PUT") {
        data = JSON.stringify(data);
        request.setRequestHeader("Content-type", "application/json");
        request.send(data);
    }
    if (method === "GET" || method === "DELETE") {
        request.send();
    }
}

if (window.location.pathname === "/blogger.html")
    showBlogsControl();
if (window.location.pathname === "/")
    showBlogs()


function showBlogs() {
    ajaxRequest("GET", "/api/blogs/", res => {
        document.getElementById("content").innerHTML = "";
        for(let blog in res){
            document.getElementById("content").innerHTML +=
                '<div class="row mb-2 bg-light">'+
                '<div class="col">'+
                '<h2>'+res[blog].title+'</h2>'+
                '<p>'+res[blog].text+'</p>'+
                '</div> </div>';
        }
    });
}

function showBlogsControl(){
    ajaxRequest("GET", "/api/blogs/", res => {
        document.getElementById("blogList").innerHTML = "";
        for(let blog in res){
            document.getElementById("blogList").innerHTML +=
                '<div class="row my-3 bg-light">'+
                '<div class="col-xs-10">'+
                '<h4>'+ res[blog].title+ '</h4>'+
                '<div>'+
                '<a href="#" data-toggle="modal" data-target="#editModal" onclick="showBlog('+ res[blog].id+ ')"><i class="fa fa-edit text-warning" style="display: inline-block; margin: 5px; font-size:36px;"></i></a>'+
                '<a href="#" onclick="deleteBlog('+ res[blog].id+ ')"><i class="fa fa-remove text-danger" style="display: inline-block; margin: 5px; font-size:36px;"></i></a>'+
                '</div> </div> </div>';
        }
    });
}

function addBlog() {
    ajaxRequest("POST", "/api/blogs", res => {
        showBlogsControl();
    }, {
        title: document.getElementById("blogTitle").value,
        text: document.getElementById("blogText").value
    });
}

function showBlog(id){
    ajaxRequest("GET", "/api/blogs/" + id, res => {
        document.getElementById("editTitle").value = res.title;
        document.getElementById("editText").value = res.text;
        removeClickListeners("editBtn")
        document.getElementById("editBtn").addEventListener("click", function () {
            editBlog(id);
        });
    });
}

function removeClickListeners(btnId) {
    let old_element = document.getElementById(btnId);
    let new_element = old_element.cloneNode(true);
    old_element.parentNode.replaceChild(new_element, old_element);
}

function editBlog(id) {
    ajaxRequest("PUT", "/api/blogs/"+id, res => {
        showBlogsControl();
    }, {
        title: document.getElementById("editTitle").value,
        text: document.getElementById("editText").value
    });
}

function deleteBlog(id){
    ajaxRequest("DELETE", "/api/blogs/"+id, res => {
        showBlogsControl();
    });
}