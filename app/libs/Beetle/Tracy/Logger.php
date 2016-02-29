<?php
/**
 * Created by PhpStorm.
 * User: danik
 * Date: 29/02/16
 * Time: 22:06
 */

namespace Beetle\Tracy;

class Logger extends \Tracy\Logger {

    /** @var array */
    protected $options;


    public function __construct($directory, array $options) {
        parent::__construct($directory);
        $this->options = $options;

    }


    protected function sendEmail($message) {
        if (!($message instanceof \Throwable) && !($message instanceof \Exception)) {
            return;

        }

        $hash = substr(md5(preg_replace('~(Resource id #)\d+~', '$1', $message)), 0, 10);

        try {
            $existing = $this->sendBeetleRequest('projects/' . $this->options['projectId'] . '/tasks', 'GET', ['tags' => 'tracy:' . $hash]);

            if (isSet($existing['tasks']) && !empty($existing['tasks'])) {
                $this->sendBeetleRequest('tasks/' . $existing['tasks'][0]['id'] . '/notes', 'POST', ['text' => 'Occurred again on ' . date('Y-m-d H:i:s')]);

            } else {
                $data = [
                    'type' => 'bug',
                    'title' => get_class($message) . '(' . $message->getCode() . '): ' . $message->getMessage(),
                    'description' => "Trace:\n```\n" . $message->getTraceAsString() . "\n```",
                    'tags[tracy]' => $hash,
                    'attachments[]' => new \CURLFile($this->getExceptionFile($message), 'text/html'),
                ];

                $this->sendBeetleRequest('projects/' . $this->options['projectId'] . '/tasks', 'POST', $data);

            }
        } catch (\Exception $e) { }
    }


    protected function sendBeetleRequest($endpoint, $method = 'GET', array $data = null) {
        $url = rtrim($this->options['apiUrl'], '/') . '/api/' . trim($endpoint, '/');

        if ($method === 'GET' && $data) {
            $url .= '?' . http_build_query($data);
            $data = null;

        }

        $curl = curl_init($url);

        curl_setopt_array($curl, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HTTPHEADER => ['X-Auth-Token: ' . $this->options['apiToken']],
            CURLOPT_CUSTOMREQUEST => $method,
            CURLOPT_SAFE_UPLOAD => true,
        ]);

        if ($data) {
            curl_setopt($curl, CURLOPT_POSTFIELDS, $data);

        }

        $response = curl_exec($curl);
        curl_close($curl);

        return $response ? json_decode($response, true) : null;

    }
}
