import React, { useContext } from 'react'

import { StaticDataContext } from '../../Contexts/StaticDataContext'

export default function ProductList({}) {

  const GlobalData = useContext(StaticDataContext);

  return (
    <section>
      Here are your products:
      {GlobalData.static_data.products.map((product,i) => 
        <div key={i}>
          {product.name}: x{product.quantity}
        </div>
      )}
    </section>
  )
}
