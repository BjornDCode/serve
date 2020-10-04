import { assert } from 'chai'

import env from '@/helpers/env'

describe('env', () => {
    describe('.replace', () => {
        it('does not change lines that are unrelated to Serve', () => {
            assert.include(
                env.replace('APP_NAME=Laravel', {
                    DB_PORT: '3306',
                }),
                'APP_NAME=Laravel',
            )
        })

        it('updates the value if the key exists', () => {
            assert.include(
                env.replace('DB_PORT=5432', {
                    DB_PORT: '3306',
                }),
                'DB_PORT=3306',
            )
        })

        it('adds the line if the key does not exist', () => {
            assert.include(
                env.replace('DB_HOST=127.0.0.1', {
                    DB_PORT: '3306',
                }),
                'DB_PORT=3306',
            )
        })

        it('adds the line at the end of the file if there are not any related lines', () => {
            assert.isTrue(
                env
                    .replace('APP_NAME=Laravel', {
                        DB_PORT: '3306',
                    })
                    .endsWith('DB_PORT=3306\n'),
            )
        })

        it('It adds the line before the related line if there is a related line', () => {
            assert.isTrue(
                env
                    .replace('DB_HOST=127.0.0.1', {
                        DB_PORT: '3306',
                    })
                    .startsWith('DB_PORT=3306\n'),
            )
        })
    })
})
