import Box from "./Box";
import { nanoid } from "nanoid";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setValue, traverseGrid } from "../store/gridSlice";
import Propagate from "../features/Propagate";

function Grid({ rows, columns }) {
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
  const gridToLoop = useSelector((state) => state.grids);

  const [gridRefs] = useState(getGridRefs());

  function getGridRefs() {
    let tempGrid = [];
    for (let i = 0; i < rows; i++) {
      let arr = [];
      for (let j = 0; j < columns; j++) {
        arr.push(null);
      }
      tempGrid.push(arr);
    }
    return tempGrid;
  }

  return (
    <div>
      {gridToLoop.map((arr, row) => (
        <div key={nanoid()}>
          {arr.map((id, col) => (
            <div
              key={id}
              onClick={() => Propagate(id, row, col, gridRefs)}
              ref={(ele) => {
                gridRefs.current[row][col] = ele;
              }}
            >
              <Box />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Grid;
