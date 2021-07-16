import { createContext, useContext } from "react";
import Activitystore from "./activityStore";

interface Store {
    activityStore: Activitystore
}

export const store: Store = {
    activityStore: new Activitystore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}