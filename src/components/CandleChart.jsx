import { useEffect, useRef } from 'react'
import * as LightweightCharts from "lightweight-charts"

export default function CandlestickChart({ data }) {
  const chartRef = useRef()

  // console.log(data)

  useEffect(() => {
    const chart = LightweightCharts.createChart(chartRef.current, {
      width: 1000,
      height: 600,
      layout: {
        backgroundColor: "#000000",
        textColor: "rgba(255, 255, 255, 0.9)",
      },
      grid: {
        vertLines: {
          color: "rgba(197, 203, 206, 0.5)",
        },
        horzLines: {
          color: "rgba(197, 203, 206, 0.5)",
        },
      },
      crosshair: {
        mode: LightweightCharts.CrosshairMode.Normal,
      },
      rightPriceScale: {
        borderColor: "rgba(197, 203, 206, 0.8)",
      },
      timeScale: {
        borderColor: "rgba(197, 203, 206, 0.8)",
      },
    })

    const candleSeries = chart.addCandlestickSeries({
      upColor: "#00c40a",
      downColor: "#ff993a",
      borderDownColor: "#ff993a",
      borderUpColor: "#00c40a",
      wickDownColor: "#ff993a",
      wickUpColor: "#00c40a",
    })

    candleSeries.setData(data)

    return () => {
      chart.remove()
    }
  }, [data])

  return <div ref={chartRef} style={{ padding: '2rem' }}></div>
}