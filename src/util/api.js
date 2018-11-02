import * as apiConstants from "../constants/api";
import axios from "axios";

class Api {

    /**
     * Api to hit the loadBrainFuck script
     * @param inputScript
     * @returns {Promise<any>}
     */
    static loadBrainFuck(inputScript) {
        return new Promise((resolve, reject) => {
            const options = {
                url: `${apiConstants.API_BASE_URL}/brainfuck?user_id=${apiConstants.GITHUB_USERNAME}&script=${inputScript}`,
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'post'
            };
            axios(options)
                .then((resp) => {
                    resolve(resp);
                })
                .catch((err) => {
                    reject(err)
                });
        });
    }

    /**
     * Api to step through
     * @param id
     * @returns {Promise<any>}
     */
    static step(id) {
        return new Promise((resolve, reject) => {
            const options = {
                url: `${apiConstants.API_BASE_URL}/brainfuck/${id}/step?user_id=${apiConstants.GITHUB_USERNAME}`,
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'post'
            };
            axios(options)
                .then((resp) => {
                    resolve(resp);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
}

export default Api;
