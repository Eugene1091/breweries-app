import { BreweryItem } from "@/store/breweries";

export default function BreweryDetails({
  id,
  name,
  city,
  brewery_type,
  phone,
  address_1,
  country,
  state,
  website_url,
}: BreweryItem) {
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{name}</h1>

      <div className="space-y-3">
        <p>
          <strong className="font-semibold">Тип:</strong> {brewery_type}
        </p>

        {address_1 && (
          <p>
            <strong className="font-semibold">Адреса:</strong> {address_1},{" "}
            {city}, {state}, {country}
          </p>
        )}

        {phone && (
          <p>
            <strong className="font-semibold">Телефон:</strong> {phone}
          </p>
        )}

        {website_url && (
          <p>
            <strong className="font-semibold">Вебсайт:</strong>
            <a
              href={website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline ml-2"
            >
              Відвідати сайт
            </a>
          </p>
        )}

        <p className="text-sm text-gray-500 mt-4">Унікальний ID: {id}</p>
      </div>
    </div>
  );
}
