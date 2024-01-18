import { useDispatch, useSelector } from "react-redux";
import { traverseGrid } from "../store/gridSlice";
import { Store } from "../store/Store";

//red:wall
//blue:start
//green:end
function Propagate({ id, row, col, gridRefs }) {
  const grid = useSelector((state) => state.grid.grids);
  let targetId = null;
  let startId = null;
  const reverseMapping = {};
  const pathfound = useSelector((state) => state.grid.pathfound);
  const wallSelectionMode = useSelector(
    (state) => state.grid.wallSelectionMode,
  );
  const startSelectionMode = useSelector(
    (state) => state.grid.startSelectionMode,
  );
  const targetSelectionMode = useSelector(
    (state) => state.grid.targetSelectionMode,
  );
  const startAlgo = useSelector((state) => state.grid.startAlgo);

  if (startAlgo) {
    let arr = [id];
    while (arr.length && !pathfound) {
      arr = Store.dispatch(
        traverseGrid({
          arr: arr,
          gridRefs: gridRefs,
          reverseMapping: reverseMapping,
        }),
      );
    }
    if (pathfound) {
      let arr = [targetId];
      let temp = targetId;
      while (reverseMapping[temp] != startId) {
        arr.push(reverseMapping[temp]);
        temp = reverseMapping[temp];
      }
      arr.push(startId);
      return arr;
    } else {
      return [];
    }
  } else if (wallSelectionMode) {
    gridRefs.current[row][col].style.color = "red";
  } else if (startSelectionMode) {
    gridRefs.current[row][col].style.color = "blue";
    startId = grid[row][col].id;
  } else if (targetSelectionMode) {
    gridRefs.current[row][col].style.color = "green";
    targetId = grid[row][col].id;
  }
}

export default Propagate;
