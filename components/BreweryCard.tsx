import { BreweryItem, useBrewerySelectedId } from "@/store/breweries";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation"

export default function BreweryCard(props: BreweryItem) {
  const {
    id,
    name,
    city,
    brewery_type,
    phone,
    address_1,
    country
  } = props;

  const selectedIds = useBrewerySelectedId((state) => state.selectedIds);
  const toggleSelectedIds = useBrewerySelectedId(
    (state) => state.toggleSelectedIds
  );
  const route = useRouter();

  const contextMenuHandel = (event: React.MouseEvent) => {
    event.preventDefault();
    toggleSelectedIds(id);
  };

  const clickPageHandle = (e: React.MouseEvent) =>{
    route.push(`/brewery/${id}`);
  }

  return (
    <>
      <Card
        className="h-24 w-full bg-white rounded-xl items-start shadow-md gap-0 flex px-4 py-2"
        onContextMenu={contextMenuHandel}
        onClick={ clickPageHandle }
        style={selectedIds.includes(id) ? { outline: "2px solid #39c539" } : {}}
      >
        <CardTitle className="w-full mb-2">{name}</CardTitle>
        <CardContent className="space-y-1 p-0">
          <Label>City: {city}</Label>
          {/* <Label>Brewery type: {brewery_type}</Label> */}
          <Label>Phone: {phone}</Label>
          <Label>Address: {address_1}</Label>
          {/* <Label>Country: {country}</Label> */}
        </CardContent>
      </Card>
    </>
  );
}
