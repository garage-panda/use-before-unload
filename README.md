[![npm version](https://badge.fury.io/js/%40garage-panda%2Fuse-before-unload.svg)](https://badge.fury.io/js/%40garage-panda%2Fuse-before-unload)

# use-before-unload

## About

A React hook that uses the onbeforeunload (beforeunload) event and tracks when the user has been Refreshed or Canceled the default browser message.
It is impossible to track if the user has left the page and is not a good idea to execute code after that.

## Install

```
npm i @garage-panda/use-before-unload
```

## Usage

```typescript
import React from "react";
import { useBeforeUnload } from "@garage-panda/use-before-unload";

function App() {
  const setEnabledBeforeUnload = useBeforeUnload({
    initEnable: false, // do you need to be enabled by default
    onRefresh: () => {
      // the page has been refreshed (the user has clicked Reload)
    },
    onCancel: () => {
      // the user has clicked Cancel
    }
  });

  React.useEffect(() => {
    setEnabledBeforeUnload(true); // you can dynamically enable or disable the beforeunload event

    if (!sessionStorage.length) {
      // the only way to know that the user has land on your site (and has not refreshed the page)
    }
  }, []);
}
```
## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Support

If you like what you see, feel free to support us!

<a href="https://www.buymeacoffee.com/garage.panda">
<img src="https://img.buymeacoffee.com/button-api/?text=Buy us a beer&emoji=:beer:&slug=garage.panda&button_colour=FFDD00&font_colour=000000&font_family=Poppins&outline_colour=000000&coffee_colour=ffffff"></a>

## License

[MIT](https://choosealicense.com/licenses/mit/)
