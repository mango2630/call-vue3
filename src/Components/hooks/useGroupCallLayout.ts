import { watch, ref, toRefs } from '../../adapter-vue';
import { TUIGlobal } from '../../TUICallService';
import { useFloatWindowContext } from './useFloatWindowContext';

const generateDefaultLayout = (length: number, size: number) => {
  const layout = [{
    i: 0, x: 0, y: 0, w: size, h: size,
  }];

  for (let i = 1; i < length; i++) {
    const isWrap = layout[i - 1].x + size === 12;
    layout[i] = {
      i,
      x: layout[i - 1].x + size === 12 ? 0 : layout[i - 1].x + size,
      y: layout[i - 1].y + (isWrap ? size : 0),
      w: size,
      h: size,
    };
  }

  if (length === 3) {
    layout[length - 1].x += 3;
  }

  if (length > 3 && TUIGlobal.isPC) {
    if (length % 3 === 2) {
      layout[length - 1].x += 2;
      layout[length - 2].x += 2;
    }
  }

  return layout;
};

export function useGroupCallLayout(focus, length) {
  const { isFloatWindow } = toRefs(useFloatWindowContext());
  const newLayout = ref();
  watch([focus, length, isFloatWindow], () => {
    if (isFloatWindow.value) {
      const a = [];
      for(let i = 0; i < length.value; i++) {
        a[i] = {
          i,
          x: 0,
          y: 0,
          w: 12,
          h: 12,
        };
      }
      newLayout.value = a;
      return;
    }

    const arr = Object.keys(Array.from({ length: length.value }));
    const gridItemSize = length.value <= 4 ? 6 : 4;
    const defaultLayout = generateDefaultLayout(length.value, gridItemSize);
    newLayout.value = defaultLayout;
    let colIndex;
    let rowIndex;
    
    if (focus.value !== null) {
      if (arr.length < 5) {
        const newArr = arr.concat();
        newArr.splice(focus.value, 1);
        newArr.unshift(focus.value);
      } else {
        rowIndex = focus.value % 3;
        colIndex = Math.floor(focus.value / 3);
      }
  
      if (arr.length < 5) {
        const focusIndex = defaultLayout.findIndex((item) => item.i === focus.value);

        if (focusIndex !== -1) {
          const temp = defaultLayout[0];
          defaultLayout[0] = defaultLayout[focusIndex];
          defaultLayout[focusIndex] = temp;
          for (let i = 0; i < defaultLayout.length; i++) {
            const item = defaultLayout[i];
            if (i === 0) {
              item.w += 6;
              item.h += 6;
              item.x = 0;
              item.y = 0;
            } else {
              item.x = (i - 1) * 4;
              item.y = 12;
              item.w = 4;
              item.h = 4;
            }
          }
        }
      } else {
        let focusStyle;
        if (rowIndex === 0) {
          if (defaultLayout[focus.value + 1]) defaultLayout[focus.value + 1].x += 4;
          if (defaultLayout[focus.value + 2]) defaultLayout[focus.value + 2].y += 4;
          focusStyle = {
            i: focus.value,
            x: 0,
            y: colIndex * 4,
            w: 8,
            h: 8,
          };
        } else if (rowIndex === 2) {
          focusStyle = {
            i: focus.value,
            x: 4,
            y: colIndex * 4,
            w: 8,
            h: 8,
          };
          defaultLayout[focus.value - 1].x = 0;
          defaultLayout[focus.value - 1].y += 4;
        } else if (rowIndex === 1) {
          focusStyle = {
            i: focus.value,
            x: 4,
            y: colIndex * 4,
            w: 8,
            h: 8,
          };
          if (defaultLayout[focus.value + 1]) {
            defaultLayout[focus.value + 1].x = 0;
            defaultLayout[focus.value + 1].y += 4;
          }
        }
        const start = 3 - rowIndex;
        for (let i = focus.value + start; i < defaultLayout.length; i++) {
          const item = defaultLayout[i];
          item.y += 4;
        }
        defaultLayout[focus.value] = focusStyle;
      }
      newLayout.value = defaultLayout;
    }
  }, {
    immediate: true,
  });

  return newLayout;
}
