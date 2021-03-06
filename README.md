
## Inspiration

[Sindhu Shivaprasad](https://twitter.com/sindhusprasad)'s document on [what to do in Bangalore](https://sindhusprasad.notion.site/sindhusprasad/what-to-do-in-blr-f8c9d1386f524792aeefc6da62628bf9) is given some locational context in this tool. A side aim is also to create a growing dataset that anyone can contribute to. 

## Data

All data is available in the `data.json` file.

## Contributing

Simply add a new feature to `features` in `data.json` and create a pull request. The different keys serve the following purposes:

1. properties/title: The label of the point of interest seen on the map.
2. properties/icon: Image used to mark the point of interest on the map. Uses standard icons provided by Mapbox. More information [here](https://github.com/mapbox/mapbox-gl-styles#standard-icons).
3. properties/googleMapsURL: The Google Maps URL of the point of interest. Powers the description when the feature is clicked on the map.
4. properties/category: Category of the point of interest.
