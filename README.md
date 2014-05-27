# pull-randomly-split

randomly split incoming buffers, to test that parsing works correctly.

``` js

pull(
  pull.values(crypto.randomBytes(1024*1024)),
  randomSplit(1024, 2096),
  pull.collect(function () {


  })
)


```

## License

MIT
