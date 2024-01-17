import { createSlice, nanoid } from "@reduxjs/toolkit";

/*
 * values: {
 * 0:path has not crossed yet;
 * 1:path has crossed this box;
 * 20:endNode;
 * 100:wallNode;
 * }
 */

const initialState = {
  grids: [], //array of arrays;
  count: 0,
  traversed: { asdf: 1 }, //nanoid:true;
  rows: 0,
  cols: 0,
  wall: {},
  start: null,
  wallSelectionMode: false,
  targetSelectionMode: false,
  startSelectionMode: true,
  startAlgo: false,
  pathfound: false,
};

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

  return (
    <div>
      {gridArray.map((arr) => (
        <div key={nanoid()}>{
          arr.map((ele) => ele)}</div>
      ))}
    </div>
  );
*/

export const gridSlice = createSlice({
  name: "grid",
  initialState,
  reducer: {
    createGrid: (state, action) => {
      let gridArray = [];
      let height = action.payload.height;
      let width = action.payload.width;
      for (let i = 0; i < height; i++) {
        let arr = [];
        for (let j = 0; j < width; j++) {
          let obj = {
            id: nanoid(),
            value: 0,
          };
          arr.push(obj);
        }
        gridArray.push(arr);
      }
      state.grids = gridArray;
    },
    traverseGrid: (state, action) => {
      let toTraverseArray = action.payload.arr;
      let gridRefs = action.payload.gridRefs;
      let adjElements = [];
      for (let i = 0; i < toTraverseArray.length; i++) {
        if (
          !state.traversed[toTraverseArray[i]] &&
          !state.wall[toTraverseArray[i]]
        ) {
          state.grids.map((arr, row) => {
            arr.map((ele, col) => {
              if (ele.value === 0) {
                ele.value = 1;
                state.grids.traversed[ele.id] = 1;
                gridRefs.current[row][col].style = "blue";
                adjElements.push(
                  ...state.grid.getAdjacentElements({
                    id: ele.id,
                    row: row,
                    col: col,
                  }),
                );
              } else if (ele.value === 20) {
                state.grid.pathfound = 1;
              }
            });
          });
        }
      }
      return adjElements;
    },
    getAdjacentElements: (state, action) => {
      let Og = action.payload.id;
      let row = action.payload.row;
      let col = action.payload.col;
      let ans = [];
      if (!state.traversed[Og]) {
        row > 0 && state.grids[row - 1][col].value === 0
          ? ans.push(state.grids[row - 1][col])
          : null;
        row < state.rows - 1 && state.grids[row + 1][col].value === 0
          ? ans.push(state.grids[row + 1][col])
          : null;
        col > 0 && state.grids[row][col - 1].value === 0
          ? ans.push(state.grids[row][col - 1])
          : null;
        col < state.cols - 1 && state.grids[row][col + 1].value === 0
          ? ans.push(state.grids[row][col + 1])
          : null;
      }
      return ans;
    },
    setValue: (state, action) => {
      const id = action.payload.id;
      const value = action.payload.value;
      state.grids.map((arr) => {
        arr.map((ele) => {
          ele.id === id ? ((ele.value = value), (state.wall[id] = 1)) : null;
        });
      });
    },
  },
});

export const { getAdjacentElements, setValue, createGrid, traverseGrid } =
  gridSlice.actions;

export default gridSlice.reducer;
