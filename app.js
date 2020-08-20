const express = require('express')
const app = express()
const ejs = require('ejs')
const morgan = require('morgan')
const mongoose = require('mongoose')
const Blog = require('./models/blogs')
const port = process.env.PORT || 3000
const ip = require('ip')


console.dir(ip.address());


const dburl = "mongodb+srv://pedrito:pelon3009@nodeblogs-th770.mongodb.net/nodeblogs?retryWrites=true&w=majority"
mongoose.connect(dburl, { useNewUrlParser:true, useUnifiedTopology:true }) // el segundo parametro es para que no me tire error en la consola nomas
    .then( res => {
        app.listen(port)
    })
    .catch((err) => {
        console.log(err)
    })
// register view engine
app.set('view engine', 'ejs')
// app.set('views', 'myviews') // por defecto busca las paginas a mostrar en la carpeta views, asi es como cambiamos esa config

// middleware and statics files, || this is to make files like .css and imgs public.
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true })) //without this i cant have the req.body property with the info of the form
app.use(morgan('dev'))


// routes
app.get('/', (req, res) => {
    // res.send('<p>HomePage</p>')
    // res.sendFile('./views/index.html', { root: __dirname })
    res.redirect('/blogs')
})
app.get('/about', (req, res) => {
    // res.send('<p>AboutPage</p>')
    res.render('about', { title: 'About Page' })
})
app.get('/blogs/create', (req,res) => {
    res.render('create', { title: 'Create Blog' })
})

// app.get('/new-blog', (req,res)  => {
//     const blog = new Blog({
//         title:'A new Blog!',
//         snippet:'My new blog snippet',
//         body:'My newest blog body'
//     })

//     blog.save()
//       .then(response => {
//           res.send(response)
//       })
//       .catch(err=>{
//           console.log(err)
//       })
// })

// blog routes
app.get('/blogs',(req,res) => {
    Blog.find().sort({ createdAt: -1 })
      .then(result => {
          res.render('index',{title:'All blogs', blogs:result})
      })
      .catch(err => {
          console.log(err)
      })
})
app.get('/blogs/:id', (req,res) => {
    const id = req.params.id
    Blog.findById(id)
      .then(result => {
          res.render('details', { blog:result, title:'Blog Details' })
      })
      .catch(err => {
          if(err)
            console.log(err)
      })
})
app.post('/blogs', (req,res) => {
    const blog = new Blog(req.body)
    blog.save()
      .then(result => {
        res.redirect('/blogs')
      })
      .catch(err => {
          if(err)
            console.log(err)
      })
})
app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id
    Blog.findByIdAndDelete(id)
      .then(result => {
          res.json({ redirect: '/blogs' }) 
      })
      .catch(err => console.log(err))
})


// 404 page
app.use((req,res) => {
    res.status(404).render('404',{title:'404 Page'})
})