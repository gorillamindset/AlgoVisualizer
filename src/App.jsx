import "./App.css";
import Grid from "./components/Grid";
import { useDispatch, useSelector } from "react-redux";
import { createGrid } from "./store/gridSlice";
import { useState } from "react";

function App() {
  const dispatch = useDispatch();
  dispatch(createGrid({ rows: 5, columns: 12 }));

  let temp = useSelector((state) => state.grid.startSelectionMode);
  const [startMode, setStartMode] = useState(temp);
  console.log(startMode);

  return (
    <>
      <button
        onClick={() => {
          setStartMode(!startMode);
          dispatch(startMode(!startMode));
        }}
      >
        StartMode:{startMode}
      </button>
      <Grid />
    </>
  );
}

export default App;
