import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 900 // 15 minutes

export async function GET() {
    try {
        // TODO: Replace with actual commodity price API
        // Recommended: Alpha Vantage, Barchart, or other financial data provider

        // Mock data for now
        const mockData = {
            price: 4.52,
            change: 1.35,
        }

        return NextResponse.json(mockData)

        /* Example with Alpha Vantage:
        const API_KEY = process.env.ALPHA_VANTAGE_API_KEY
        const SYMBOL = 'ZC' // Corn futures
        
        const response = await fetch(
          `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${SYMBOL}&apikey=${API_KEY}`
        )
        
        if (!response.ok) {
          throw new Error('CBOT API error')
        }
        
        const data = await response.json()
        const quote = data['Global Quote']
        
        return NextResponse.json({
          price: parseFloat(quote['05. price']),
          change: parseFloat(quote['10. change percent'].replace('%', '')),
        })
        */
    } catch (error) {
        console.error('CBOT price API error:', error)
        return NextResponse.json(
            { error: 'Failed to fetch commodit price data' },
            { status: 500 }
        )
    }
}
