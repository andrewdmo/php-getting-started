<?php

namespace EllisLab\ExpressionEngine\Library\Curl;

class AsyncRequest extends Request
{

    private $request;

    public function __construct(Request $request)
    {
        $this->request = $request;
        $this->url = $request->url;
        $this->config = $request->config;
    }

}

// EOF
