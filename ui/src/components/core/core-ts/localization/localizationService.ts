import * as paths from "../../../../../paths/config-paths";

const LocalizationService = {
    async sendRequest(path: string) {
        return await fetch(`${paths.URL_SERVER}/assets/i18n/${path}.json`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            }
        }).then((response) => {
            try {
                return response.json();
            } catch (e) {
                return Promise.reject(e);
            }
        }).catch((error) => {
            console.log(error);
        });
    }
};

export default LocalizationService;
