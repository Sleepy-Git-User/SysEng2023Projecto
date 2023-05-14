import React, { useContext } from 'react'

import { StaticDataContext } from '../../Contexts/StaticDataContext'

export default function ProductList({}) {

  const GlobalData = useContext(StaticDataContext);

  return (
    <section>
      Here are your products:
      {JSON.stringify(GlobalData.static_data.Products)}
    </section>
  )
}
