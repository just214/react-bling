# react-bling :gem:

### `npm i react-bling`

#### A simple library that brings together [react-animations](https://github.com/FormidableLabs/react-animations), [styled-components](https://www.styled-components.com/) and [react-waypoint](https://github.com/brigade/react-waypoint) to give you out-of-the-box animations for your React project.

## Overview

First, you install the `react-bling` library.

`npm i react-bling` or `yarn install react-bling`

Next, you import the default `Bling` component along with the animations that you want to use from the _react-bling_ library.

`import Bling, { fadeIn, tada} from 'react-bling';`

Finally, you wrap some React component(s) or element(s) in a `Bling` component and pass it animations and display information via `props`.

Animations can either applied one of two ways:

1. On the initial render via the `animate` prop
2. When the `Bling` component enters or exits the viewport via the `waypoint` prop.

This library exposes the animations and `merge` function provided by _react-animations_ along with the ability to chain these animations.

I created the following website, which lets you sample all of the animations provided provided by _react-animations_: [https://rad.surge.sh](https://rad.surge.sh)

## Basic Usage

Here is the most basic example using the `animate` prop and `fadeIn` animation only:

```js
import React from 'react';
import Bling, { fadeIn } from 'react-bling';

const App = () => (
  <Bling animate={{ animation: fadeIn }}>
    <p>Go react-bling!</p>
  </Bling>
);
export default App;
```

## Props

_react-bling_ accepts the following props: **_`el`, `render`, `animate`, `waypoint`_**

### `el`

type: `string`

default: `'div'`

The `el` prop is used to define the html element type used as the `Bling` wrapper component. You can use any element within the limitations of the language. For instance, you cannot use `el='p'` and also render a `p` tag as a child.

Example:

```js
<Bling el="div" ... />
```

### `render`

The `render` prop is used to render your wrapped component(s) or element(s) and accepts a function or component. You can also just wrap your component(s) or element(s) in an opening and closing `Bling` tag as shown in the example above.

```js
<Bling
  animate={{animation: fadeIn}}
  render={<p>Go react-bling!</p>}
/>

/* is the same as */

<Bling
  animate={{animation: fadeIn}}
  render={() => <p>Go react-bling!</p>}
/>

/* is the same as */

<Bling animate={{animation: fadeIn}}>
  <p>Go react-bling!</p>
</Bling>
```

> **_Note- The `animate` and `waypoint` props cannot be used together._**

### `animate`

type: `object` or `array`

The `animate` prop is used to set animation(s) when the `Bling` wrapper component first renders. You can either provide a single animation object or multiple animation objects in an array. If an array is provided, the animations will be applied in the same order as the array.

A single animation

```js
import React from 'react';
import Bling, { fadeIn } from 'react-bling';

const App = () => (
  <Bling
    animate={{
      animation: fadeIn,
      duration: 3,
      delay: 2,
      iterate: 2,
    }}
    render={<p>Go react-bling!</p>}
  />
);

export default App;
```

An array of animations

```js
const App = () => (
  <Bling
    animate={[
      {
        animation: fadeIn,
        duration: 3,
      },
      {
        animation: tada,
        duration: 2,
        iterate: 2,
      },
      {
        animation: fadeOut,
        duration: 4,
      },
    ]}
    render={<p>Go react-bling!</p>}
  />
);

export default App;
```

**Properties:**

**`animation`**

type: `object` (required)

You can pass any animation that you import from _react-bling_. You can also use _react-animations_' `merge` function to make your own unique animations. `animation: merge(fadeIn, tada)`

**`duration`**

type: `number` default: `2`

This property accepts a number representing the duration of the animation in seconds.

**`delay`**

type: `number` default: `0`

This property accepts a number representing the delay of the animation in seconds.

**`iterate`**

type: `number | string` default: `1`

This property accepts a number representing the number of times the animation should repeat. You can also pass the string `'infinite'` to repeat until the end of time.

**`direction`**

type: `string` default: `'normal'`

This property accepts a number representing the animation-direction property.

accepted values: `'normal' | 'reverse' | 'alternate' | 'alternate-reverse'`

### `waypoint`

type: `object`

The `waypoint` prop is used to set animation(s) when the `Bling` wrapper component enters and leaves the viewport.

**Properties:**

**`position`**

type: `string`
options: `'above' | 'below'`
default: `'above'`

Places the `waypoint` above or below the wrapped component(s) or element(s).

**`topOffset`**

type: `string || number`
examples: `100 | -100 | '100px' | '100%'`
default: `'0px'`

**`bottomOffset`**

type: `string || number`
examples: `100 | -100 | '100px' | '100%'`
default: `'0px'`

The `topOffset` and `bottomOffset` properties control the top and bottom boundaries of the `waypoint` component and can be a little tricky to grasp at first. You can provide a number, which represents pixels. You can also represent pixels, percentages, etc. as strings. (eg. `'100%'`)

If you set `topOffset:'100px'`, this can be thought of like pushing the top boundary of the page down 100 pixels. This means that if you are scrolling up from the bottom, your `leave` animation would be triggered when the `waypoint` got to 100 pixels below the top of the screen. And if you are scrolling down from the very top, the `enter` animation will not be triggered until it reaches 100 pixels below the top of the screen.

If you set `bottomOffset:'100px'`, this can be thought of like pushing the bottom boundary of the page up 100 pixels. This means that if you are scrolling down from the top, your `leave` animation would be triggered when the `waypoint` got to 100 pixels above the bottom of the screen. And if you are scrolling up from the very bottom, the `enter` animation will not be triggered until it reaches 100 pixels above the bottom of the screen.

Hopefully that makes sense. If you are still blurry, you might find this explanation from `react-waypoint` useful:

> `topOffset` can either be a number, in which case its a distance from the
> top of the container in pixels, or a string value. Valid string values are
> of the form "20px", which is parsed as pixels, or "20%", which is parsed
> as a percentage of the height of the containing element.
> For instance, if you pass "-20%", and the containing element is 100px tall,
> then the waypoint will be triggered when it has been scrolled 20px beyond
> the top of the containing element.

**`enter`**

type: `object || array` (required)

**`leave`**

type: `object || array` (required)

The `enter` and `leave` properties are used to define the animations and animation details for when the `Bling` component enters and leaves the viewport. These properties have the same structure as the `animate` prop and are defined the same way, except as properties on the `waypoint` prop object.

**`onEnter`**

type: `function`

**`onLeave`**

type: `function`

Both the `onEnter` and `onLeave` properties accept a callback that you can provide for when the `Bling` component enters or leaves the viewport respectively. The `onEnter` and `onLeave` callbacks provide you with three values in the following order:

`currentPosition` - Either 'inside' or 'outside' (the boundaries)

`previousPosition`- Either 'inside' or 'outside' (the boundaries)

`event`

## Styling the `Bling` component

The `bling` component can be styled in a number of different ways:

With inline styles

```js
<Bling
  style={{ border: '2px solid firebrick' }}
  ...
/>
```

By extending the component with _styled-components_

```js
const StyledBling = styled(Bling)`
  position: fixed;
  width: 100%;
  text-align: center;
  z-index: 9.97999999890000033531123335706e29;
`;
```

By using the `.bling` class

_Styles created with the `.bling` class will be applied to all `Bling` components rendered on the page. Maybe this is what you want. If not, consider the other styling options._

```css
.bling {
  position: fixed;
  width: 100%;
  text-align: center;
  z-index: 9.97999999890000033531123335706e29;
}
```

## Example components

Using the `animate` prop

```js
<Bling
  animate={[
    {
      animation: merge(tada, flip),
      duration: 2,
      iterate: 2,
      direction: 'alternate',
    },
    {
      animation: fadeOut,
      duration: 3,
      delay: 2,
    },
  ]}
  render={<h1>Hello</h1>}
/>
```

Using the `waypoint` prop

```js
<Bling
  waypoint={{
    onEnter: (currentPosition, previousPosition, event) => {
      console.log(currentPosition, previousPosition, event);
    },
    onLeave: (currentPosition, previousPosition, event) => {
      console.log(currentPosition, previousPosition, event);
    },
    position: 'above',
    enter: {
      animation: merge(tada, flip),
      duration: 2,
    },
    leave: [
      {
        animation: tada,
        duration: 3,
      },
      {
        animation: fadeOut,
        duration: 3,
      },
    ],
  }}
  render={<h1>Hello</h1>}
/>
```

## List of available animations

`bouceOut`
`bounce`
`bounceIn`
`bounceInDown`
`bounceInLeft`
`bounceInRight`
`bounceInUp`
`bounceOutDown`
`bounceOutLeft`
`bounceOutRight`
`bounceOutUp`
`fadeIn`
`fadeInDown`
`fadeInDownBig`
`fadeInLeft`
`fadeInLeftBig`
`fadeInRight`
`fadeInRightBig`
`fadeInUp`
`fadeInUpBig`
`fadeOut`
`fadeOutDown`
`fadeOutDownBig`
`fadeOutLeft`
`fadeOutLeftBig`
`fadeOutRight`
`fadeOutRightBig`
`fadeOutUp`
`fadeOutUpBig`
`flash`
`flip`
`flipInX`
`flipInY`
`flipOutX`
`flipOutY`
`headShake`
`hinge`
`jello`
`lightSpeedIn`
`lightSpeedOut`
`pulse`
`rollIn`
`rollOut`
`rotateIn`
`rotateInDownLeft`
`rotateInDownRight`
`rotateInUpLeft`
`rotateInUpRight`
`rotateOut`
`rotateOutDownLeft`
`rotateOutDownRight`
`rotateOutUpLeft`
`rotateOutUpRight`
`rubberBand`
`shake`
`slideInDown`
`slideInLeft`
`slideInRight`
`slideInUp`
`slideOutDown`
`slideOutLeft`
`slideOutRight`
`slideOutUp`
`swing`
`tada`
`wobble`
`zoomIn`
`zoomInDown`
`zoomInLeft`
`zoomInRight`
`zoomInUp`
`zoomOut`
`zoomOutDown`
`zoomOutLeft`
`zoomOutRight`
`zoomOutUp`

## More about `merge`

From the _react-animations_ README:

> react-animations also exports a `merge` function that takes two animations and returns a new animation that combines the transforms from both. This is experimental and wont work (well) with animations that have conflicting transforms, such as `fadeIn` and `fadeOut`. The merged animation can be used just like any of the imported animations.

## Design Decisions

While creating this library, I went back and forth between two approaches to handling arrays of animations:

The current (and more verbose) approach:

```js
<Bling
  animate={[
    {
      animation: fadeIn,
      duration: 3,
    },
    {
      animation: tada,
      duration: 2,
      iterate: 2,
    },
    {
      animation: fadeOut,
      duration: 4,
    },
  ]}
  render={<p>Go react-bling!</p>}
/>
```

and the more succinct approach:

```js
<Bling
  animate={{
    animation: [fadeIn, tada, fadeOut],
    duration: [3, 2, 4],
    delay: [0, 0, 1],
    iterate: [1, 2, 1],
  }}
  render={<p>Go react-bling!</p>}
/>
```

Ultimately, I decided to go with the more verbose approach as I found it easier to read, understand and work with. Imagine you pass an array of three animations but an array of only two durations. Should the last animation use the previous duration or the default duration value? I find it much easier to explicitly define the properties for each animation with the assumption that the defaults are applied if no value is provided.

Also, if you decide to change the order of animations later, it's much easier when they are grouped together as objects as opposed to each value being a part of a seperate array.

Made with :green_heart: by a vegan
