import { createContext, useContext } from "react";
import Activitystore from "./activityStore";
import CommonStore from "./commonStore";

interface Store {
    activityStore: Activitystore;
    commonStore: CommonStore;
}

export const store: Store = {
    activityStore: new Activitystore(),
    commonStore: new CommonStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}