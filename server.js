const express = require('express');
const hbs = require('hbs');
const app = express();
const fs = require('fs');
const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

app.use((req, res, next ) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err){
            console.log('Unable to apped to server.log');
        }
    })   
    next();
})

/*app.use((req,res) => {
    res.render('maintenance.hbs',{
        pageTitle: 'Maintenance Page',
        pageMessage: 'Sorry but the webpage is in maintenance mode'
        }
    )
})
*/
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase()
})

app.get('/', (request, response) => {
    response.render('welcome.hbs', {
        pageTitle: 'Welcome Page',
        pageMessage: 'Welcome to lab page'
    })
})

app.get('/about', (request, response) => {
    response.render('about.hbs', {
        pageTitle: 'About Page'
    })
})

app.get('/bad', (request, response) => {
    response.send({
        errorMessage: "Upps Something get wrong :(",
        solutionMessage: "Please try again :D"
    })
})

app.listen(port, () => {
    console.log(`Express app listing in port ${port}`);
})