import { resolve } from "path";
import { create } from "zustand";
const API = "https://api.openbrewerydb.org/v1/breweries";

export type BreweryItem = {
  id: string;
  name?: string;
  city?: string;
  brewery_type?: string;
  phone?: string;
  address_1?: string;
  country?: string;
  state?: string;
  website_url?: string;
};

export type Breweries = {
  breweries: BreweryItem[];
  currentPage: number;
  startIndex: number;
  fetchtBreweries: () => Promise<void>;
  loadNewBreweries: () => Promise<void>;
};

export const useBreweryStore = create<Breweries>((set, get) => ({
  breweries: [],
  currentPage: 1,
  startIndex: 0,
  fetchtBreweries: async () => {
    const res = await fetch(`${API}?per_page=15&page=${get().currentPage}`);
    const data = await res.json();
    set({ breweries: data });
  },
  loadNewBreweries: async () => {
    const startBreweries = [...get().breweries];
    const cropRange = startBreweries.slice(5);
    const curNextPage = get().currentPage + 1;
    const res = await fetch(`${API}?per_page=5&page=${curNextPage}`);
    const data = await res.json();
    const updateBreweriesList = [...cropRange, ...data];
    set({
      breweries: updateBreweriesList,
      currentPage: curNextPage,
      startIndex: 0
    })
  },
}));

type BreweryData = {
  beweryData: BreweryItem | null;
  fetchtBreweryById: (id: string) => Promise<void>;
};

export const useBreweryStoreById = create<BreweryData>((set) => ({
  beweryData: null,
  fetchtBreweryById: async (id: string) => {
    // https://api.openbrewerydb.org/v1/breweries/{id}
    const res = await fetch(`${API}/${id}`);
    const data = await res.json();
    set({ beweryData: data });
  },
}));

export type BreweriesIds = {
  selectedIds: string[];
  toggleSelectedIds: (id: string) => void;
  deleteSelectedIds: () => Promise<void>;
};

export const useBrewerySelectedId = create<BreweriesIds>((set, get) => ({
  selectedIds: [],
  toggleSelectedIds: (id: string) => {
    const selIds = [...get().selectedIds];
    const isIsset = selIds.includes(id);
    if (isIsset) {
      set({ selectedIds: [...selIds.filter((x) => x !== id)] });
    } else {
      set({ selectedIds: [...selIds, id] });
    }
  },
  deleteSelectedIds: async () => {
    const allBreweries = get().selectedIds;
    const currentBreweries = useBreweryStore.getState().breweries;
    const filterDeleteItems = currentBreweries.filter(
      (x) => !allBreweries.includes(x.id)
    );

    const missingItems = 15 - filterDeleteItems.length;

    if (missingItems > 0) {
      const nextPage = useBreweryStore.getState().currentPage + 1;
      const res = await fetch(
        `${API}?per_page=${missingItems}&page=${nextPage}`
      );
      const data = await res.json();
      useBreweryStore.setState({
        breweries: [...filterDeleteItems, ...data],
        currentPage: nextPage,
      });
    } else {
      useBreweryStore.setState({ breweries: filterDeleteItems });
    }
    set({ selectedIds: [] });
  },
}));
