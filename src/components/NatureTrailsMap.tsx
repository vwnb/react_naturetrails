
import React, { useState, useEffect, useRef } from 'react';

import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import XYZ from 'ol/source/XYZ'
import { LineString, Point } from 'ol/geom'
import { fromLonLat } from 'ol/proj'
import { Feature } from 'ol';
import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';
import { Coordinate } from 'ol/coordinate';

function NatureTrailsMap(props: { coordinates: Array<Array<Number>> }) {

    const [ map, setMap ] = useState<Map|null>(null)
    const [ featuresLayer, setFeaturesLayer ] = useState<VectorLayer<VectorSource>|null>(null)

    const mapElement = useRef()
    const mapRef = useRef(map)
    mapRef.current = map

    useEffect( () => {

        const initialFeaturesLayer = new VectorLayer({
            source: new VectorSource(),
            style: new Style({
                stroke: new Stroke({color: '#f00'})
            })
        })

        const initialMap = new Map({
            target: mapElement.current,
            layers: [

                new TileLayer({
                    source: new XYZ({
                        url: 'http://mt0.google.com/vt/lyrs=p&hl=en&x={x}&y={y}&z={z}',
                    })
                }),

                initialFeaturesLayer

            ],
            view: new View({
                projection: 'EPSG:3857',
                center: [2780000, 8450000],
                zoom: 10
            }),
            controls: []
        })

        setMap(initialMap)
        setFeaturesLayer(initialFeaturesLayer)

    },[])

    useEffect(() => {
        const points = [] as Array<Coordinate>
        props.coordinates.forEach(coordinate => {
            const point = fromLonLat([coordinate[0] as number, coordinate[1] as number])
            points.push(point)
        })
        const featureLine = new Feature({
            geometry: new LineString(points)
        })
        const vectorLine = new VectorSource()
        vectorLine.addFeature(featureLine)
        featuresLayer?.setSource(vectorLine)
    }, [props.coordinates])

    return (      
        <div ref={mapElement} className='map-container' style={{'height': '500px'}}></div>
    ) 

}

export default NatureTrailsMap