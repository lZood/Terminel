import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 900 // 15 minutes

export async function GET() {
    try {
        // TODO: Replace with actual Weather API integration
        // Recommended: OpenWeatherMap or WeatherAPI.com

        // Mock data for now
        const mockData = {
            temp: 28,
            condition: 'parcialmente nublado',
            humidity: 65,
        }

        return NextResponse.json(mockData)

        /* Example with OpenWeatherMap:
        const API_KEY = process.env.OPENWEATHER_API_KEY
        const CITY_ID = '3985606' // Guasave
        
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?id=${CITY_ID}&appid=${API_KEY}&units=metric&lang=es`
        )
        
        if (!response.ok) {
          throw new Error('Weather API error')
        }
        
        const data = await response.json()
        
        return NextResponse.json({
          temp: Math.round(data.main.temp),
          condition: data.weather[0].description,
          humidity: data.main.humidity,
        })
        */
    } catch (error) {
        console.error('Weather API error:', error)
        return NextResponse.json(
            { error: 'Failed to fetch weather data' },
            { status: 500 }
        )
    }
}
