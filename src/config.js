/**
 * Config
 *
 * @author Louis Thai <louis.thai@finaldream.de>
 * @since 05.07.2017
 */
const { get } = require('lodash');

class Config {

    /**
     * Config constructor
     * @param {{}} config
     */
    constructor(config) {
        this.config = config || {};
    }

    /**
     * Get configuration value by key
     * @param {string} key
     * @param defaultValue
     */
    get(key, defaultValue = false) {
        const value = get(this.config, key);

        return (value === undefined) ? defaultValue : value;
    }

    /**
     * Load config from 'dehydrated'-state
     * @param {string|{}} input
     */
    load(input) {
        let configs = {};

        if (typeof input === 'string') {
            try {
                configs = JSON.parse(input);
            } catch (error) {
                throw new Error('Can not load configuration from string.');
            }
        } else if (typeof input === 'object') {
            configs = input;
        }

        this.config = configs;
    }

}

module.exports = new Config();
module.exports.Config = Config;
