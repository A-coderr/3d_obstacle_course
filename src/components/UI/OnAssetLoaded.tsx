import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPhase } from "../../store/gameSlice";

export default function OnAssetsLoaded() {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Assets loaded, switching to MAIN_MENU...");
    dispatch(setPhase("MAIN_MENU"));
  }, [dispatch]);

  return null;
}
