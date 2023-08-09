/* 

This is a JavaScript module that exports an object mediaApi containing three methods for making HTTP requests to media endpoints: getList, getDetail, and search.

The getList method makes a GET request to the media API's list endpoint, which takes three parameters: mediaType, mediaCategory, and page. The mediaType parameter specifies the type of media to retrieve (e.g. "movies", "tvshows"), mediaCategory specifies the category (e.g. "popular", "toprated"), and page specifies the page of results to retrieve.

The getDetail method makes a GET request to the media API's detail endpoint, which takes two parameters: mediaType and mediaId. The mediaType parameter specifies the type of media to retrieve details for, and mediaId specifies the unique identifier of the media item to retrieve.

The search method makes a GET request to the media API's search endpoint, which takes three parameters: mediaType, query, and page. The mediaType parameter specifies the type of media to search for, query specifies the search query string, and page specifies the page of search results to retrieve.

The mediaEndpoints object defines the URLs for each endpoint based on the provided parameters using string interpolation. privateClient and publicClient are imported from other modules and are used to make the HTTP requests.

Each method returns an object with a response property containing the data returned from the API if the request was successful, or an err property containing an error object if the request failed.

*/



/*
This is a React component that displays the details of a movie. It retrieves data from the TMDB API using the GetApiData module, which contains functions to get a movie list category(popular, top_rated, etc...), movie details, and movie search results. It also uses the favoriteApi module to add or remove movie from the user's favorites list.
*/