const url = require('url');
const path = require('path');
const fs = require('fs');

const express = require('express');
const exphbs = require('express-handlebars');
const hbswax = require('handlebars-wax');

const app = express();

const viewPath = path.join(__dirname, '/test-pages/pages/');

const hbs = exphbs.create({
    layoutsDir: __dirname,
});
const handlebars = hbs.handlebars;
hbswax(handlebars)
    .partials('src/components/**/*.hbs', {
        parsePartialName: function (options, file) {
            const name = /\\([^\\]+)\.hbs$/.exec(file.path)[1];
            file.exports.path = file.path;
            return name;
        }
    });

handlebars.registerHelper('include', function (name, options) {
    const partial = handlebars.partials[name];

    const dataPath = partial.path.replace(/\\([^\\]+)$/, '\\data.json');
    let context = {};

    let field = null;
    if (options && options.hash.var) { field = options.hash.var; }

    try {
        const content = fs.readFileSync(dataPath);
        context = JSON.parse(content);
        if (field) { context.var = context[field]; }
    } catch (e) {
        console.error(e);
    }

    return partial(Object.assign({}, this, context));
});

app.engine('.html', hbs.engine);

app.set('views', viewPath);
app.set('view engine', 'html');

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
    const links = fileNames.map((fn) => ({
        name: fn,
        link: path.join(pathDir, fn)
    }));
    res.render('__renderdir', {
        links
    });
}

app.get('/*', function (req, res, next) {
    const pathname = url.parse(req.url).pathname;

    if (/\.(js|css|ico|png|jpg|gif|woff|woff2)$/.test(pathname)) {
        next();
        return;
    }
    if (/\.(html)$/.test(pathname)) {
        renderFile(res, pathname);
        return;
    }
    const fsPath = path.join(viewPath, pathname);
    const stat = fs.lstatSync(fsPath);
    if (stat.isDirectory()) {
        renderDir(res, pathname, fsPath);
        return;
    }
    if (stat.isFile()) {
        renderFile(res, pathname);
        return;
    }
    next();
});
app.listen(8080, function () {
    console.log('Example app listening on port 8080!');
});