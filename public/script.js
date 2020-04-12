function ajaxRequest(method, url, callback, data) {
    let request = new XMLHttpRequest();
    request.onload = function () {
        let res = null;
        if (this.status == 200) {
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


function showBlogs(){
    ajaxRequest("GET", "/api/blogs/", res => {
        let blogs = res;
        document.getElementById("entrOfDep").innerHTML = res.name;
    });
}

function showBlog(id){
    ajaxRequest("GET", "/api/blogs/" + id, res => {
        let blog = res;
        document.getElementById("entrOfDep").innerHTML = res.name;
    });
}

function addBlog() {
    ajaxRequest("POST", "/api/blogs", res => {
        // loadEntreprises();
    }, {
        title: document.getElementById("blogTitle").value,
        text: document.getElementById("blogText").value
    });
}

function editBlog(id) {
    ajaxRequest("PUT", "/api/blogs/"+id, res => {
        // loadEntreprises();
    }, {
        title: document.getElementById("blogTitle").value,
        text: document.getElementById("blogText").value
    });
}

function deleteBlog(id){
    ajaxRequest("DELETE", "/api/blogs/"+id, res => {
        // loadEntreprises();
    });
}