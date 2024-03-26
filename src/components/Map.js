// import React, { useEffect, useState } from 'react';

// const MapComponent = () => {
//   const [map, setMap] = useState(null);
//   const [directionsService, setDirectionsService] = useState(null);
//   const [directionsRenderer, setDirectionsRenderer] = useState(null);
//   const [currentLocationMarker, setCurrentLocationMarker] = useState(null);
//   const [destination, setDestination] = useState('');
//   const [autocompleteService, setAutocompleteService] = useState(null);
//   const [autocompleteSessionToken, setAutocompleteSessionToken] = useState(null);
//   const [distance, setDistance] = useState('');

//   useEffect(() => {
//     // Initialize the map and set current location marker
//     if (!map) {
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(position => {
//           const currentLocation = {
//             lat: position.coords.latitude,
//             lng: position.coords.longitude
//           };
//           const mapInstance = new window.google.maps.Map(document.getElementById('map'), {
//             center: currentLocation, // Set center to user's current location
//             zoom: 8,
//           });
//           setMap(mapInstance);
  
//           const marker = new window.google.maps.Marker({
//             position: currentLocation,
//             map: mapInstance,
//             title: "Your Location"
//           });
//           setCurrentLocationMarker(marker);
//         }, error => {
//           console.error('Error getting current location:', error);
//         });
//       } else {
//         console.error('Geolocation is not supported by this browser.');
//       }
//     }
//   }, [map]);

//   useEffect(() => {
//     // Initialize autocomplete service
//     if (map) {
//       const autocompleteServiceInstance = new window.google.maps.places.AutocompleteService();
//       setAutocompleteService(autocompleteServiceInstance);
//       setAutocompleteSessionToken(new window.google.maps.places.AutocompleteSessionToken());
//     }
//   }, [map]);

//   useEffect(() => {
//     // Calculate and display route when destination changes
//     if (map && destination) {
//       const directionsServiceInstance = new window.google.maps.DirectionsService();
//       const directionsRendererInstance = new window.google.maps.DirectionsRenderer();
//       setDirectionsService(directionsServiceInstance);
//       setDirectionsRenderer(directionsRendererInstance);

//       directionsRendererInstance.setMap(map);

//       const calculateAndDisplayRoute = () => {
//         directionsServiceInstance.route(
//           {
//             origin: currentLocationMarker.getPosition(), // Use current location as origin
//             destination,
//             travelMode: 'DRIVING',
//           },
//           (response, status) => {
//             if (status === 'OK') {
//               directionsRendererInstance.setDirections(response);
//               // Hide current location marker
//               if (currentLocationMarker) {
//                 currentLocationMarker.setMap(null);
//               }
//               // Calculate distance here
//               const distanceText = response.routes[0].legs[0].distance.text;
//               setDistance(distanceText);
//             } else {
//               console.error('Directions request failed due to ' + status);
//             }
//           }
//         );
//       };

//       calculateAndDisplayRoute();
//     }
//   }, [map, destination, currentLocationMarker]);

//   const handleCompassClick = () => {
//     if (map && currentLocationMarker) {
//       map.panTo(currentLocationMarker.getPosition());
//       map.setZoom(15);
//     }
//   };

//   const handleDestinationChange = (event) => {
//     setDestination(event.target.value);
//   };

//   const handleAutocomplete = (event) => {
//     if (autocompleteService) {
//       autocompleteService.getPlacePredictions({
//         input: event.target.value,
//         sessionToken: autocompleteSessionToken,
//       }, (predictions, status) => {
//         if (status === 'OK' && predictions) {
//           console.log(predictions);
//         }
//       });
//     }
//   };

//   return (
//     <div>
//       <input type="text" value={destination} onChange={handleDestinationChange} onInput={handleAutocomplete} placeholder="Enter destination" />
//       <button onClick={handleCompassClick} style={{ position: 'absolute', top: '10px', right: '10px', zIndex: '9999' }}>
//         <img src="compass-icon.png" alt="Compass" style={{ width: '50px', height: '50px' }} />
//       </button>
//       <div id="map" style={{ height: '550px', width: '100%', marginTop: '10px' }} />
//       {distance && <p>Distance: {distance}</p>}
//     </div>
//   );
// };

// export default MapComponent;

// import React, { useEffect, useState } from 'react';

// const MapComponent = () => {
//   const [map, setMap] = useState(null);
//   const [directionsService, setDirectionsService] = useState(null);
//   const [directionsRenderer, setDirectionsRenderer] = useState(null);
//   const [currentLocationMarker, setCurrentLocationMarker] = useState(null);
//   const [nearestParkingLocation, setNearestParkingLocation] = useState('');
//   const [parkingSlotCapacity, setParkingSlotCapacity] = useState('');

//   useEffect(() => {
//     // Initialize the map and set current location marker
//     if (!map) {
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(position => {
//           const currentLocation = {
//             lat: position.coords.latitude,
//             lng: position.coords.longitude
//           };
//           const mapInstance = new window.google.maps.Map(document.getElementById('map'), {
//             center: currentLocation, // Set center to user's current location
//             zoom: 15,
//           });
//           setMap(mapInstance);
  
//           const marker = new window.google.maps.Marker({
//             position: currentLocation,
//             map: mapInstance,
//             title: "Your Location"
//           });
//           setCurrentLocationMarker(marker);

//           // Find nearest parking location
//           const service = new window.google.maps.places.PlacesService(mapInstance);
//           service.nearbySearch({
//             location: currentLocation,
//             radius: 1000, // Search within a radius of 5 kilometers
//             type: 'parking'
//           }, (results, status) => {
//             if (status === window.google.maps.places.PlacesServiceStatus.OK && results.length > 0) {
//               setNearestParkingLocation(results[0]); // Set the nearest parking location
//               // Mocking parking slot capacity for demonstration
//               setParkingSlotCapacity(50); // Assume there are 50 parking slots available
//             }
//           });
//         }, error => {
//           console.error('Error getting current location:', error);
//         });
//       } else {
//         console.error('Geolocation is not supported by this browser.');
//       }
//     }
//   }, [map]);

//   useEffect(() => {
//     // Display route to nearest parking location
//     if (map && nearestParkingLocation) {
//       const directionsServiceInstance = new window.google.maps.DirectionsService();
//       const directionsRendererInstance = new window.google.maps.DirectionsRenderer();
//       setDirectionsService(directionsServiceInstance);
//       setDirectionsRenderer(directionsRendererInstance);

//       directionsRendererInstance.setMap(map);

//       directionsServiceInstance.route(
//         {
//           origin: currentLocationMarker.getPosition(), // Use current location as origin
//           destination: nearestParkingLocation.geometry.location,
//           travelMode: 'DRIVING',
//         },
//         (response, status) => {
//           if (status === 'OK') {
//             directionsRendererInstance.setDirections(response);
//           } else {
//             console.error('Directions request failed due to ' + status);
//           }
//         }
//       );
//     }
//   }, [map, nearestParkingLocation, currentLocationMarker]);

//   return (
//     <div>
//       <div id="map" style={{ height: '550px', width: '100%', marginTop: '10px' }} />
//       {parkingSlotCapacity && <p>Parking Slot Capacity: {parkingSlotCapacity}</p>}
//       {nearestParkingLocation && (
//         <div>
//           <p>Nearest Parking Location:</p>
//           <p>{nearestParkingLocation.name}</p>
//           <p>{nearestParkingLocation.vicinity}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MapComponent;


// import React, { useEffect, useState } from 'react';

// const MapComponent = () => {
//   const [map, setMap] = useState(null);
//   const [directionsService, setDirectionsService] = useState(null);
//   const [directionsRenderer, setDirectionsRenderer] = useState(null);
//   const [currentLocationMarker, setCurrentLocationMarker] = useState(null);
//   const [nearestParkingLocation, setNearestParkingLocation] = useState(null); // Changed to null
//   const [parkingSlotCapacity, setParkingSlotCapacity] = useState(null); // Changed to null

//   useEffect(() => {
//     // Initialize the map and set current location marker
//     if (!map) {
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(position => {
//           const currentLocation = {
//             lat: position.coords.latitude,
//             lng: position.coords.longitude
//           };
//           const mapInstance = new window.google.maps.Map(document.getElementById('map'), {
//             center: currentLocation, // Set center to user's current location
//             zoom: 15,
//           });
//           setMap(mapInstance);
  
//           const marker = new window.google.maps.Marker({
//             position: currentLocation,
//             map: mapInstance,
//             title: "Your Location"
//           });
//           setCurrentLocationMarker(marker);

//           // Hardcoded parking location
//           const parkingLocation = {
//             name: "Example Parking",
//             vicinity: "123 Parking Street, City",
//             geometry: {
//               location: { lat: 12.3456, lng: -34.5678 } // Example coordinates
//             }
//           };
//           setNearestParkingLocation(parkingLocation);

//           // Hardcoded parking slot capacity
//           const capacity = 50; // Assume there are 50 parking slots available
//           setParkingSlotCapacity(capacity);
//         }, error => {
//           console.error('Error getting current location:', error);
//         });
//       } else {
//         console.error('Geolocation is not supported by this browser.');
//       }
//     }
//   }, [map]);

//   useEffect(() => {
//     // Display route to nearest parking location
//     if (map && nearestParkingLocation) {
//       const directionsServiceInstance = new window.google.maps.DirectionsService();
//       const directionsRendererInstance = new window.google.maps.DirectionsRenderer();
//       setDirectionsService(directionsServiceInstance);
//       setDirectionsRenderer(directionsRendererInstance);

//       directionsRendererInstance.setMap(map);

//       directionsServiceInstance.route(
//         {
//           origin: currentLocationMarker.getPosition(), // Use current location as origin
//           destination: nearestParkingLocation.geometry.location,
//           travelMode: 'DRIVING',
//         },
//         (response, status) => {
//           if (status === 'OK') {
//             directionsRendererInstance.setDirections(response);
//           } else {
//             console.error('Directions request failed due to ' + status);
//           }
//         }
//       );
//     }
//   }, [map, nearestParkingLocation, currentLocationMarker]);

//   return (
//     <div>
//       <div id="map" style={{ height: '550px', width: '100%', marginTop: '10px' }} />
//       {parkingSlotCapacity && <p>Parking Slot Capacity: {parkingSlotCapacity}</p>}
//       {nearestParkingLocation && (
//         <div>
//           <p>Nearest Parking Location:</p>
//           <p>{nearestParkingLocation.name}</p>
//           <p>{nearestParkingLocation.vicinity}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MapComponent;

// import React, { useEffect, useState } from 'react';

// const MapComponent = () => {
//   const [map, setMap] = useState(null);
//   const [directionsService, setDirectionsService] = useState(null);
//   const [directionsRenderer, setDirectionsRenderer] = useState(null);
//   const [currentLocationMarker, setCurrentLocationMarker] = useState(null);
//   const [nearestParkingLocation, setNearestParkingLocation] = useState(null);
//   const [parkingSlotCapacity, setParkingSlotCapacity] = useState(null);
//   const [distanceToParking, setDistanceToParking] = useState(null);

//   useEffect(() => {
//     // Initialize the map and set current location marker
//     if (!map) {
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(position => {
//           const currentLocation = {
//             lat: position.coords.latitude,
//             lng: position.coords.longitude
//           };
//           console.log(currentLocation)
//           const mapInstance = new window.google.maps.Map(document.getElementById('map'), {
//             center: currentLocation, // Set center to user's current location
//             zoom: 15,
//           });
//           setMap(mapInstance);
  
//           const marker = new window.google.maps.Marker({
//             position: currentLocation,
//             map: mapInstance,
//             title: "Your Location"
//           });
//           setCurrentLocationMarker(marker);


//           // Hardcoded parking location
//           const parkingLocation = {
//             lat: 11.0548,
//             lng: 76.9941
//           };
//           setNearestParkingLocation(parkingLocation);

//           // Hardcoded parking slot capacity
//           setParkingSlotCapacity(50); // Assume there are 50 parking slots available

//           // Calculate distance to parking location
//           const directionsServiceInstance = new window.google.maps.DirectionsService();
//           directionsServiceInstance.route(
//             {
//               origin: currentLocation,
//               destination: parkingLocation,
//               travelMode: 'DRIVING',
//             },
//             (response, status) => {
//               if (status === 'OK') {
//                 const distance = response.routes[0].legs[0].distance.text;
//                 setDistanceToParking(distance);
//               } else {
//                 console.error('Directions request failed due to ' + status);
//               }
//             }
//           );
//         }, error => {
//           console.error('Error getting current location:', error);
//         });
//       } else {
//         console.error('Geolocation is not supported by this browser.');
//       }
//     }
//   }, [map]);

//   useEffect(() => {
//     // Display route to nearest parking location
//     if (map && nearestParkingLocation) {
//       const directionsServiceInstance = new window.google.maps.DirectionsService();
//       const directionsRendererInstance = new window.google.maps.DirectionsRenderer();
//       setDirectionsService(directionsServiceInstance);
//       setDirectionsRenderer(directionsRendererInstance);

//       directionsRendererInstance.setMap(map);

//       directionsServiceInstance.route(
//         {
//           origin: currentLocationMarker.getPosition(), // Use current location as origin
//           destination: nearestParkingLocation,
//           travelMode: 'DRIVING',
//         },
//         (response, status) => {
//           if (status === 'OK') {
//             directionsRendererInstance.setDirections(response);
//           } else {
//             console.error('Directions request failed due to ' + status);
//           }
//         }
//       );
//     }
//   }, [map, nearestParkingLocation, currentLocationMarker]);

//   return (
//     <div>
//       <div id="map" style={{ height: '550px', width: '100%', marginTop: '10px' }} />
//       {parkingSlotCapacity && <p>Parking Slot Capacity: {parkingSlotCapacity}</p>}
//       {distanceToParking && <p>Distance to Parking: {distanceToParking}</p>}
//     </div>
//   );
// };

// export default MapComponent;


// import React, { useEffect, useState } from 'react';

// const MapComponent = () => {
//   const [map, setMap] = useState(null);
//   const [directionsService, setDirectionsService] = useState(null);
//   const [directionsRenderer, setDirectionsRenderer] = useState(null);
//   const [currentLocationMarker, setCurrentLocationMarker] = useState(null);
//   const [nearestParkingLocation, setNearestParkingLocation] = useState(null);
//   const [parkingSlotCapacity, setParkingSlotCapacity] = useState(null);
//   const [distanceToParking, setDistanceToParking] = useState(null);
//   const [bookingQuantity, setBookingQuantity] = useState(1); // Default booking quantity

//   useEffect(() => {
//     // Initialize the map and set current location marker
//     if (!map) {
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(position => {
//           const currentLocation = {
//             lat: position.coords.latitude,
//             lng: position.coords.longitude
//           };
//           console.log(currentLocation)
//           const mapInstance = new window.google.maps.Map(document.getElementById('map'), {
//             center: currentLocation, // Set center to user's current location
//             zoom: 15,
//           });
//           setMap(mapInstance);
  
//           const marker = new window.google.maps.Marker({
//             position: currentLocation,
//             map: mapInstance,
//             title: "Your Location"
//           });
//           setCurrentLocationMarker(marker);


//           // Hardcoded parking location
//           const parkingLocation = {
//             lat: 11.0548,
//             lng: 76.9941
//           };
//           setNearestParkingLocation(parkingLocation);

//           // Hardcoded parking slot capacity
//           setParkingSlotCapacity(50); // Assume there are 50 parking slots available

//           // Calculate distance to parking location
//           const directionsServiceInstance = new window.google.maps.DirectionsService();
//           directionsServiceInstance.route(
//             {
//               origin: currentLocation,
//               destination: parkingLocation,
//               travelMode: 'DRIVING',
//             },
//             (response, status) => {
//               if (status === 'OK') {
//                 const distance = response.routes[0].legs[0].distance.text;
//                 setDistanceToParking(distance);
//               } else {
//                 console.error('Directions request failed due to ' + status);
//               }
//             }
//           );
//         }, error => {
//           console.error('Error getting current location:', error);
//         });
//       } else {
//         console.error('Geolocation is not supported by this browser.');
//       }
//     }
//   }, [map]);

//   useEffect(() => {
//     // Display route to nearest parking location
//     if (map && nearestParkingLocation) {
//       const directionsServiceInstance = new window.google.maps.DirectionsService();
//       const directionsRendererInstance = new window.google.maps.DirectionsRenderer();
//       setDirectionsService(directionsServiceInstance);
//       setDirectionsRenderer(directionsRendererInstance);

//       directionsRendererInstance.setMap(map);

//       directionsServiceInstance.route(
//         {
//           origin: currentLocationMarker.getPosition(), // Use current location as origin
//           destination: nearestParkingLocation,
//           travelMode: 'DRIVING',
//         },
//         (response, status) => {
//           if (status === 'OK') {
//             directionsRendererInstance.setDirections(response);
//           } else {
//             console.error('Directions request failed due to ' + status);
//           }
//         }
//       );
//     }
//   }, [map, nearestParkingLocation, currentLocationMarker]);

//   const handleBooking = () => {
//     // Handle booking action here
//     console.log(`Booking ${bookingQuantity} parking slots`);
//     // Implement your booking logic here, such as sending a request to a server
//   };

//   const handleBookingQuantityChange = (event) => {
//     setBookingQuantity(parseInt(event.target.value, 10)); // Parse input value as integer
//   };

//   return (
//     <div>
//       <div id="map" style={{ height: '550px', width: '100%', marginTop: '10px' }} />
//       {parkingSlotCapacity && <p>Parking Slot Capacity: {parkingSlotCapacity}</p>}
//       {distanceToParking && <p>Distance to Parking: {distanceToParking}</p>}
//       <div>
//         <label htmlFor="bookingQuantity">Booking Quantity:</label>
//         <input type="number" id="bookingQuantity" value={bookingQuantity} onChange={handleBookingQuantityChange} min="1" />
//         <button onClick={handleBooking}>Book Parking Slots</button>
//       </div>
//     </div>
//   );
// };

// export default MapComponent;

//finely working code
// import React, { useEffect, useState } from 'react';

// const Map = () => {
//   const [map, setMap] = useState(null);
//   const [directionsService, setDirectionsService] = useState(null);
//   const [directionsRenderer, setDirectionsRenderer] = useState(null);
//   const [currentLocationMarker, setCurrentLocationMarker] = useState(null);
//   const [nearestParkingLocation, setNearestParkingLocation] = useState(null);
//   const [parkingSlotCapacity, setParkingSlotCapacity] = useState(null);
//   const [distanceToParking, setDistanceToParking] = useState(null);
//   const [bookingQuantity, setBookingQuantity] = useState(0);

//   useEffect(() => {
//     // Initialize the map and set current location marker
//     if (!map) {
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(position => {
//           const currentLocation = {
//             lat: position.coords.latitude,
//             lng: position.coords.longitude
//           };
//           const mapInstance = new window.google.maps.Map(document.getElementById('map'), {
//             center: currentLocation, // Set center to user's current location
//             zoom: 15,
//           });
//           setMap(mapInstance);
  
//           const marker = new window.google.maps.Marker({
//             position: currentLocation,
//             map: mapInstance,
//             title: "Your Location"
//           });
//           setCurrentLocationMarker(marker);

//           // Hardcoded parking location
//           const parkingLocation = {
//             lat: 11.0548,
//             lng: 76.9941
//           };
//           setNearestParkingLocation(parkingLocation);

//           // Hardcoded parking slot capacity
//           setParkingSlotCapacity(5); // Assume there are 50 parking slots available

//           // Calculate distance to parking location
//           const directionsServiceInstance = new window.google.maps.DirectionsService();
//           directionsServiceInstance.route(
//             {
//               origin: currentLocation,
//               destination: parkingLocation,
//               travelMode: 'DRIVING',
//             },
//             (response, status) => {
//               if (status === 'OK') {
//                 const distance = response.routes[0].legs[0].distance.text;
//                 setDistanceToParking(distance);
//               } else {
//                 console.error('Directions request failed due to ' + status);
//               }
//             }
//           );
//         }, error => {
//           console.error('Error getting current location:', error);
//         });
//       } else {
//         console.error('Geolocation is not supported by this browser.');
//       }

//     }
//   }, [map]);

//   useEffect(() => {
//     // Display route to nearest parking location
//     if (map && nearestParkingLocation) {
//       const directionsServiceInstance = new window.google.maps.DirectionsService();
//       const directionsRendererInstance = new window.google.maps.DirectionsRenderer();
//       setDirectionsService(directionsServiceInstance);
//       setDirectionsRenderer(directionsRendererInstance);

//       directionsRendererInstance.setMap(map);

//       directionsServiceInstance.route(
//         {
//           origin: currentLocationMarker.getPosition(), // Use current location as origin
//           destination: nearestParkingLocation,
//           travelMode: 'DRIVING',
//         },
//         (response, status) => {
//           if (status === 'OK') {
//             directionsRendererInstance.setDirections(response);
//           } else {
//             console.error('Directions request failed due to ' + status);
//           }
//         }
//       );
//     }
//   }, [map, nearestParkingLocation, currentLocationMarker]);

//   const handleBooking = () => {
//     if (bookingQuantity > 0 && bookingQuantity <= parkingSlotCapacity) {
//       setParkingSlotCapacity(prevCapacity => prevCapacity - bookingQuantity);
//       setBookingQuantity(0);
//     } else {
//       alert('Please enter a valid booking quantity.');
//     }
//   };

//   return (
//     <div>
//       <div id="map" style={{ height: '570px', width: '100%', marginTop: '10px' }} />
//       {parkingSlotCapacity && <p>Parking Slot Capacity: {parkingSlotCapacity}</p>}
//       {distanceToParking && <p>Distance to Parking: {distanceToParking}</p>}
//       <input 
//         type="number" 
//         value={bookingQuantity} 
//         onChange={(e) => setBookingQuantity(parseInt(e.target.value))}
//         placeholder="Enter quantity"
//         min="0"
//       />
//       <button onClick={handleBooking}>Book Slots</button>
      
//     </div>
//   );
// };

// export default Map;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const Map = () => {
//   const [map, setMap] = useState(null);
//   const [directionsService, setDirectionsService] = useState(null);
//   const [directionsRenderer, setDirectionsRenderer] = useState(null);
//   const [currentLocationMarker, setCurrentLocationMarker] = useState(null);
//   const [nearestParkingLocation, setNearestParkingLocation] = useState(null);
//   const [parkingSlotCapacity, setParkingSlotCapacity] = useState(null);
//   const [distanceToParking, setDistanceToParking] = useState(null);
//   const [bookingQuantity, setBookingQuantity] = useState(0);

  
//   useEffect(() => {
//     // Initialize the map and set current location marker
//     if (!map) {
//         if (navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition(position => {
//                 const currentLocation = {
//                     lat: position.coords.latitude,
//                     lng: position.coords.longitude
//                 };
//                 const mapInstance = new window.google.maps.Map(document.getElementById('map'), {
//                     center: currentLocation, // Set center to user's current location
//                     zoom: 15,
//                 });
//                 setMap(mapInstance);

//                 const marker = new window.google.maps.Marker({
//                     position: currentLocation,
//                     map: mapInstance,
//                     title: "Your Location"
//                 });
//                 setCurrentLocationMarker(marker);

//                 // Fetch parking slots from the backend
//                 axios.get('http://localhost:4000/parking-slots')
//                     .then(response => {
//                         // Choose the nearest parking location
//                         const nearestParking = findNearestParking(currentLocation, response.data);
//                         setNearestParkingLocation(nearestParking.location);
//                         setParkingSlotCapacity(nearestParking.capacity);

//                         // Calculate distance to parking location
//                         const distance = calculateDistance(currentLocation.lat, currentLocation.lng, nearestParking.location.lat, nearestParking.location.lng);
//                         setDistanceToParking(distance);

//                         // Display route to nearest parking location
//                         const directionsServiceInstance = new window.google.maps.DirectionsService();
//                         const directionsRendererInstance = new window.google.maps.DirectionsRenderer({
//                             map: mapInstance,
//                             suppressMarkers: true // Do not display default markers for the route
//                         });
//                         setDirectionsService(directionsServiceInstance);
//                         setDirectionsRenderer(directionsRendererInstance);

//                         directionsServiceInstance.route(
//                             {
//                                 origin: currentLocation,
//                                 destination: nearestParking.location,
//                                 travelMode: 'DRIVING',
//                             },
//                             (response, status) => {
//                                 if (status === 'OK') {
//                                     directionsRendererInstance.setDirections(response);
//                                 } else {
//                                     console.error('Directions request failed due to ' + status);
//                                 }
//                             }
//                         );
//                     })
//                     .catch(error => {
//                         console.error('Error fetching parking slots:', error);
//                     });
//             }, error => {
//                 console.error('Error getting current location:', error);
//             },{ enableHighAccuracy: true });
//         } else {
//             console.error('Geolocation is not supported by this browser.');
//         }
//     }
// }, [map]);

//   // Function to calculate distance between two points using Haversine formula
//   const calculateDistance = (lat1, lon1, lat2, lon2) => {
//     const R = 6371; // Radius of the Earth in kilometers
//     const dLat = (lat2 - lat1) * Math.PI / 180;
//     const dLon = (lon2 - lon1) * Math.PI / 180;
//     const a =
//         Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//         Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
//         Math.sin(dLon / 2) * Math.sin(dLon / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     const distance = R * c; // Distance in kilometers
//     return distance;
//   };

//   // Function to find the nearest parking location
//   const findNearestParking = (currentLocation, parkingSlots) => {
//     let minDistance = Infinity;
//     let nearestParking = null;  

//     parkingSlots.forEach(slot => {
//       const distance = calculateDistance(currentLocation.lat, currentLocation.lng, slot.location.lat, slot.location.lng);
//       if (distance < minDistance) {
//         minDistance = distance;
//         nearestParking = slot;
//       }
//     });

//     return nearestParking;
//   };

//   const handleBooking = () => {
//     if (bookingQuantity > 0 && bookingQuantity <= parkingSlotCapacity) {
//       setParkingSlotCapacity(prevCapacity => prevCapacity - bookingQuantity);
//       setBookingQuantity(0);
//     } else {
//       alert('Please enter a valid booking quantity.');
//     }
//   };

//   return (
//     <div>
//       <div id="map" style={{ height: '570px', width: '100%', marginTop: '10px' }} />
//       {parkingSlotCapacity && <p>Parking Slot Capacity: {parkingSlotCapacity}</p>}
//       {distanceToParking && <p>Distance to Parking: {distanceToParking.toFixed(2)} km</p>}
//       <input 
//         type="number" 
//         value={bookingQuantity} 
//         onChange={(e) => setBookingQuantity(parseInt(e.target.value))}
//         placeholder="Enter quantity"
//         min="0"
//       />
//       <button onClick={handleBooking}>Book Slots</button>
//     </div>
//   );
// };

// export default Map;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const Map = () => {
//   const [map, setMap] = useState(null);
//   const [directionsService, setDirectionsService] = useState(null);
//   const [directionsRenderer, setDirectionsRenderer] = useState(null);
//   const [currentLocationMarker, setCurrentLocationMarker] = useState(null);
//   const [nearestParkingLocation, setNearestParkingLocation] = useState(null);
//   const [parkingSlotCapacity, setParkingSlotCapacity] = useState(null);
//   const [distanceToParking, setDistanceToParking] = useState(null);
//   const [bookingQuantity, setBookingQuantity] = useState(0);
//   const [parkingSlots, setParkingSlots] = useState([]);

//   useEffect(() => {
//     if (!map) {
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(position => {
//           const currentLocation = {
//             lat: position.coords.latitude,
//             lng: position.coords.longitude
//           };

//           const mapInstance = new window.google.maps.Map(document.getElementById('map'), {
//             center: currentLocation,
//             zoom: 15,
//           });

//           setMap(mapInstance);

//           const marker = new window.google.maps.Marker({
//             position: currentLocation,
//             map: mapInstance,
//             title: "Your Location"
//           });

//           setCurrentLocationMarker(marker);

//           axios.get('http://localhost:4000/parking-slots')
//             .then(response => {
//               setParkingSlots(response.data);
//               const nearestParking = findNearestParking(currentLocation, response.data);
//               setNearestParkingLocation(nearestParking.location);
//               setParkingSlotCapacity(nearestParking.capacity);
//               const distance = calculateDistance(currentLocation.lat, currentLocation.lng, nearestParking.location.lat, nearestParking.location.lng);
//               setDistanceToParking(distance);

//               const directionsServiceInstance = new window.google.maps.DirectionsService();
//               const directionsRendererInstance = new window.google.maps.DirectionsRenderer({
//                 map: mapInstance,
//                 suppressMarkers: true
//               });

//               setDirectionsService(directionsServiceInstance);
//               setDirectionsRenderer(directionsRendererInstance);

//               directionsServiceInstance.route(
//                 {
//                   origin: currentLocation,
//                   destination: nearestParking.location,
//                   travelMode: 'DRIVING',
//                 },
//                 (response, status) => {
//                   if (status === 'OK') {
//                     directionsRendererInstance.setDirections(response);
//                   } else {
//                     console.error('Directions request failed due to ' + status);
//                   }
//                 }
//               );
//             })
//             .catch(error => {
//               console.error('Error fetching parking slots:', error);
//             });
//         }, error => {
//           console.error('Error getting current location:', error);
//         }, { enableHighAccuracy: true });
//       } else {
//         console.error('Geolocation is not supported by this browser.');
//       }
//     } else {
//       // Add markers for parking slots
//       if (parkingSlots.length > 0) {
//         const markers = parkingSlots.map(slot => {
//           return new window.google.maps.Marker({
//             position: slot.location,
//             map: map,
//             title: "Parking Slot"
//           });
//         });
//       }
//     }
//   }, [map, parkingSlots]);

//   // Function to calculate distance between two points using Haversine formula
//   const calculateDistance = (lat1, lon1, lat2, lon2) => {
//     const R = 6371; // Radius of the Earth in kilometers
//     const dLat = (lat2 - lat1) * Math.PI / 180;
//     const dLon = (lon2 - lon1) * Math.PI / 180;
//     const a =
//       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//       Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
//       Math.sin(dLon / 2) * Math.sin(dLon / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     const distance = R * c; // Distance in kilometers
//     return distance;
//   };

//   // Function to find the nearest parking location
//   const findNearestParking = (currentLocation, parkingSlots) => {
//     let minDistance = Infinity;
//     let nearestParking = null;

//     parkingSlots.forEach(slot => {
//       const distance = calculateDistance(currentLocation.lat, currentLocation.lng, slot.location.lat, slot.location.lng);
//       if (distance < minDistance) {
//         minDistance = distance;
//         nearestParking = slot;
//       }
//     });

//     return nearestParking;
//   };

//   const handleBooking = () => {
//     if (bookingQuantity > 0 && bookingQuantity <= parkingSlotCapacity) {
//       setParkingSlotCapacity(prevCapacity => prevCapacity - bookingQuantity);
//       setBookingQuantity(0);
//     } else {
//       alert('Please enter a valid booking quantity.');
//     }
//   };

//   return (
//     <div>
//       <div id="map" style={{ height: '570px', width: '100%', marginTop: '10px' }} />
//       {parkingSlotCapacity && <p>Parking Slot Capacity: {parkingSlotCapacity}</p>}
//       {distanceToParking && <p>Distance to Parking: {distanceToParking.toFixed(1)} km</p>}
//       <input
//         type="number"
//         value={bookingQuantity}
//         onChange={(e) => setBookingQuantity(parseInt(e.target.value))}
//         placeholder="Enter quantity"
//         min="0"
//       />
//       <button onClick={handleBooking}>Book Slots</button>
//     </div>
//   );
// };

// export default Map;


import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Map = () => {
  const [map, setMap] = useState(null);
  const [directionsService, setDirectionsService] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [currentLocationMarker, setCurrentLocationMarker] = useState(null);
  const [selectedParkingLocation, setSelectedParkingLocation] = useState(null);
  const [parkingSlotCapacity, setParkingSlotCapacity] = useState(null);
  const [distanceToParking, setDistanceToParking] = useState(null);
  const [bookingQuantity, setBookingQuantity] = useState(0);
  const [parkingSlots, setParkingSlots] = useState([]);

  useEffect(() => {
    if (!map) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          const currentLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          const mapInstance = new window.google.maps.Map(document.getElementById('map'), {
            center: currentLocation,
            zoom: 15,
          });

          setMap(mapInstance);

          const marker = new window.google.maps.Marker({
            position: currentLocation,
            map: mapInstance,
            title: "Your Location"
          });

          setCurrentLocationMarker(marker);

          axios.get('http://localhost:4000/parking-slots')
            .then(response => {
              setParkingSlots(response.data);
              const nearestParking = findNearestParking(currentLocation, response.data);
              setParkingSlotCapacity(nearestParking.capacity);
              const distance = calculateDistance(currentLocation.lat, currentLocation.lng, nearestParking.location.lat, nearestParking.location.lng);
              setDistanceToParking(distance);

              const directionsServiceInstance = new window.google.maps.DirectionsService();
              const directionsRendererInstance = new window.google.maps.DirectionsRenderer({
                map: mapInstance,
                suppressMarkers: true
              });

              setDirectionsService(directionsServiceInstance);
              setDirectionsRenderer(directionsRendererInstance);

              directionsServiceInstance.route(
                {
                  origin: currentLocation,
                  destination: nearestParking.location,
                  travelMode: 'DRIVING',
                },
                (response, status) => {
                  if (status === 'OK') {
                    directionsRendererInstance.setDirections(response);
                  } else {
                    console.error('Directions request failed due to ' + status);
                  }
                }
              );
            })
            .catch(error => {
              console.error('Error fetching parking slots:', error);
            });
        }, error => {
          console.error('Error getting current location:', error);
        }, { enableHighAccuracy: true });
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    } else {
      // Add markers for parking slots
      if (parkingSlots.length > 0) {
        parkingSlots.forEach(slot => {
          const marker = new window.google.maps.Marker({
            position: slot.location,
            map: map,
            title: "Parking Slot"
          });
          marker.addListener('click', () => {
            setSelectedParkingLocation(slot);
            const currentLocation = currentLocationMarker.getPosition();
            setParkingSlotCapacity(slot.capacity);
            const distance = calculateDistance(currentLocation.lat(), currentLocation.lng(), slot.location.lat, slot.location.lng);
            setDistanceToParking(distance);

            directionsService.route(
              {
                origin: currentLocation,
                destination: slot.location,
                travelMode: 'DRIVING',
              },
              (response, status) => {
                if (status === 'OK') {
                  directionsRenderer.setDirections(response);
                } else {
                  console.error('Directions request failed due to ' + status);
                }
              }
            );
          });
        });
      }
    }
  }, [map, parkingSlots]);

  // Function to calculate distance between two points using Haversine formula
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
  };

  // Function to find the nearest parking location
  const findNearestParking = (currentLocation, parkingSlots) => {
    let minDistance = Infinity;
    let nearestParking = null;

    parkingSlots.forEach(slot => {
      const distance = calculateDistance(currentLocation.lat, currentLocation.lng, slot.location.lat, slot.location.lng);
      if (distance < minDistance) {
        minDistance = distance;
        nearestParking = slot;
      }
    });

    return nearestParking;
  };

  const handleBooking = () => {
    if (bookingQuantity > 0 && bookingQuantity <= parkingSlotCapacity) {
      setParkingSlotCapacity(prevCapacity => prevCapacity - bookingQuantity);
      setBookingQuantity(0);
    } else {
      alert('Please enter a valid booking quantity.');
    }
  };

  return (
    <div>
      <div id="map" style={{ height: '570px', width: '100%', marginTop: '10px' }} />
      {selectedParkingLocation && <p>Selected Parking Slot Capacity: {parkingSlotCapacity}</p>}
      {distanceToParking && <p>Distance to Parking: {distanceToParking.toFixed(1)} km</p>}
      <input
        type="number"
        value={bookingQuantity}
        onChange={(e) => setBookingQuantity(parseInt(e.target.value))}
        placeholder="Enter quantity"
        min="0"
      />
      <button onClick={handleBooking}>Book Slots</button>
    </div>
  );
};

export default Map;
