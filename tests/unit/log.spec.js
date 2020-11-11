import { assert } from 'chai'

import Log from '@/helpers/logs/Log'
import LogEntry from '@/helpers/logs/LogEntry'
import TraceLine from '@/helpers/logs/TraceLine'

const stub = `[2020-09-15 14:30:15] local.INFO: {"error":"Invalid url given"}  
[2020-09-15 14:30:15] local.ERROR: Client error: \`POST http://165.22.75.34/api/v4/projects/root%2Ftest-project/hooks\` resulted in a \`422 Unprocessable Entity\` response:
{"error":"Invalid url given"}
 {"exception":"[object] (GuzzleHttp\\Exception\\ClientException(code: 422): Client error: \`POST http://165.22.75.34/api/v4/projects/root%2Ftest-project/hooks\` resulted in a \`422 Unprocessable Entity\` response:
{\"error\":\"Invalid url given\"}
 at /var/www/html/vendor/guzzlehttp/guzzle/src/Exception/RequestException.php:113)
[stacktrace]
#0 /var/www/html/vendor/guzzlehttp/guzzle/src/Middleware.php(65): GuzzleHttp\\Exception\\RequestException::create(Object(GuzzleHttp\\Psr7\\Request), Object(GuzzleHttp\\Psr7\\Response))
#1 /var/www/html/vendor/guzzlehttp/promises/src/Promise.php(203): GuzzleHttp\\Middleware::GuzzleHttp\\{closure}(Object(GuzzleHttp\\Psr7\\Response))
#2 /var/www/html/vendor/guzzlehttp/promises/src/Promise.php(156): GuzzleHttp\\Promise\\Promise::callHandler(1, Object(GuzzleHttp\\Psr7\\Response), Array)
#3 /var/www/html/vendor/guzzlehttp/promises/src/TaskQueue.php(47): GuzzleHttp\\Promise\\Promise::GuzzleHttp\\Promise\\{closure}()
#4 /var/www/html/vendor/guzzlehttp/promises/src/Promise.php(246): GuzzleHttp\\Promise\\TaskQueue->run(true)
#5 /var/www/html/vendor/guzzlehttp/promises/src/Promise.php(223): GuzzleHttp\\Promise\\Promise->invokeWaitFn()
#6 /var/www/html/vendor/guzzlehttp/promises/src/Promise.php(267): GuzzleHttp\\Promise\\Promise->waitIfPending()
#7 /var/www/html/vendor/guzzlehttp/promises/src/Promise.php(225): GuzzleHttp\\Promise\\Promise->invokeWaitList()
#8 /var/www/html/vendor/guzzlehttp/promises/src/Promise.php(62): GuzzleHttp\\Promise\\Promise->waitIfPending()
#9 /var/www/html/vendor/guzzlehttp/guzzle/src/Client.php(183): GuzzleHttp\\Promise\\Promise->wait()
#10 /var/www/html/vendor/guzzlehttp/guzzle/src/Client.php(96): GuzzleHttp\\Client->request('post', 'projects/root%2...', Array)
#11 /var/www/html/app/GitProviders/GitLabApiClient.php(56): GuzzleHttp\\Client->__call('post', Array)
#12 /var/www/html/app/Jobs/AddPushWebhookToRepository.php(36): App\\GitProviders\\GitLabApiClient->addPushWebhook(Object(App\\Project))
#13 [internal function]: App\\Jobs\\AddPushWebhookToRepository->handle()
#14 /var/www/html/vendor/laravel/framework/src/Illuminate/Container/BoundMethod.php(32): call_user_func_array(Array, Array)
#15 /var/www/html/vendor/laravel/framework/src/Illuminate/Container/Util.php(36): Illuminate\\Container\\BoundMethod::Illuminate\\Container\\{closure}()
#16 /var/www/html/vendor/laravel/framework/src/Illuminate/Container/BoundMethod.php(90): Illuminate\\Container\\Util::unwrapIfClosure(Object(Closure))
#17 /var/www/html/vendor/laravel/framework/src/Illuminate/Container/BoundMethod.php(34): Illuminate\\Container\\BoundMethod::callBoundMethod(Object(Illuminate\\Foundation\\Application), Array, Object(Closure))
#18 /var/www/html/vendor/laravel/framework/src/Illuminate/Container/Container.php(590): Illuminate\\Container\\BoundMethod::call(Object(Illuminate\\Foundation\\Application), Array, Array, NULL)
#19 /var/www/html/vendor/laravel/framework/src/Illuminate/Bus/Dispatcher.php(94): Illuminate\\Container\\Container->call(Array)
#20 /var/www/html/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php(130): Illuminate\\Bus\\Dispatcher->Illuminate\\Bus\\{closure}(Object(App\\Jobs\\AddPushWebhookToRepository))
#21 /var/www/html/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php(105): Illuminate\\Pipeline\\Pipeline->Illuminate\\Pipeline\\{closure}(Object(App\\Jobs\\AddPushWebhookToRepository))
#22 /var/www/html/vendor/laravel/framework/src/Illuminate/Bus/Dispatcher.php(98): Illuminate\\Pipeline\\Pipeline->then(Object(Closure))
#23 /var/www/html/vendor/laravel/framework/src/Illuminate/Queue/CallQueuedHandler.php(83): Illuminate\\Bus\\Dispatcher->dispatchNow(Object(App\\Jobs\\AddPushWebhookToRepository), false)
#24 /var/www/html/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php(130): Illuminate\\Queue\\CallQueuedHandler->Illuminate\\Queue\\{closure}(Object(App\\Jobs\\AddPushWebhookToRepository))
#25 /var/www/html/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php(105): Illuminate\\Pipeline\\Pipeline->Illuminate\\Pipeline\\{closure}(Object(App\\Jobs\\AddPushWebhookToRepository))
#26 /var/www/html/vendor/laravel/framework/src/Illuminate/Queue/CallQueuedHandler.php(85): Illuminate\\Pipeline\\Pipeline->then(Object(Closure))
#27 /var/www/html/vendor/laravel/framework/src/Illuminate/Queue/CallQueuedHandler.php(59): Illuminate\\Queue\\CallQueuedHandler->dispatchThroughMiddleware(Object(Illuminate\\Queue\\Jobs\\DatabaseJob), Object(App\\Jobs\\AddPushWebhookToRepository))
#28 /var/www/html/vendor/laravel/framework/src/Illuminate/Queue/Jobs/Job.php(88): Illuminate\\Queue\\CallQueuedHandler->call(Object(Illuminate\\Queue\\Jobs\\DatabaseJob), Array)
#29 /var/www/html/vendor/laravel/framework/src/Illuminate/Queue/Worker.php(354): Illuminate\\Queue\\Jobs\\Job->fire()
#30 /var/www/html/vendor/laravel/framework/src/Illuminate/Queue/Worker.php(300): Illuminate\\Queue\\Worker->process('database', Object(Illuminate\\Queue\\Jobs\\DatabaseJob), Object(Illuminate\\Queue\\WorkerOptions))
#31 /var/www/html/vendor/laravel/framework/src/Illuminate/Queue/Worker.php(134): Illuminate\\Queue\\Worker->runJob(Object(Illuminate\\Queue\\Jobs\\DatabaseJob), 'database', Object(Illuminate\\Queue\\WorkerOptions))
#32 /var/www/html/vendor/laravel/framework/src/Illuminate/Queue/Console/WorkCommand.php(112): Illuminate\\Queue\\Worker->daemon('database', 'default', Object(Illuminate\\Queue\\WorkerOptions))
#33 /var/www/html/vendor/laravel/framework/src/Illuminate/Queue/Console/WorkCommand.php(96): Illuminate\\Queue\\Console\\WorkCommand->runWorker('database', 'default')
#34 [internal function]: Illuminate\\Queue\\Console\\WorkCommand->handle()
#35 /var/www/html/vendor/laravel/framework/src/Illuminate/Container/BoundMethod.php(32): call_user_func_array(Array, Array)
#36 /var/www/html/vendor/laravel/framework/src/Illuminate/Container/Util.php(36): Illuminate\\Container\\BoundMethod::Illuminate\\Container\\{closure}()
#37 /var/www/html/vendor/laravel/framework/src/Illuminate/Container/BoundMethod.php(90): Illuminate\\Container\\Util::unwrapIfClosure(Object(Closure))
#38 /var/www/html/vendor/laravel/framework/src/Illuminate/Container/BoundMethod.php(34): Illuminate\\Container\\BoundMethod::callBoundMethod(Object(Illuminate\\Foundation\\Application), Array, Object(Closure))
#39 /var/www/html/vendor/laravel/framework/src/Illuminate/Container/Container.php(590): Illuminate\\Container\\BoundMethod::call(Object(Illuminate\\Foundation\\Application), Array, Array, NULL)
#40 /var/www/html/vendor/laravel/framework/src/Illuminate/Console/Command.php(202): Illuminate\\Container\\Container->call(Array)
#41 /var/www/html/vendor/symfony/console/Command/Command.php(255): Illuminate\\Console\\Command->execute(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Illuminate\\Console\\OutputStyle))
#42 /var/www/html/vendor/laravel/framework/src/Illuminate/Console/Command.php(189): Symfony\\Component\\Console\\Command\\Command->run(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Illuminate\\Console\\OutputStyle))
#43 /var/www/html/vendor/symfony/console/Application.php(1011): Illuminate\\Console\\Command->run(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))
#44 /var/www/html/vendor/symfony/console/Application.php(272): Symfony\\Component\\Console\\Application->doRunCommand(Object(Illuminate\\Queue\\Console\\WorkCommand), Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))
#45 /var/www/html/vendor/symfony/console/Application.php(148): Symfony\\Component\\Console\\Application->doRun(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))
#46 /var/www/html/vendor/laravel/framework/src/Illuminate/Console/Application.php(93): Symfony\\Component\\Console\\Application->run(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))
#47 /var/www/html/vendor/laravel/framework/src/Illuminate/Foundation/Console/Kernel.php(131): Illuminate\\Console\\Application->run(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))
#48 /var/www/html/artisan(37): Illuminate\\Foundation\\Console\\Kernel->handle(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))
#49 {main}
"} 
[2020-09-21 08:26:57] local.ERROR: Method App\Http\Controllers\Projects\HostsController::create does not exist. {"userId":1,"exception":"[object] (BadMethodCallException(code: 0): Method App\\Http\\Controllers\\Projects\\HostsController::create does not exist. at /var/www/html/vendor/laravel/framework/src/Illuminate/Routing/Controller.php:68)
[stacktrace]
#0 [internal function]: Illuminate\\Routing\\Controller->__call('create', Array)
#1 /var/www/html/vendor/laravel/framework/src/Illuminate/Routing/Controller.php(54): call_user_func_array(Array, Array)
#2 /var/www/html/vendor/laravel/framework/src/Illuminate/Routing/ControllerDispatcher.php(45): Illuminate\\Routing\\Controller->callAction('create', Array)
#3 /var/www/html/vendor/laravel/framework/src/Illuminate/Routing/Route.php(219): Illuminate\\Routing\\ControllerDispatcher->dispatch(Object(Illuminate\\Routing\\Route), Object(App\\Http\\Controllers\\Projects\\HostsController), 'create')
#4 /var/www/html/vendor/laravel/framework/src/Illuminate/Routing/Route.php(176): Illuminate\\Routing\\Route->runController()
#5 /var/www/html/vendor/laravel/framework/src/Illuminate/Routing/Router.php(681): Illuminate\\Routing\\Route->run()
#6 /var/www/html/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php(130): Illuminate\\Routing\\Router->Illuminate\\Routing\\{closure}(Object(Illuminate\\Http\\Request))
#7 /var/www/html/vendor/laravel/framework/src/Illuminate/Routing/Middleware/SubstituteBindings.php(41): Illuminate\\Pipeline\\Pipeline->Illuminate\\Pipeline\\{closure}(Object(Illuminate\\Http\\Request))
#8 /var/www/html/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php(171): Illuminate\\Routing\\Middleware\\SubstituteBindings->handle(Object(Illuminate\\Http\\Request), Object(Closure))
#9 /var/www/html/vendor/laravel/framework/src/Illuminate/Auth/Middleware/Authenticate.php(43): Illuminate\\Pipeline\\Pipeline->Illuminate\\Pipeline\\{closure}(Object(Illuminate\\Http\\Request))
#10 /var/www/html/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php(171): Illuminate\\Auth\\Middleware\\Authenticate->handle(Object(Illuminate\\Http\\Request), Object(Closure))
#11 /var/www/html/vendor/laravel/framework/src/Illuminate/Foundation/Http/Middleware/VerifyCsrfToken.php(76): Illuminate\\Pipeline\\Pipeline->Illuminate\\Pipeline\\{closure}(Object(Illuminate\\Http\\Request))
#12 /var/www/html/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php(171): Illuminate\\Foundation\\Http\\Middleware\\VerifyCsrfToken->handle(Object(Illuminate\\Http\\Request), Object(Closure))
#13 /var/www/html/vendor/laravel/framework/src/Illuminate/View/Middleware/ShareErrorsFromSession.php(49): Illuminate\\Pipeline\\Pipeline->Illuminate\\Pipeline\\{closure}(Object(Illuminate\\Http\\Request))
#14 /var/www/html/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php(171): Illuminate\\View\\Middleware\\ShareErrorsFromSession->handle(Object(Illuminate\\Http\\Request), Object(Closure))
#15 /var/www/html/vendor/laravel/framework/src/Illuminate/Session/Middleware/StartSession.php(56): Illuminate\\Pipeline\\Pipeline->Illuminate\\Pipeline\\{closure}(Object(Illuminate\\Http\\Request))
#16 /var/www/html/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php(171): Illuminate\\Session\\Middleware\\StartSession->handle(Object(Illuminate\\Http\\Request), Object(Closure))
#17 /var/www/html/vendor/laravel/framework/src/Illuminate/Cookie/Middleware/AddQueuedCookiesToResponse.php(37): Illuminate\\Pipeline\\Pipeline->Illuminate\\Pipeline\\{closure}(Object(Illuminate\\Http\\Request))
#18 /var/www/html/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php(171): Illuminate\\Cookie\\Middleware\\AddQueuedCookiesToResponse->handle(Object(Illuminate\\Http\\Request), Object(Closure))
#19 /var/www/html/vendor/laravel/framework/src/Illuminate/Cookie/Middleware/EncryptCookies.php(66): Illuminate\\Pipeline\\Pipeline->Illuminate\\Pipeline\\{closure}(Object(Illuminate\\Http\\Request))
#20 /var/www/html/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php(171): Illuminate\\Cookie\\Middleware\\EncryptCookies->handle(Object(Illuminate\\Http\\Request), Object(Closure))
#21 /var/www/html/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php(105): Illuminate\\Pipeline\\Pipeline->Illuminate\\Pipeline\\{closure}(Object(Illuminate\\Http\\Request))
#22 /var/www/html/vendor/laravel/framework/src/Illuminate/Routing/Router.php(683): Illuminate\\Pipeline\\Pipeline->then(Object(Closure))
#23 /var/www/html/vendor/laravel/framework/src/Illuminate/Routing/Router.php(658): Illuminate\\Routing\\Router->runRouteWithinStack(Object(Illuminate\\Routing\\Route), Object(Illuminate\\Http\\Request))
#24 /var/www/html/vendor/laravel/framework/src/Illuminate/Routing/Router.php(624): Illuminate\\Routing\\Router->runRoute(Object(Illuminate\\Http\\Request), Object(Illuminate\\Routing\\Route))
#25 /var/www/html/vendor/laravel/framework/src/Illuminate/Routing/Router.php(613): Illuminate\\Routing\\Router->dispatchToRoute(Object(Illuminate\\Http\\Request))
#26 /var/www/html/vendor/laravel/framework/src/Illuminate/Foundation/Http/Kernel.php(170): Illuminate\\Routing\\Router->dispatch(Object(Illuminate\\Http\\Request))
#27 /var/www/html/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php(130): Illuminate\\Foundation\\Http\\Kernel->Illuminate\\Foundation\\Http\\{closure}(Object(Illuminate\\Http\\Request))
#28 /var/www/html/nova/src/Http/Middleware/ServeNova.php(26): Illuminate\\Pipeline\\Pipeline->Illuminate\\Pipeline\\{closure}(Object(Illuminate\\Http\\Request))
#29 /var/www/html/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php(171): Laravel\\Nova\\Http\\Middleware\\ServeNova->handle(Object(Illuminate\\Http\\Request), Object(Closure))
#30 /var/www/html/vendor/inertiajs/inertia-laravel/src/Middleware.php(13): Illuminate\\Pipeline\\Pipeline->Illuminate\\Pipeline\\{closure}(Object(Illuminate\\Http\\Request))
#31 /var/www/html/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php(171): Inertia\\Middleware->handle(Object(Illuminate\\Http\\Request), Object(Closure))
#32 /var/www/html/app/Http/Middleware/FrameGuard.php(18): Illuminate\\Pipeline\\Pipeline->Illuminate\\Pipeline\\{closure}(Object(Illuminate\\Http\\Request))
#33 /var/www/html/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php(171): App\\Http\\Middleware\\FrameGuard->handle(Object(Illuminate\\Http\\Request), Object(Closure))
#34 /var/www/html/vendor/laravel/framework/src/Illuminate/Foundation/Http/Middleware/TransformsRequest.php(21): Illuminate\\Pipeline\\Pipeline->Illuminate\\Pipeline\\{closure}(Object(Illuminate\\Http\\Request))
#35 /var/www/html/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php(171): Illuminate\\Foundation\\Http\\Middleware\\TransformsRequest->handle(Object(Illuminate\\Http\\Request), Object(Closure))
#36 /var/www/html/vendor/laravel/framework/src/Illuminate/Foundation/Http/Middleware/TransformsRequest.php(21): Illuminate\\Pipeline\\Pipeline->Illuminate\\Pipeline\\{closure}(Object(Illuminate\\Http\\Request))
#37 /var/www/html/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php(171): Illuminate\\Foundation\\Http\\Middleware\\TransformsRequest->handle(Object(Illuminate\\Http\\Request), Object(Closure))
#38 /var/www/html/vendor/laravel/framework/src/Illuminate/Foundation/Http/Middleware/ValidatePostSize.php(27): Illuminate\\Pipeline\\Pipeline->Illuminate\\Pipeline\\{closure}(Object(Illuminate\\Http\\Request))
#39 /var/www/html/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php(171): Illuminate\\Foundation\\Http\\Middleware\\ValidatePostSize->handle(Object(Illuminate\\Http\\Request), Object(Closure))
#40 /var/www/html/vendor/laravel/framework/src/Illuminate/Foundation/Http/Middleware/CheckForMaintenanceMode.php(62): Illuminate\\Pipeline\\Pipeline->Illuminate\\Pipeline\\{closure}(Object(Illuminate\\Http\\Request))
#41 /var/www/html/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php(171): Illuminate\\Foundation\\Http\\Middleware\\CheckForMaintenanceMode->handle(Object(Illuminate\\Http\\Request), Object(Closure))
#42 /var/www/html/vendor/fideloper/proxy/src/TrustProxies.php(57): Illuminate\\Pipeline\\Pipeline->Illuminate\\Pipeline\\{closure}(Object(Illuminate\\Http\\Request))
#43 /var/www/html/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php(171): Fideloper\\Proxy\\TrustProxies->handle(Object(Illuminate\\Http\\Request), Object(Closure))
#44 /var/www/html/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php(105): Illuminate\\Pipeline\\Pipeline->Illuminate\\Pipeline\\{closure}(Object(Illuminate\\Http\\Request))
#45 /var/www/html/vendor/laravel/framework/src/Illuminate/Foundation/Http/Kernel.php(145): Illuminate\\Pipeline\\Pipeline->then(Object(Closure))
#46 /var/www/html/vendor/laravel/framework/src/Illuminate/Foundation/Http/Kernel.php(110): Illuminate\\Foundation\\Http\\Kernel->sendRequestThroughRouter(Object(Illuminate\\Http\\Request))
#47 /var/www/html/public/index.php(55): Illuminate\\Foundation\\Http\\Kernel->handle(Object(Illuminate\\Http\\Request))
#48 {main}
"}`

describe('log', () => {
    describe('.parse', () => {
        it('splits the log entries', () => {
            assert.equal(new Log(stub).entries.length, 3)
        })

        it('creates a LogEntry for each item in the log', () => {
            const entry = new Log(stub).entries[2]

            assert.instanceOf(entry, LogEntry)

            assert.equal(entry.timestamp, '2020-09-15 14:30:15')
            assert.equal(entry.environment, 'local')
            assert.equal(entry.level, 'info')
            assert.equal(entry.body.raw, '{"error":"Invalid url given"}')
        })

        it('reverses the order of entries', () => {
            const first = new Log(stub).entries[0]
            const last = new Log(stub).entries[2]

            assert.equal(first.timestamp, '2020-09-21 08:26:57')
            assert.equal(last.timestamp, '2020-09-15 14:30:15')
        })

        it('lowercases the level', () => {
            const entry = new Log(stub).entries[2]

            assert.equal(entry.level, 'info')
        })

        it('parses the body of an entry', () => {
            const body = new Log(stub).entries[1].body

            assert.equal(
                body.message,
                `Client error: \`POST http://165.22.75.34/api/v4/projects/root%2Ftest-project/hooks\` resulted in a \`422 Unprocessable Entity\` response:
{"error":"Invalid url given"}
 {"exception":"[object] (GuzzleHttp\\Exception\\ClientException(code: 422): Client error: \`POST http://165.22.75.34/api/v4/projects/root%2Ftest-project/hooks\` resulted in a \`422 Unprocessable Entity\` response:
{\"error\":\"Invalid url given\"}
 at /var/www/html/vendor/guzzlehttp/guzzle/src/Exception/RequestException.php:113)`,
            )
            assert.equal(body.stacktrace.length, 51)
        })

        it('stacktrace is an empty array if the doesn\t contain a stacktrace', () => {
            const body = new Log(stub).entries[2].body

            assert.isArray(body.stacktrace)
            assert.lengthOf(body.stacktrace, 0)
        })

        it('it creates a TraceLine for each trace line', () => {
            const entry = new Log(stub).entries[1]
            const traceLine = entry.body.stacktrace[1]

            assert.instanceOf(traceLine, TraceLine)

            assert.equal(
                traceLine.raw,
                '#1 /var/www/html/vendor/guzzlehttp/promises/src/Promise.php(203): GuzzleHttp\\Middleware::GuzzleHttp\\{closure}(Object(GuzzleHttp\\Psr7\\Response))',
            )
            assert.equal(traceLine.number, '1')
            assert.equal(
                traceLine.file,
                '/var/www/html/vendor/guzzlehttp/promises/src/Promise.php',
            )
            assert.equal(traceLine.line, '203')
            assert.equal(
                traceLine.caught,
                'GuzzleHttp\\Middleware::GuzzleHttp\\{closure}(Object(GuzzleHttp\\Psr7\\Response))',
            )
        })

        it('it only saves raw for invalid trace lines', () => {
            const entry = new Log(stub).entries[1]
            const traceLine = entry.body.stacktrace[49]

            assert.instanceOf(traceLine, TraceLine)
            assert.equal(traceLine.raw, '#49 {main}')
        })
    })
})
