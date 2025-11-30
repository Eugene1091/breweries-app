"use client";

import BreweryDetails from "@/components/BreweryDetails";
import { useBreweryStoreById } from "@/store/breweries";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function page() {
  const params = useParams();
  const id = params.id as string | undefined;
  const fetchBreweryDataById = useBreweryStoreById(
    (state) => state.fetchtBreweryById
  );
  const breweryData = useBreweryStoreById((state) => state.beweryData);

  useEffect(() => {
    if (typeof id === "string") {
      fetchBreweryDataById(id);
    }
  }, [id, fetchBreweryDataById]);

  return (
    <div className="px-20 pt-10 flex flex-col items-center">
      <h1 className="pb-5 text-2xl">Brewery single page</h1>
      {!breweryData ? "Loading data" : <BreweryDetails {...breweryData} />}
    </div>
  );
}
