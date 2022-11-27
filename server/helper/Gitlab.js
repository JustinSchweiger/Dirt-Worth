import {Gitlab as GitlabAPI} from '@gitbeaker/node';

export class Gitlab {
    static #getClient() {
        return new GitlabAPI({
            token: process.env.ACCESS_TOKEN,
        });
    }

    static async getFile(path) {
        return await Gitlab.#getClient().RepositoryFiles.showRaw(process.env.PROJECT_ID, path, 'main');
    }

    static async getFileJson(path) {
        return JSON.parse(await Gitlab.getFile(path));
    }

    static async getAllFiles() {
        const tree = await Gitlab.#getClient().Repositories.tree(process.env.PROJECT_ID);
        const fileNames = tree.map(file => {
            return file.name;
        });

        const files = [];
        for (const fileName of fileNames) {
            files.push(await Gitlab.getFileJson(fileName));
        }

        return files
    }
}