import { keyframes, style } from 'typestyle';

const appearFromBottomAnimation = keyframes({
  from: {
    marginTop: '100%',
  },
  to: {
    marginTop: '10px',
  },
});

const appearFromTopAnimation = keyframes({
  from: {
    marginTop: '-100%',
  },
  to: {
    marginTop: '0px',
  },
});

const fadeInAnimation = keyframes({
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
});

const fadeOutAnimation = keyframes({
  from: {
    opacity: 1,
  },
  to: {
    opacity: 0,
  },
});

export const fadeIn = (duration: number = 1, mode: string = 'ease') => ({
  animation: `${fadeInAnimation} ${duration}s ${mode}`,
});

export const fadeOut = (duration: number = 1, mode: string = 'ease') => ({
  animation: `${fadeOutAnimation} ${duration}s ${mode}`,
});

export const appearFromBottom = (duration: number = 1, mode: string = 'ease') => ({
  animation: `${appearFromBottomAnimation} ${duration}s ${mode}`,
});

export const appearFromTop = (duration: number = 1, mode: string = 'ease') => ({
  animation: `${appearFromTopAnimation} ${duration}s ${mode}`,
});
