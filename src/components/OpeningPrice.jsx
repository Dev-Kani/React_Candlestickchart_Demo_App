import { useEffect, useState } from 'react'

const OpeningPrice = ({ data }) => {
  const [openingPrice, setOpeningPrice] = useState('00000.00')
  const [priceColor, setPriceColor] = useState('')

  useEffect(() => {
    if (data?.length > 0) {
      // access the last item in the array using the index data.length - 1
      setOpeningPrice(data[data.length - 1].close)
      if (data.length > 1) {
        setPriceColor(data[data.length - 2].close > data[data.length - 1].close ? 'red' : 'green')
      }
    }
  }, [data])

  return (
    <div>
      <h3 className='asset_title'>BTCUSDT</h3>
      <span className='dollar_sign'>$</span>
      <span className={`opening_price ${priceColor}`}>{Number(openingPrice).toFixed(2)}</span>
    </div>
  )
}

export default OpeningPrice
