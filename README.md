# YARL - Yet Another Reactive Library
This project is currently in Alpha stage.

## Description

Reactive DOM library intended for use in simple function components. Can be wrapped with class without extension.

Provides:
- hyperscript (html parser using tagged template strings)
- reactive state management system (via state mutation)
- resourse loading util functions


## Intro

One day when I've studied React library I was thinking that the way it was doing rendering is the fastest way to do it. And when I practiced it I was wondering - is there a faster way?

Practicing with UI frameworks in bare browser environment (pure JS) I've found that there is a way to do amazing stuff without Node.js-side bundling or transpiling. Firstly jsx libs - htm, hyperHTML - appered in my view, and then Preact. Wow-effect after a year workflow with Node.js React.

When looking into other UI frameworks basics I've seen that they were using same Virtual DOM pattern. But why should we store the vdom in memory side-by-side with state, and then spend the process time for "Reconciliation". Is it better to change dom dirrectly if we know what spot to change (reactive "push" algorithm)? And [why React is named after reactiveness](https://dev.to/this-is-learning/how-react-isn-t-reactive-and-why-you-shouldn-t-care-152m)?

After that I saw some basics of Vue and Svelte frameworks and realized that they are doing some things better than React (it depends). Especially Svelte surprised me a lot - it looked like a new UI language (which of course [it is](https://gist.github.com/Rich-Harris/0f910048478c2a6505d1c32185b61934)).

Then I've started to coping around with code reactiveness which Svelte is using after compiled. And subscription seems to be the proper way to do rerenders.

So I've decided to do my best in making "push" algorithm work.
