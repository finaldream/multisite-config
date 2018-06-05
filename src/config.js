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
    get(key, defaultValue = null) {
        const value = get(this.config, key);

        return (value === undefined) ? defaultValue : value;
    }

    /**
     * Set configuration value for key.
     * Olny changes the in-memory state, does not change config-files
     * @param {string} key
     * @param value
     */
    set(key, value = null) {
        const value = set(this.config, key, value);
        return value;
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
