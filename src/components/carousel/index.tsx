import React, {
  PropsWithChildren,
  ReactElement,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
  TouchEvent,
} from "react";
import styled, { CSSProperties } from "styled-components";
import Radio from "../radio";
import { color } from "../../shared/styles";

const Transition = styled.div<AnimationType>`
  ${(props) =>
    !props.animatein &&
    props.direction === "left" &&
    `
		transform: translateX(100%);
		`}
  ${(props) =>
    !props.animatein &&
    props.direction === "right" &&
    `
		transform: translateX(-100%);
		`}
	${(props) =>
    props.animatein &&
    props.direction === "left" &&
    `
		transform: translateX(0);
			transition: all ${props.delay / 1000}s ease;
		`}
	${(props) =>
    props.animatein &&
    props.direction === "right" &&
    `
		transform: translateX(0);
		transition: all ${props.delay / 1000}s ease;
		`}
`;

const Wrapper = styled.div<WrapperProps>`
  box-shadow: ${(props) => props.viewportBoxshadow};
  padding: 10px;
  border-radius: 5px;
`;

interface WrapperProps {
  viewportBoxshadow: string;
}

interface AnimationType {
  animatein: boolean;
  direction: "left" | "right" | "";
  delay: number;
}

export interface CarouselProps {
  /** 默认索引*/
  defaultIndex?: number;
  /** 轮播图高度 */
  height?: number;
  /** 是否自动播放 */
  autoplay?: boolean;
  /** 自动播放延迟 */
  autoplayDelay?: number;
  /** 翻页动画延迟 */
  delay?: number;
  /**  动画速度 1000是1秒 */
  animationDelay?: number;
  /**自动播放时是否反向播放 */
  autoplayReverse?: boolean;
  /** radio color */
  radioAppear?: keyof typeof color;
  /** 自定义内联样式 */
  style?: CSSProperties;
  /** 自定义 CSS class */
  className?: string;
  /** boxshadow */
  viewportBoxshadow?: string;
  /** 滑动阻尼 */
  touchDiff?: number;
}

function currentSetMap(
  current: number,
  map: [number, number, number]
): [number, number, number] {
  const mid = map[1];
  if (mid === current) {
    return map;
  } else if (mid < current) {
    return [mid, current, -1];
  } else {
    return [-1, current, mid];
  }
}

function mapToState(
  map: [number, number, number],
  children: ReactNode,
  totalLen: number
) {
  if (totalLen <= 1) {
    return [null, children, null];
  }
  return map.map((v) => {
    if (v === -1) {
      return null;
    }
    const child = children as ReactElement[];
    return child[v];
  });
}

function toMove(
  right: boolean,
  totalLen: number,
  indexMap: [number, number, number],
  setIndexMap: React.Dispatch<React.SetStateAction<[number, number, number]>>
) {
  let y;
  if (right) {
    if (indexMap[1] < totalLen - 1) {
      y = indexMap[1] + 1;
    } else {
      y = 0;
    }
  } else {
    if (indexMap[1] === 0) {
      y = totalLen - 1;
    } else {
      y = indexMap[1] - 1;
    }
  }
  setIndexMap(currentSetMap(y, indexMap));
}

export function Carousel(props: PropsWithChildren<CarouselProps>) {
  const {
    children,
    defaultIndex,
    height,
    autoplayDelay,
    delay,
    animationDelay,
    autoplay,
    autoplayReverse,
    radioAppear,
    style,
    className,
    viewportBoxshadow,
    touchDiff,
  } = props;
  // 设置需要展示的元素
  const [state, setState] = useState<ReactNode[]>([]);
  // 设置显示索引
  const [indexMap, setIndexMap] = useState<[number, number, number]>([
    -1, -1, -1,
  ]);
  // 控制方向进出
  const [animation, setAnimation] = useState<AnimationType>({
    animatein: true,
    direction: "",
    delay: animationDelay || 1000,
  });
  // 设置宽度
  const [bound, setBound] = useState<DOMRect>();
  // 滑动
  const [start, setStart] = useState(0);
  const totalLen = useMemo(() => {
    let len: number;
    if (children instanceof Array) {
      len = children.length;
    } else {
      len = 1;
    }
    return len;
  }, [children]);
  useMemo(() => {
    const map: [number, number, number] = [-1, -1, -1];
    map[1] = defaultIndex!;
    const res = mapToState(map, children, totalLen);
    setState(res);
    setIndexMap(map);
  }, [defaultIndex, children, totalLen]);
  useEffect(() => {
    let timer: number;
    if (autoplay) {
      timer = window.setTimeout(() => {
        toMove(!autoplayReverse, totalLen, indexMap, setIndexMap);
      }, autoplayDelay);
    }
    return () => window.clearTimeout(timer);
  }, [autoplay, autoplayDelay, indexMap, totalLen, autoplayReverse]);
  useEffect(() => {
    const child = children as ReactElement[];
    let timer: number;
    if (child) {
      const tmp = indexMap.map((v) => {
        return v !== -1 ? child[v] : null;
      });
      let sign: boolean;
      setState(tmp);

      if (indexMap[0] === -1 && indexMap[2] === -1) {
        //首轮
        // return () => {};
        return;
      } else if (indexMap[0]) {
        sign = true;
        setAnimation({
          delay: animationDelay || 1000,
          animatein: false,
          direction: "right",
        });
      } else {
        sign = false;
        setAnimation({
          animatein: false,
          direction: "left",
          delay: animationDelay || 1000,
        });
      }
      timer = window.setTimeout(() => {
        if (sign) {
          setAnimation({
            animatein: true,
            direction: "right",
            delay: animationDelay || 1000,
          });
        } else {
          setAnimation({
            animatein: true,
            direction: "left",
            delay: animationDelay || 1000,
          });
        }
      }, delay!);
      return () => window.clearTimeout(timer);
    }
  }, [delay, indexMap, children, animationDelay]);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const setBoundFunc = () => {
      if (ref.current) {
        const bounds = ref.current.getBoundingClientRect();
        setBound(bounds);
      }
    };
    setBoundFunc();
    const resizefunc = () => {
      setBoundFunc();
    };
    window.addEventListener("resize", resizefunc);
    return () => window.removeEventListener("resize", resizefunc);
  }, []);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const touchStart = (e: TouchEvent<HTMLDivElement>) => {
    setStart(e.touches[0].clientX);
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const touchEnd = (e: TouchEvent<HTMLDivElement>) => {
    const end = e.changedTouches[0].clientX;
    const val = end - start;
    const abs = Math.abs(val);
    if (abs > touchDiff!) {
      //说明可以进一步判断
      if (val > 0) {
        //从左往右 向左翻
        toMove(false, totalLen, indexMap, setIndexMap);
      } else {
        toMove(true, totalLen, indexMap, setIndexMap);
      }
    }
  };
  return (
    <Wrapper
      ref={ref}
      style={style}
      className={className}
      viewportBoxshadow={viewportBoxshadow!}
    >
      <div
        className="viewport"
        style={{
          width: "100%",
          height: `${height!}px`,
          overflow: "hidden",
          position: "relative",
          borderRadius: "10px",
          boxShadow: viewportBoxshadow,
        }}
      >
        <Transition
          animatein={animation.animatein}
          direction={animation.direction}
          delay={animation.delay}
        >
          <div
            style={{
              display: "flex",
              width: `${(bound?.width || 0) * 3}px`,
              position: "absolute",
              left: `${-(bound?.width || 0)}px`,
            }}
            onTouchStart={touchStart}
            onTouchEnd={touchEnd}
          >
            {state.map((v, i) => (
              <div
                key={i}
                style={{
                  height: `${height!}px`,
                  width: `${bound?.width}px`,
                }}
              >
                {v}
              </div>
            ))}
          </div>
        </Transition>
      </div>
      <ul
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {new Array(totalLen).fill(1).map((x, y) => (
          <Radio
            label=""
            key={y}
            hideLabel
            value={0}
            appearance={radioAppear}
            checked={y === indexMap[1]}
            onClick={() => {
              const newMap = currentSetMap(y, indexMap);
              setIndexMap(newMap);
            }}
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            onChange={() => {}}
          />
        ))}
      </ul>
    </Wrapper>
  );
}

Carousel.defaultProps = {
  defaultIndex: 0,
  delay: 100,
  height: 200,
  autoplay: true,
  autoplayDelay: 2000,
  animationDelay: 1000,
  radioAppear: "primary",
};

export default Carousel;
