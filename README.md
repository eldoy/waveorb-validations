# Waveorb validations

Waveorb validation extensions for [d8a.](https://github.com/eldoy/d8a)

It is included in [the Waveorb web app development framework.](https://waveorb.com)

### Install

```sh
npm i waveorb-validations
```

### Usage

#### Exist

Check for existence in collection:
```js
await $.validate({
  values: {
    account_id: {
      exist: 'account'
    }
  }
})
```

#### Owner

Check if collection id is owned by logged in user:
```js
await $.validate({
  values: {
    account_id: {
      owner: 'user'
    }
  }
})
```
This example requires a `user` in `$.data.user` and a `user_id` in the associated `account`.


#### Unique

Check if field is unique in collection:
```js
await $.validate({
  values: {
    email: {
      unique: 'user'
    }
  }
})
```

Check if field is unique in collection with extra fields:
```js
await $.validate({
  values: {
    email: {
      unique: {
        in: 'user',
        with: ['site_id']
      }
    }
  }
})
```

### License

MIT Licensed. Enjoy!
