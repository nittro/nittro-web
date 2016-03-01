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

        $class = get_class($message);
        $short = preg_replace('/^(?:.*?\\\\|)([^\\\\]+?)(?:Exception)?$/', '$1', $class);
        $short = preg_replace('/(?<!^)([A-Z])/', ' $1', $short);
        $title = sprintf('%s: %s', $short, $message->getMessage());
        $description = sprintf("**%s(%d)**\n\n**Trace:**\n```\n%s\n```", get_class($message), $message->getCode(), $message->getTraceAsString());
        $dumpPath = $this->getExceptionFile($message);

        try {
            if (isSet($this->options['consolePath'])) {
                $this->reportUsingConsole($hash, $title, $description, $dumpPath);

            } else {
                $this->reportUsingApi($hash, $title, $description, $dumpPath);

            }
        } catch (\Exception $e) { }
    }

    protected function reportUsingConsole($hash, $title, $description, $dumpPath) {
        if (!function_exists('exec')) {
            throw new \LogicException("Cannot log to Beetle using console, the 'exec' function isn't enabled");

        }

        $cmd = [
            escapeshellarg($this->options['consolePath']),
            'bug:report',
            escapeshellarg($title),
            '--user',
            escapeshellarg($this->options['userId']),
            '--project',
            escapeshellarg($this->options['projectId']),
            '--hash',
            escapeshellarg($hash),
            '--description',
            escapeshellarg($description),
            '--tag',
            escapeshellarg('Tracy Beetle Logger'),
            '--attach',
            escapeshellarg($dumpPath),
        ];

        exec(implode(' ', $cmd));

    }

    protected function reportUsingApi($hash, $title, $description, $dumpPath) {
        if (!function_exists('curl_init')) {
            throw new \LogicException("Cannot log to Beetle using console, the 'curl' extension isn't enabled");

        }

        $data = [
            'title' => $title,
            'description' => $description,
            'tags[]' => 'Tracy Beetle Logger',
        ];

        if (class_exists('CURLFile', false)) {
            $data['attachments[]'] = new \CURLFile($dumpPath, 'text/html');

        }

        $this->sendBeetleRequest('projects/' . $this->options['projectId'] . '/bugs?hash=' . $hash, 'POST', $data);

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
        ]);

        if (class_exists('CURLFile')) {
            curl_setopt($curl, CURLOPT_SAFE_UPLOAD, true);

        }

        if ($data) {
            curl_setopt($curl, CURLOPT_POSTFIELDS, $data);

        }

        $response = curl_exec($curl);
        curl_close($curl);

        return $response ? json_decode($response, true) : null;

    }
}
