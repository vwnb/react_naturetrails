import * as React from 'react'
import { useEffect, useState } from 'react'
import NatureTrailsPicker from './NatureTrailsPicker'
import NatureTrailsMap from './NatureTrailsMap'

const NatureTrails = () => {

    const [natureTrailsData, setNatureTrailsData] = useState([])

    const [selectedTrail, setSelectedTrail] = useState<Array<Array<Number>>>([])

    const selectTrail = (value: Array<Array<Number>>) => {
        setSelectedTrail(value)
    }

    useEffect(() => {

        const fetchData = async () => {
            const data = await fetch('https://citynature.eu/api/wp/v2/places?cityid=5');
            const json = await data.json()
            setNatureTrailsData(json)
        }

        fetchData().catch(console.error);
    }, [])

    return <div>
        <NatureTrailsPicker natureTrailsData={natureTrailsData} selectTrail={selectTrail} />
        <NatureTrailsMap coordinates={selectedTrail} />
    </div>
}

export default NatureTrails