const url = require('url');
const path = require('path');
const fs = require('fs');

const express = require('express');
const exphbs = require('express-hbs');
const app = express();

const partials = require('./paths/partials');
const pathsArray = partials.pathsArray;

const viewPath = path.join(__dirname, '/test-pages/pages/');


app.set('views', viewPath);
app.set('view engine', 'html');
app.engine('.html', exphbs.express4({
    partialsDir: pathsArray
}));


app.use(express.static(path.join(__dirname, '/public')));

function renderFile(res, pathFile) {
    res.render(pathFile.replace(/\.html$/i, '').replace(/^(\/|\\)/i, ''));
}

function renderDir(res, pathDir, fsPath) {
    const fileNames = fs.readdirSync(fsPath);
    let indexRenderDir = null;
    fileNames.forEach((fn, index) => {
        if (/^_/.test(fn)) {
            indexRenderDir = index;
        }
    });
    fileNames.splice(indexRenderDir, 1);
    const links = fileNames.map((fn) => {
        return {
            name: fn,
            link: path.join(pathDir, fn)
        }
    });
    res.render('__renderdir', {
        links
    });
}

app.get('/*', function (req, res, next) {
    const pathName = url.parse(req.url).pathname;

    if (/\.(js|css|ico|jpg|png)$/.test(pathName)) {
        next();
        return;
    }
    if (/\.html$/.test(pathName)) {
        renderFile(res, pathName);
        return;
    }
    const fsPath = path.join(viewPath, pathName);
    const stat = fs.lstatSync(fsPath);
    if (stat.isDirectory()) {
        renderDir(res, pathName, fsPath);
        return;
    }
    if (stat.isFile()) {
        renderFile(res, pathName);
        return;
    }
    next();
});

app.listen(8080, function () {
    console.log('Example app listening on port 3030!');
});