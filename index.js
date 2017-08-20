/**
 * Multisite Configuration Module
 *
 * @author Louis Thai <louis.thai@finaldream.de>
 * @since 21.06.2017
 */
const ConfigProvider = require('./src/config-provider').ConfigProvider;
const provider = require('./src/config-provider');
const Config = require('./src/config').Config;
const config = require('./src/config');

module.exports = {
    config,
    provider,
    ConfigProvider,
    Config,
};
