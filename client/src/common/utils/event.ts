export const on = (el, evt, fn, bubble) => {
  if ('addEventListener' in el) {
      // BBOS6 doesn't support handleEvent, catch and polyfill
    try {
      el.addEventListener(evt, fn, bubble);
    } catch (e) {
      if (typeof fn === 'object' && fn.handleEvent) {
        el.addEventListener(evt, (e) => {
          // Bind fn as this and set first arg as event object
          fn.handleEvent.call(fn, e);
        }, bubble);
      } else {
        throw e;
      }
    }
  } else if ('attachEvent' in el) {
      // check if the callback is an object and contains handleEvent
    if (typeof fn === 'object' && fn.handleEvent) {
      el.attachEvent('on' + evt, () => {
              // Bind fn as this
        fn.handleEvent.call(fn);
      });
    } else {
      el.attachEvent('on' + evt, fn);
    }
  }
};

export const off = (el, evt, fn) => {
  if ('removeEventListener' in el) {
    el.removeEventListener(evt, fn);
  } else if ('attachEvent' in el) {
    el.detachEvent(evt, fn);
  }
};
