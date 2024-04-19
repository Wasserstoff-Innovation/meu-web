export const findPlaces = async (text: string) => {
  const { Place } = (await google.maps.importLibrary(
    "places"
  )) as google.maps.PlacesLibrary;
  const request = {
    textQuery: text,
    fields: ["location"],
    language: "en-US",
    maxResultCount: 8,
    region: "us",
    useStrictTypeFiltering: false,
  };

  const { places } = await Place.searchByText(request);

  if (places.length) {
    console.log(places);
  } else {
    console.log("No results");
  }
  return places;
};
