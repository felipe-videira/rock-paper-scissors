import styled from "styled-components/macro";

const SCALE_ROTATION_45DEG = 1.4142;
const POINTING_UP_ROTATION = 45;
const POINTING_DOWN_ROTATION = 225;

interface ContainerProps {
  readonly size: number;
  readonly pointingUp?: boolean | null;
}

export const PolygonalListContainer = styled.div.attrs<ContainerProps>(
  (props) => ({
    size: `${props.size / SCALE_ROTATION_45DEG}px`,
  })
)<ContainerProps>`
  ${(props) => `
    transform: rotate(${
      props.pointingUp ? POINTING_UP_ROTATION : POINTING_DOWN_ROTATION
    }deg);
    width: ${props.size};
    height: ${props.size};
`}
`;

interface ItemContainerProps {
  readonly length: number;
  readonly itemSize: number;
  readonly zIndex: number;
  readonly polygonExteriorAngle: number;
}

export const PolygonalListItemContainer = styled.div.attrs<ItemContainerProps>(
  (props) => ({
    style: {
      zIndex: props.zIndex,
      transform: `rotate(${props.polygonExteriorAngle}deg)`,
    },
  })
)<ItemContainerProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  ${(props) => {
    if (props.length >= 3) {
      const origin = `-${props.itemSize / (props.itemSize * 0.1)}px`;

      return `
        &::after {
            content: "";
            position: absolute;
            transform-origin: ${origin} ${origin};
            height: calc(100% / (${props.length}/ 4));
            width: ${props.itemSize * 0.1}px;
            background: rgba(0,0,0,0.2);
            top: 0;
            left: 0;
            transform: rotate(${(90 - props.polygonExteriorAngle) / 2}deg);
        }
      `;
    }

    return "";
  }}
`;

interface ItemContentProps extends ItemContainerProps {
  readonly index: number;
  readonly pointingUp?: boolean | null;
}

export const PolygonalListItemContent = styled.div.attrs<ItemContentProps>(
  (props) => {
    const width = `${props.itemSize}px`;
    const top = `-${props.itemSize / 2}px`;
    const rotation =
      props.polygonExteriorAngle * (props.index + 1) +
      (props.pointingUp ? POINTING_UP_ROTATION : POINTING_DOWN_ROTATION);

    return {
      style: {
        zIndex: props.zIndex,
        top,
        left: top,
        width,
        height: width,
        transform: `rotate(-${rotation}deg)`,
      },
    };
  }
)<ItemContentProps>`
  position: absolute;
`;
