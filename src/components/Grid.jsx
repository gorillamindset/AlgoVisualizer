import Box from "./Box";
import { nanoid } from "nanoid";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { traverseGrid } from "../store/gridSlice";
import { startMode } from "../store/gridSlice";

function Grid() {
  /*
  let gridArray = [];

  let height = 5;
  let width = 10;
  for (let i = 0; i < height; i++) {
    let arr = [];
    for (let j = 0; j < width; j++) {
      arr.push(<Box />);
    }
    gridArray.push(arr);
  }
*/
  /*
    const [, setWallMode] = useState(false);
  
    const wallSelectionMode = useSelector((state)=>state.wallSelectionMode);
    const [wallMode,setWallMode] = useState(wallSelectionMode);
   
    const targetSelectionMode = useSelector((state)=>state.) 
    const [targetMode, setTarget] = useState(false);
    
  
    const [startSelectionMode, setStart] = useState(true);
    const [startAlgo, setStartAlgo] = useState(false);
*/

  /*
  const dispatch = useDispatch();
  function propogate(id) {
    if (useSelector(state.grid.startAlgo)) {
      traverseNow(id);
    } else if (wallSelectionMode) {
      dispatch(setValue({ id: id, value: 100 }));
    } else if (targetSelectionMode) {
      dispatch(setValue({ id: id, value: 20 }));
    } else if (startSelectionMode) {
      dispatch(setValue({ id: id, value: 1 }));
    }
  }

  async function traverseNow(id) {
    let arr = [id];
    while (arr.length) {
      const tempArr = await dispatch(traverseGrid[arr]);
      arr = tempArr;
    }
  }
*/

  //const rows = 5;
  //const columns = 15;
  //console.log(`rows: ${rows}`);
  //console.log(`cols: ${columns}`);
  /*
  function runAlgo(id, row, col, gridRefs) {
    if (startAlgo) {
      let arr = [id];
      while (arr.length && !pathfound) {
        arr = dispatch(
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
    }
  }
*/
  /*
  function Modes(row, col, gridRefs) {
    if (wallSelectionMode) {
      gridRefs.current[row][col].style.color = "red";
    } else if (startSelectionMode) {
      gridRefs.current[row][col].style.color = "blue";
      startId = grid[row][col].id;
    } else if (targetSelectionMode) {
      gridRefs.current[row][col].style.color = "green";
      targetId = grid[row][col].id;
    }
  }
*/

  const dispatch = useDispatch();

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

  const gridToLoop = useSelector((state) => state.grid.grids);

  const [gridRefs] = useState(getGridRefs(grid));

  function getGridRefs(grid) {
    let tempGrid = [];
    for (let i = 0; i < 5; i++) {
      let arr = [];
      //let arr = new Array(rows);
      for (let j = 0; j < 12; j++) {
        arr.push(useRef());
      }
      tempGrid.push(arr);
    }
    return tempGrid;
  }

  {
    console.log(gridRefs);
  }
  return (
    <div>
      {gridToLoop.map((arr, row) => (
        <div key={nanoid()}>
          {arr.map((id, col) => (
            <button
              className="inline"
              key={nanoid()}
              ref={(ele) => {
                gridRefs[row][col].current = ele;
              }}
              onClick={() => {
                if (startAlgo) {
                  let arr = [id];
                  while (arr.length && !pathfound) {
                    arr = dispatch(
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
                    while (temp != startId) {
                      arr.push(temp);
                      temp = reverseMapping[temp];
                    }
                    arr.push(startId);
                    return arr;
                  } else {
                    return [];
                  }
                } else {
                  if (wallSelectionMode) {
                    gridRefs[row][col].current.style["background-color"] =
                      "red";
                  } else if (startSelectionMode) {
                    if (!startSelectionMode) return;
                    if (gridRefs[row][col] && startSelectionMode)
                      gridRefs[row][col].current.style["background-color"] =
                        "red";
                    startId = grid[row][col].id;
                    dispatch(startMode());
                    console.log(gridRefs[row][col].current);
                  } else if (targetSelectionMode) {
                    gridRefs[row][col].current.style["background-color"] =
                      "green";
                    targetId = grid[row][col].id;
                  }
                }
              }}
            >
              <Box />
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
/*
 *
                startAlgo
                  ? runAlgo(id, row, col, gridRefs)
                  : Modes(row, col, gridRefs);
 */

export default Grid;
