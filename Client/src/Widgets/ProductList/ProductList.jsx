import React, { useContext } from 'react'

import { StaticDataContext } from '../../Contexts/StaticDataContext'

export default function ProductList({}) {

  const GlobalData = useContext(StaticDataContext);

  return (
    <section>
      Here are your products:
      {GlobalData.static_data.Discounts.map((Discounts,i) => 
        <div key={i}>
          {Discounts.DiscountID}, {Discounts.ProductID}, {Discounts.StartDateTime}
        </div>
      )}
    </section>
  )
}
