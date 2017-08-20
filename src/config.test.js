/**
 * Config Test
 *
 * @author Louis Thai <louis.thai@finaldream.de>
 * @since 05.07.2017
 */

const config = require('./config');

describe('Config', () => {
    describe('Test `ConfigProvider` on multiple site setup', () => {

        test('Test `Config.get` default value', () => {
            expect(config.get('site.undefined', 'fallbackValue')).toEqual('fallbackValue');
        });

        test('Test `Config.load` string input', () => {
            const stringInput = '{"api":{"apiEndpoint":"https://jsonplaceholder.typicode.com/posts"}}';

            config.load(stringInput);
            expect(config.get('api.apiEndpoint')).toEqual('https://jsonplaceholder.typicode.com/posts');
        });

        test('Test `Config.load` JS Object', () => {
            const objectInput = { api: { client: { timeout: 4000 } } };

            config.load(objectInput);
            expect(config.get('api.client.timeout')).toEqual(4000);
        });

        test('Test `Config.load` failed on unexpected input', () => {
            expect(() => {
                config.load('');
            }).toThrow('Can not load configuration from string.');

            config.load(1);
            expect(config.get('api.apiEndpoint')).toEqual(false);
        });

    });
});
