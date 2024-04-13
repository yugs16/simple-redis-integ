A simple redis connection helps the main server to LPUSH to queue and worker/s to RPOP it. Here we push data posted on /submit POST API of the server repo.

```
payload---
{

    "problemId": "113",
    "lang": "node",
    "code": "exec echo 'JS'"
}


```
