# Staggered iOS Message Bubbles with Framer Motion's popLayout

🟢 Step

Animate new messages in.

```jsx
<motion.li
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
>
```

Transition duration 2. Scaling in from center. Tailwind has origin left/right class but w/framer motion we need to use `style` tag.

```jsx
style={{
  originX: message.user === "me" ? 1 : 0,
}}
```

🟢 Step

Add exit.

```
exit={{ opacity: 0, scale: 0.8 }}
```

And let's disable mount animations.

🟢 Step

Ok - let's fix the moving messages. I've talked before about using height 0 to auto. If we do this it works. You'll notice some jumping – this is usually caused by margin. If we see this class up here, space-y-1, this adds space using margins. We can fix this by moving this inside our motion.div.

So that fixes that. And we can set the duration on opacity to 0.2. Looks pretty good.

But iOS has this really neat staggered effect to it. Can't do that with this because the rest of these messages aren't really animating.

Alternative is to use layout animation. Check this out. (do add message after)

```
layout
```

Some limitations, but if you're in an abolute position situation it can work beautifully.

And now since each list item is getting its own layout animation, we can customize this.

```jsx
transition={{
  opacity: { duration: 0.2 },
  layout: { duration: i * 0.05 },
}}
```

Pretty neat!

If we delete a message, we'll also see our staggered transitions working.

But, there's a problem. This delay...

🟢 Step

Until about a week ago this was tough to fix, but in the latest version of Framer Motion Matt Perry, the maintainer, dropped this sick new prop to AnimatePresence. Check it out.

```
<AnimatePresence initial={false} mode="popLayout">
```

Boom! Immediate movement, just like on the mounting messages.

So dope.

🟢 Step

Ok, let's finesse these transitions.

If I add a bunch of messages, we'll see how we're using index, is actually wrong.

Actually want to use the index of _animating messages_. The first one after the animating message should be the fastest, but it should be the same regardless where.

Stateless blah blah. We need some new state - track the last removed message.

```jsx
const [lastRemovedIndex, setLastRemovedIndex] = useState(null);
```

Add to event handler

```jsx
setLastRemovedIndex(messages.indexOf(message));
```

```jsx
let animatingMessages = messages.slice(lastRemovedIndex);
```

Add some fixed time

```
0.15 * animatingMessages.indexOf(message) + 0.4
```

And we start to see our effect taking shape.

Now a really cool transition type here is spring – it's closer to what iOS looks like. Let's try it out.

```
type: "spring",
bounce: 0.4,
duration: animatingMessages.indexOf(message) * 0.15 + 0.85,
```

Could change it for adding

```
setLastRemovedIndex(null);
duration:
  lastRemovedIndex !== null
    ? animatingMessages.indexOf(message) * 0.15 + 0.85
    : 1,
```
