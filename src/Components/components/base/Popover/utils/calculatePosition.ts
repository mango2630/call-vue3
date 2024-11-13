export const calculatePosition = (triggerPosition, contentPosition, props, initContentStyle, initArrowStyle) => {
  const arrowSize = props.isShowArrow ? props.arrowSize : 0;
  // 弹出层与对照物在 Y 轴居中对齐： 参照物宽度的一半 - 弹出层宽度的一半 = 弹出层在 Y 轴上的偏移量
  const verticallyCenter = `${triggerPosition.width / 2 - contentPosition.width / 2}px`;
  // 弹出层与对照物在 X 轴居中对齐： 参照物高度的一半 - 弹出层高度的一半 = 弹出层在 Y 轴上的偏移量
  const horizontallyCenter = `${triggerPosition.height / 2 - contentPosition.height / 2}px`;
  const arrowBorderStyle = `${arrowSize}px solid ${props.color}`;
  const finalContentStyle = { ...initContentStyle };
  const finalArrowStyle = { ...initArrowStyle };
  switch (props.placement) {
    case 'top':
      finalContentStyle.left = verticallyCenter;
      finalContentStyle.top = `-${contentPosition.height + arrowSize + props.arrowDistance}px`;
      finalArrowStyle.borderTop = arrowBorderStyle;
      finalArrowStyle.left = `${triggerPosition.width / 2 - arrowSize / 2}px`;
      finalArrowStyle.top = `-${arrowSize + props.arrowDistance}px`;
      break;

    case 'bottom':
      finalContentStyle.left = verticallyCenter;
      finalContentStyle.top = `${triggerPosition.height + arrowSize + props.arrowDistance}px`;
      finalArrowStyle.borderBottom = arrowBorderStyle;
      finalArrowStyle.left = `${triggerPosition.width / 2 - arrowSize / 2}px`;
      finalArrowStyle.top = `${triggerPosition.height + props.arrowDistance - arrowSize}px`;
      break;

    case 'left':
      finalContentStyle.left = `-${contentPosition.width + arrowSize + props.arrowDistance}px`;
      finalContentStyle.top = horizontallyCenter;
      finalArrowStyle.borderLeft = arrowBorderStyle;
      finalArrowStyle.left = `-${arrowSize * 2 - props.arrowDistance}px`;
      finalArrowStyle.top = `${triggerPosition.height / 2 - arrowSize / 2}px`;
      break;

    case 'right':
      finalContentStyle.left = `${triggerPosition.width + arrowSize + props.arrowDistance}px`;
      finalContentStyle.top = horizontallyCenter;
      finalArrowStyle.borderRight = arrowBorderStyle;
      finalArrowStyle.left = `${triggerPosition.width + arrowSize * 2 - props.arrowDistance}px`;
      finalArrowStyle.top = `${triggerPosition.height / 2 - arrowSize / 2}px`;
      break;

    default:
      break;
  }
  return {
    finalContentStyle,
    finalArrowStyle,
  };
};
