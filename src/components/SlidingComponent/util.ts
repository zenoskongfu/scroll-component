type PositionType = { x: number; y: number };

type UpAndDown = "up" | "down";
type LeftAndRight = "left" | "right";

type DirectionType =
  | `${UpAndDown}-${LeftAndRight}`
  | `${LeftAndRight}-${UpAndDown}`;

const getDirectionType = (dy: number, dx: number): DirectionType => {
  const rootNum3 = 1.73205;

  if (dx > 0) {
    if (dy > 0) {
      // 第四象限
      if (Math.abs(dy / dx) < 1 / rootNum3) return "right-down";
      if (Math.abs(dy / dx) > rootNum3) return "down-right";
    } else {
      // 第一象限
      if (Math.abs(dy / dx) < 1 / rootNum3) return "right-up";
      if (Math.abs(dy / dx) > rootNum3) return "up-right";
    }
  } else {
    if (dy > 0) {
      // 第三象限
      if (Math.abs(dy / dx) < 1 / rootNum3) return "left-down";
      if (Math.abs(dy / dx) > rootNum3) return "down-left";
    } else {
      // 第二象限
      if (Math.abs(dy / dx) < 1 / rootNum3) return "left-up";
      if (Math.abs(dy / dx) > rootNum3) return "up-left";
    }
  }

  return "right-up";
};

export const judgeDirection = (
  startPosition: PositionType,
  endPosition: PositionType
) => {
  const { x: sx, y: sy } = startPosition;
  const { x: ex, y: ey } = endPosition;
  const dx = ex - sx,
    dy = ey - sy;
  return {
    dx,
    dy,
    direction: getDirectionType(dy, dx),
  };
};

export const judgeDirectionSimple = (
  startPosition: PositionType,
  endPosition: PositionType
) => {
  const res = judgeDirection(startPosition, endPosition);

  return {
    ...res,
    direction: res.direction.split("-")[0] as UpAndDown | LeftAndRight,
  };
};

export const whichMoreCloser = (num: number, nums: number[]) => {
  let minIndex = 0,
    minDistance = Math.abs(num - nums[0]);

  nums.forEach((item, index) => {
    if (Math.abs(num - item) < minDistance) {
      minIndex = index;
    }
  });

  return minIndex;
};

export const isInMiddle = (num: number, left: number, right: number) => {
  if (left > right) {
    [left, right] = [right, left];
  }

  if (num >= left && num <= right) return true;
  return false;
};
