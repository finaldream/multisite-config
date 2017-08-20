/**
 * Config Provider Test
 *
 * @author Louis Thai <louis.thai@finaldream.de>
 * @since 21.06.2017
 */

const path = require('path');
const provider = require('./config-provider');
const config = require('./config');
const ConfigProvider = require('./config-provider').ConfigProvider;

provider.rootConfigPath = path.resolve('./fixtures/config');

describe('ConfigProvider', () => {

    describe('ConfigProvider basic functions', () => {
        test('Test `ConfigProvider` constructor auto resolve config directory', () => {
            const newProvider = new ConfigProvider();
            const autoPath = path.resolve('./config');

            expect(newProvider.rootConfigPath).toContain('/multisite-config/config');
            expect(newProvider.rootConfigPath).toEqual(autoPath);
        });

        test('Test `ConfigProvider.getSiteIDs`', () => {
            const sites = provider.getSiteIDs();

            expect(Array.isArray(sites)).toBe(true);
            expect(sites).toEqual(['site-1.de', 'site-2.com']);
        });
    });

    describe('Test `ConfigProvider` on multiple site setup', () => {

        test('Test `ConfigProvider.load` site-1.de Development configuration', () => {
            provider.load('site-1.de', 'development');

            expect(config.get('site.title')).toEqual('Site 1 DE (Dev)');

            expect(config.get('api.apiEndpoint')).toEqual('https://reqres.in/api/posts?lang=de');
            expect(config.get('api.client.retry')).toEqual(false);
        });

        test('Test `ConfigProvider.load` site-2.com Staging configuration', () => {
            provider.load('site-2.com', 'staging');

            expect(config.get('site.title')).toEqual('Site 2 Com (Staging)');

            expect(config.get('api.apiEndpoint')).toEqual('https://staging.site2.com/api/entries');
            expect(config.get('api.client.retry')).toEqual(true);
        });

        test('Test `ConfigProvider.load` site-2.com Production/Default configuration', () => {
            provider.load('site-2.com');

            expect(config.get('site.title')).toEqual('Site 2 Com');

            expect(config.get('api.apiEndpoint')).toEqual('https://site2.com/api/entries');
            expect(config.get('api.client.retry')).toEqual(true);
        });

        test('Test `ConfigProvider.dehydrate` site-2.com Production/Default configuration', () => {
            const JsonString = provider.dehydrate('site-2.com');

            expect(typeof JsonString).toEqual('string');
            expect(JsonString).toContain('"apiEndpoint":"https://site2.com/api/entries"');
        });

    });
});
