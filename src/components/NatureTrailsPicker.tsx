import * as React from 'react'
import { useEffect, useState } from 'react'
import NatureTrailsData from '../classes/NatureTrailsData'

const NatureTrails = (props: { natureTrailsData: NatureTrailsData[], selectTrail: Function }) => {

    const natureTrails = props.natureTrailsData.map((natureTrail, index) => {
        return <option key={index} value={index}>{natureTrail.title}</option>
    })

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const coordinates = props.natureTrailsData[parseInt(event.target.value)].routes.features[0].geometry.coordinates
        props.selectTrail(coordinates)
    }

    return <select onChange={handleChange}>
        <option>Valitse</option>
        {natureTrails}
    </select>
}

export default NatureTrails