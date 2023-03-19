import { useState, useRef, useEffect, useCallback } from "react"
import CandlestickChart from "./CandleChart"
import OpeningPrice from "./OpeningPrice"

const BinanceDataStream = () => {
  const [streaming, setStreaming] = useState(false)
  const wsRef = useRef(null)
  const [data, setData] = useState([])

  const handleToggleStreaming = useCallback(() => {
    setStreaming((prevStreaming) => !prevStreaming)
  }, [])

  const createWebSocket = useCallback(() => {
    wsRef.current = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@kline_1s')
    wsRef.current.onmessage = (event) => {
      const message = JSON.parse(event.data)
      if (message.e === 'kline') {
        updateData(message)
      }
    }
  }, [])

  useEffect(() => {
    if (streaming) {
      createWebSocket()
    } else {
      if (wsRef.current !== null) {
        wsRef.current.close()
      }
    }
  }, [streaming, createWebSocket])

  function updateData(message) {
    setData(prevData => {
      const timestamp = message.k.t
      const open = parseFloat(message.k.o)
      const high = parseFloat(message.k.h)
      const low = parseFloat(message.k.l)
      const close = parseFloat(message.k.c)

      // Create a data point with the start time of the 1s candle and the OHLC data for the candle
      const dataPoint = {
        time: timestamp,
        open: open,
        high: high,
        low: low,
        close: close,
      }

      // Limit the data array to 500 points (about 8 minutes of data)
      const newData = [...prevData]
      if (newData.length >= 150) {
        newData.shift()
      }
      newData.push(dataPoint)
      return newData
    })
  }

  return (
    <div className="dashboard">
      <button className="streaming_btn"
        onClick={handleToggleStreaming}>{streaming ? 'Stop streaming' : 'Start streaming'}
      </button>
      <section className="opening_price_section">
        <OpeningPrice data={data} />
      </section>
      <section>
        <CandlestickChart data={data} />
      </section>
    </div>
  )
}

export default BinanceDataStream
