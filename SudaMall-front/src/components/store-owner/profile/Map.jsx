import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { closeMap } from '../../../app/AppStats';
import { MdOutlineArrowCircleRight } from 'react-icons/md';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const LocationMarker = ({ setSelectedLocation, onLocationSelect, mapRef }) => {
  const map = useMapEvents({
    click(e) {
      const location = e.latlng;
      setSelectedLocation(location);
      onLocationSelect(location);
      mapRef.current?.flyTo(location, 15);
    },
  });

  return null;
}

const Map = ({ value, onChange, onSave }) => {
    const dispatch = useDispatch();
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [areaName, setAreaName] = useState(value || '');
    const [isGeocoding, setIsGeocoding] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const khartoumPosition = [15.5007, 32.5599];
    const mapRef = useRef();

    const handleCloseMap = () => {
        dispatch(closeMap())
    }

    // Enhanced reverse geocoding to get hierarchical Arabic names
    const reverseGeocode = async (lat, lng) => {
      try {
        setIsGeocoding(true);
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1&accept-language=ar`
        );
        const data = await response.json();
        
        if (data.address) {
          // Construct hierarchical name: Street > Neighborhood > City
          let nameParts = [];
          if (data.address.road) nameParts.push(data.address.road);
          if (data.address.quarter) nameParts.push(data.address.quarter);
          if (data.address.neighbourhood) nameParts.push(data.address.neighbourhood);
          if (data.address.city) nameParts.push(data.address.city);
          
          const fullName = nameParts.join('، '); // Arabic comma separator
          
          if (fullName) {
            setAreaName(fullName);
            onChange(fullName);
          }
        }
      } catch (error) {
        console.error('Reverse geocoding error:', error);
      } finally {
        setIsGeocoding(false);
      }
    };

    const forwardGeocode = async (address) => {
      try {
        if (!address.trim()) return;
        
        setIsGeocoding(true);
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&addressdetails=1&accept-language=ar&limit=5`
        );
        const data = await response.json();
        
        if (data.length > 0) {
          setSearchResults(data);
          const primaryResult = data[0];
          const location = {
            lat: parseFloat(primaryResult.lat),
            lng: parseFloat(primaryResult.lon)
          };
          setSelectedLocation(location);
          
          const zoomLevel = primaryResult.importance > 0.7 ? 15 :
                           primaryResult.importance > 0.4 ? 12 : 10;
          
          mapRef.current?.flyTo(location, zoomLevel);
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.error('Forward geocoding error:', error);
        setSearchResults([]);
      } finally {
        setIsGeocoding(false);
      }
    };

    const handleLocationSelect = (location) => {
      reverseGeocode(location.lat, location.lng);
      setSearchResults([]); // Clear search results when clicking map
    };

    const handleAreaNameChange = (e) => {
      const newValue = e.target.value;
      setAreaName(newValue);
      onChange(newValue);
    };

    const handleSelectSearchResult = (result) => {
      const location = {
        lat: parseFloat(result.lat),
        lng: parseFloat(result.lon)
      };
      setSelectedLocation(location);
      setAreaName(result.display_name);
      onChange(result.display_name);
      setSearchResults([]);
      mapRef.current?.flyTo(location, 15);
    };

    // Initialize with existing value or Khartoum
    useEffect(() => {
      setAreaName(value || '');
      if (value && value.trim() !== '') {
        forwardGeocode(value);
      } else {
        setSelectedLocation({ lat: khartoumPosition[0], lng: khartoumPosition[1] });
        if (mapRef.current) {
          mapRef.current.flyTo(khartoumPosition, 12);
        }
      }
    }, []);

    // Debounced geocoding for input changes
    useEffect(() => {
      const timer = setTimeout(() => {
        if (areaName && areaName !== value) {
          forwardGeocode(areaName);
        }
      }, 500); // Reduced debounce time for better responsiveness

      return () => clearTimeout(timer);
    }, [areaName]);

    const handleSaveLocation = () => {
      if (!selectedLocation) {
        alert('الرجاء تحديد موقع على الخريطة');
        return;
      }
      
      if (!areaName.trim()) {
        alert('الرجاء إدخال اسم المنطقة');
        return;
      }

      onSave?.({
        coordinates: selectedLocation,
        areaName: areaName.trim()
      });
      
      dispatch(closeMap());
    };

    return (
      <div className='fixed inset-0 w-full z-50 bg-white transition-all duration-300 overflow-y-scroll'>
        <div className="relative container py-4 px-6">
          <button onClick={handleCloseMap} className='absolute top-5 right-6'>
            <MdOutlineArrowCircleRight className='size-6' />
          </button>
          <h4 className='text-center'>حدد موقعك من الخريطة</h4>
        </div>

        <div className="mb-4" style={{ height: '400px' }}>
          <MapContainer
            center={selectedLocation || khartoumPosition}
            zoom={6}
            style={{ height: '100%', width: '100%' }}
            whenCreated={(map) => { mapRef.current = map }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='<a href="https://www.openstreetmap.org/copyright"></a>'
            />
            {selectedLocation && <Marker position={selectedLocation} />}
            <LocationMarker 
              setSelectedLocation={setSelectedLocation}
              onLocationSelect={handleLocationSelect}
              mapRef={mapRef}
            />
          </MapContainer>
        </div>
        
        <div className='container'>
          <div className="mb-4 relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ابحث عن موقع أو حدده على الخريطة
            </label>
            <input
              type="text"
              value={areaName}
              onChange={handleAreaNameChange}
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
              placeholder="ابحث عن منطقة أو مدينة..."
              disabled={isGeocoding}
            />
            {isGeocoding && <p className="text-xs text-gray-500 mt-1 text-right">جاري البحث عن الموقع...</p>}
            
            {/* Search results dropdown */}
            {searchResults.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                {searchResults.map((result, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 text-sm text-right cursor-pointer hover:bg-gray-100 "
                    onClick={() => handleSelectSearchResult(result)}
                  >
                    {result.display_name}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex space-x-2">
            <button
              onClick={handleSaveLocation}
              className="bg-primary text-white text-sm py-2 px-4 rounded-md cursor-pointer"
              disabled={isGeocoding}
            >
              {isGeocoding ? 'جاري الحفظ...' : 'حفظ الموقع'}
            </button>
          </div>
        </div>
      </div>
    );
}

export default Map;