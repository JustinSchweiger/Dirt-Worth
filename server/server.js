import express from 'express';
import { Gitlab } from './helper/Gitlab.js';

const app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');

(async () => {
    const files = await Gitlab.getAllFiles();
    const servers = files.map(file => {
        return {
            server: file.server,
            display_name: file.display_name,
            logo: file.logo
        }
    });

    for (const file of files) {
        app.get(`/${file.server}`, (req, res) => {
            return res.render('server', {server: file});
        });
    }

    app.get('/*', (req, res) => {
        const serverUrl = req.url.replace('/', '');

        if (serverUrl !== "" && !servers.find(server => server.server === serverUrl)) {
            return res.redirect('/');
        }

        return res.render('index', { serverNames: servers });
    });

    app.listen(process.env.FRONTEND_PORT, () => {
        console.log(`Server listening on port ${process.env.FRONTEND_PORT}`);
    });
})();