/**
 * Config Provider
 *
 * @author Louis Thai <louis.thai@finaldream.de>
 * @since 21.06.2017
 */

const { merge } = require('lodash');
const fs = require('fs');
const path = require('path');
const config = require('./config');


/**
 * Read any config file match input pattern
 *
 * @param {string} configDir
 * @param {string} pattern
 * @returns {object}
 */
function readConfigFromFiles(configDir, pattern) {

    const result = {};

    if (!fs.statSync(configDir).isDirectory()) {
        throw new Error(`${configDir} is not a directory`);
    }

    const files = fs.readdirSync(configDir);

    files.forEach((file) => {

        if (file.match(pattern)) {

            const filePath = path.join(configDir, file);

            if (fs.statSync(filePath).isFile()) {
                try {
                    merge(result, (require(filePath) || {})); // eslint-disable-line
                } catch (error) {
                    throw new Error('Can not load config files');
                }
            }
        }
    });

    return result;
}

const filePatterns = {};

/**
 * Get environment config file pattern
 *
 * @param {string} env
 * @returns {string}
 */
function getFilePattern(env = 'default') {

    if (!filePatterns[env]) {
        filePatterns[env] = (env === 'default') ?
            new RegExp('^([^.]*.(js)$)') :
            new RegExp(`^([^.]*.(${env}.js)$)`);
    }

    return filePatterns[env];
}

/**
 * Return environment config for single site
 *
 * No-argument call will return default environment and configuration
 *
 * @param {string} rootPath
 * @param {string|null} env
 * @param {string} domain
 * @returns {object}
 */
function loadConfig(rootPath, env, domain = 'default') {

    const defaultPath = path.join(rootPath, domain);
    const defaultConfig = readConfigFromFiles(defaultPath, getFilePattern());

    if (!env) {
        return defaultConfig;
    }

    const pattern = getFilePattern(env);
    const envConfig = readConfigFromFiles(defaultPath, pattern);

    return merge(defaultConfig, envConfig);
}

class ConfigProvider {

    /**
     * ConfigProvider constructor
     * @param configPath
     */
    constructor(configPath = './config') {

        this.setConfigPath(configPath);
    }

    setConfigPath(configPath) {

        this.rootConfigPath = (path.isAbsolute(configPath)) ?
            configPath :
            path.resolve(process.env.PWD || __dirname, configPath);
    }

    /**
     * Use to initialize/load configuration on first use
     *
     * @param {string} domain
     * @param {string} environment
     */
    load(domain, environment) {
        const defaultConfig = loadConfig(this.rootConfigPath, environment);

        const siteConfig = loadConfig(this.rootConfigPath, environment, domain);

        this.config = merge(defaultConfig, siteConfig);

        config.config = this.config;
    }

    /**
     * Dehydrate site configuration (prepare for sending to the client)
     * parse config and stringify to JSON
     *
     * @param {string} domain
     * @param {string} environment
     * @param {string} defaultEnv
     * @return {string}
     */
    dehydrate(domain, environment = 'production', defaultEnv = 'production') {
        this.load(domain, environment, defaultEnv);

        return JSON.stringify(this.config);
    }

    /**
     * Get all available sites
     */
    getSiteIDs() {
        return fs.readdirSync(this.rootConfigPath)
            .filter((file) => {
                if (file === 'default') { return false; }
                return fs.lstatSync(path.join(this.rootConfigPath, file)).isDirectory();
            });
    }
}

module.exports = new ConfigProvider();
module.exports.ConfigProvider = ConfigProvider;
