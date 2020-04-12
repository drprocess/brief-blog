const express = require('express');
const fs = require("fs");

const app = express();
const router = express.Router();

app.use(express.static(__dirname + '\\public'));
app.use('/', router);
app.use(express.json());


//get all blogs
app.get('/api/blogs', (req, res) => {
    fs.readFile("blogs.json", (err, data) => {
        if (err) {
            return console.error(err);
        } else {
            const blogs = JSON.parse(data);
            res.send(blogs);
        }
    });
});

//get a single blog
app.get('/api/blogs/:id', (req, res) => {
    fs.readFile("blogs.json", (err, data) => {
        if (err) {
            return console.error(err);
        } else {
            const blogs = JSON.parse(data);
            const blog = blogs.find(e => e.id === +req.params.id);
            if (!blog) return res.send("there is no such blog");
            else {
                res.send(blog);
            }
        }
    });
});

//edit a single blog
app.put('/api/blogs/:id', (req, res) => {
    fs.readFile("blogs.json", (err, data) => {
        if (err) {
            return console.error(err);
        } else {
            const blogs = JSON.parse(data);
            const blog = blogs.find(e => e.id === +req.params.id);
            if (!blog) return res.send("there is no such blog");
            else {
                blog.title = req.body.title;
                blog.text = req.body.text;
                fs.writeFile("blogs.json", JSON.stringify(blogs, null, 2), (err, result) => {
                    if (err) {
                        return console.error(err);
                    } else {
                        res.send("the blog is edited successfully");
                    }
                });
            }
        }
    });
});

//delete a single blog
app.delete('/api/blogs/:id', (req, res) => {
    fs.readFile("blogs.json", (err, data) => {
        if (err) {
            return console.error(err);
        } else {
            const blogs = JSON.parse(data);
            const blog = blogs.find(e => e.id === +req.params.id);
            if (!blog) return res.send("there is no such blog");
            else {
                blogs.splice(blogs.indexOf(blog), 1);

                fs.writeFile("blogs.json", JSON.stringify(blogs, null, 2), (err, result) => {
                    if (err) {
                        return console.error(err);
                    } else {
                        res.send("the blog is removed successfully");
                    }
                });
            }
        }
    });
});

//add a new blog
app.post('/api/blogs', (req, res) => {
    fs.readFile("blogs.json", (err, data) => {
        if (err) {
            return console.error(err);
        } else {
            const blogs = JSON.parse(data);
            blogs.push({
                "id": blogs.length + 1,
                "title": req.body.name,
                "text": req.body.discription
            });
            fs.writeFile("blogs.json", JSON.stringify(blogs, null, 2), (err, result) => {
                if (err) {
                    return console.error(err);
                } else {
                    res.send("the blog is added successfully");
                }

            });
        }
    });
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));