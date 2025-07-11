import React, { useRef, useEffect } from 'react';
import 'ol/ol.css';
import { Map as OlMap, View } from 'ol';
import { Tile as TileLayer } from 'ol/layer';
import { OSM } from 'ol/source';
import { fromLonLat } from 'ol/proj';

import './Map.css';

const Map = (props) => {
  const mapRef = useRef();
  const { center, zoom } = props;

  useEffect(() => {
    const map = new OlMap({
      target: mapRef.current, // ✅ mapRef.current (NOT mapRef.current.id)
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat([center.lng, center.lat]),
        zoom: zoom,
      }),
    });

    return () => map.setTarget(null); // ✅ Clean up on unmount
  }, [center, zoom]);

  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
    ></div>
  );
};

export default Map;
