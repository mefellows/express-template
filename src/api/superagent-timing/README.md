# superagent-timing

  A plugin for superagent that adds timing to the request and provides callbacks
  to handle metrics information.


## Usage

### Setup

Accepts a callback that is passed a metrics object, and an
error callback.

```js
import request from 'superagent';
import requestMetrics from 'superagent-timing');

request
  .get('/some-url')
  .use(requestMetrics(
    metrics => {...} // actions
  , error => {...}))
  .end((err, res) => {
      // Do something
  });
```

The metrics object:

```js
{
  duration, // the request duration in ms
  error,
  response,
  request
}
```

## License

  MIT
