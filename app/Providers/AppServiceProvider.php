<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        $this->keepLegacyApiRoutingErrors();
    }

    /**
     * Newer Laravel versions put the route into 404/405 messages. Keep the
     * messages API clients have always received ("404 Not Found" and
     * "... not supported for this route. ...").
     *
     * @return void
     */
    protected function keepLegacyApiRoutingErrors()
    {
        $handler = $this->app->make('api.exception');

        $handler->register(function (NotFoundHttpException $e) use ($handler) {
            if (preg_match('/^The route .* could not be found\.$/', $e->getMessage())) {
                return $handler->handle(new NotFoundHttpException('', $e->getPrevious(), $e->getCode(), $e->getHeaders()));
            }
        });

        $handler->register(function (MethodNotAllowedHttpException $e) use ($handler) {
            $message = preg_replace('/ is not supported for route \S+\. /', ' is not supported for this route. ', $e->getMessage(), 1, $count);

            if ($count) {
                $headers = $e->getHeaders();

                return $handler->handle(new MethodNotAllowedHttpException(
                    explode(', ', $headers['Allow'] ?? ''), $message, $e->getPrevious(), $e->getCode(), $headers
                ));
            }
        });
    }
}
