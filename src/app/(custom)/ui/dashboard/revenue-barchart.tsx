"use client"; //? Indicates this component should run on the client side (necessary for dynamic interactivity)

//? Icons for trending status
import { TrendingDown, TrendingUp } from "lucide-react"

//? Chart components from Recharts
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"

//? UI Card components from shadcn
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

//? Custom chart wrapper and tooltip components from your UI layer
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

//? Revenue data for Jan–Dec 2024
const revenue = [
  { month: 'Jan', revenue: 2000 },
  { month: 'Feb', revenue: 1800 },
  { month: 'Mar', revenue: 2200 },
  { month: 'Apr', revenue: 2500 },
  { month: 'May', revenue: 2300 },
  { month: 'Jun', revenue: 3200 },
  { month: 'Jul', revenue: 3500 },
  { month: 'Aug', revenue: 3700 },
  { month: 'Sep', revenue: 2500 },
  { month: 'Oct', revenue: 2800 },
  { month: 'Nov', revenue: 3000 },
  { month: 'Dec', revenue: 4800 },
]

//? Define chart config for styling and labeling
const chartConfig = {
  revenue: {
    label: "Revenue", //? Label used in tooltip/legend
    color: "hsl(var(--chart-1))", //? Custom chart color via CSS variable
  },
} satisfies ChartConfig

//? --- Trend Calculation Logic ---

//? Get the last month (December)
const lastMonth = revenue[revenue.length - 1]

//? Get the second to last month (November)
const prevMonth = revenue[revenue.length - 2]

//? Calculate revenue difference
const trendDiff = lastMonth.revenue - prevMonth.revenue

//? Calculate percentage change from previous to current
const trendPercentage = ((trendDiff / prevMonth.revenue) * 100).toFixed(1)

//? Check if the revenue is trending up
const isTrendingUp = trendDiff >= 0

//? --- React Component ---
export function RevenueBarChart() {
  return (
    <Card>
      {/* Card header with title and subtitle */}
      <CardHeader>
        <CardTitle>Revenue Bar Chart</CardTitle>
        <CardDescription>January - December 2024</CardDescription>
      </CardHeader>
      {/* Card content holds the chart */}
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer // Enables screen reader accessibility
            data={revenue} // Pass the revenue data to chart
            margin={{ top: 20 }} // Margin from top for spacing
          >
            {/* Draw horizontal grid lines only */}
            <CartesianGrid vertical={false} />
            {/* Define the X-axis */}
            <XAxis
              dataKey="month" // Display the month on X-axis
              tickLine={false} // Hide the tick lines
              tickMargin={10} // Space between axis and tick text
              axisLine={false} // Hide the main X-axis line
            />
            {/* Tooltip customization */}
            <ChartTooltip
              cursor={false} // Disable hover highlight
              content={<ChartTooltipContent hideLabel />} // Use custom tooltip content
            />
            {/* Revenue bars */}
            <Bar
              dataKey="revenue" // Use the "revenue" key from data
              fill="var(--color-revenue)" // Bar fill color (CSS variable)
              radius={8} // Rounded top corners
            >
              {/* Show values above each bar */}
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground" // Use default foreground text color
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      {/* Card footer with trend summary */}
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div
          className={`flex gap-2 font-medium leading-none ${
            isTrendingUp ? "text-green-600" : "text-red-600"
          }`} // Change text color based on trend
        >
          {/* Show trend direction and percentage */}
          {isTrendingUp ? "Trending up" : "Trending down"} by {trendPercentage}%
          {/* Show appropriate icon */}
          {isTrendingUp ? (
            <TrendingUp className="h-4 w-4" />
          ) : (
            <TrendingDown className="h-4 w-4" />
          )}
        </div>
        {/* Text below the trend showing compared months */}
        <div className="leading-none text-muted-foreground">
          Comparing {prevMonth.month} to {lastMonth.month}
        </div>
      </CardFooter>
    </Card>
  );
}
