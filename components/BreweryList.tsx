"use client";

import BreweryCard from "@/components/BreweryCard";
import { Button } from "@/components/ui/button";
import { useBrewerySelectedId, useBreweryStore } from "@/store/breweries";
import { useEffect } from "react";

export default function BreweryList() {
  const deleteSelectedIds = useBrewerySelectedId(
    (state) => state.deleteSelectedIds
  );
  const fetchBreweries = useBreweryStore((state) => state.fetchtBreweries);
  const loadMoreData = useBreweryStore((state) => state.loadNewBreweries);
  const breweries = useBreweryStore((state) => state.breweries);
  const selectedIds = useBrewerySelectedId((state) => state.selectedIds);
  const startIndexList = useBreweryStore((state) => state.startIndex);

  useEffect(() => {
    fetchBreweries();
  }, []);

  const breweriesList = breweries.slice(startIndexList, startIndexList + 5);

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="flex justify-center relative">
          <h1 className="text-3xl font-bold mb-4">Breweries</h1>
          {selectedIds.length > 0 ? (
            <Button
              onClick={deleteSelectedIds}
              className="absolute top-0 right-0"
            >
              Delete
            </Button>
          ) : (
            ""
          )}
        </div>
        <div className="">
          <ul
            className="h-[calc(5*96px+4*1rem)] overflow-y-auto scroll-smooth p-4 flex flex-col gap-4"
            onScroll={(e) => {
              const element = e.currentTarget;
              if (
                element.scrollHeight - element.scrollTop <=
                element.clientHeight + 1
              ) {
                loadMoreData();
              }
            }}
          >
            {breweries.slice(startIndexList, startIndexList + 5).map((el) => (
              <li key={el.id}>
                <BreweryCard {...el} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
