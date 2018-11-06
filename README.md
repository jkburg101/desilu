## Desilu is a Javascript library for making on-the-fly design changes to your website during development time.

When Desilu is enabled on your site, you can simply right-click on elements to cause a popup box to appear, letting you change the css of that element. 

### How to use Desilu

Integrating Desilu onto your site couldn't be any more simple.

First, install as a dev dependency with npm.

```
npm install desilu --save-dev
```

Then, provide just a single require/import in your code.

### Javascript
```javascript
require('desilu');
```

### Typescript
```typescript
import 'desilu';
```

Desilu takes care of everything else. Once this is enabled, every element on your site is eligible to have its design changed on the fly. 
