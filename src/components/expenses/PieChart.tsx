import { TrendingUp } from 'lucide-react'
import { Label, Pie, PieChart } from 'recharts'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { ExpenseTypes } from '@/types/ExpenseTypes'
import { useEffect, useState } from 'react'
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter'

type PieChartProps = {
  expensesList: ExpenseTypes[]
  categoriesColor: Record<string, string>
}

type ChartData = {
  category: string
  price: number
  fill: string
}

const chartConfig = {
  price: {
    label: 'TEST',
  },
  chrome: {
    label: 'Chrome',
    color: 'hsl(var(--chart-1))',
  },
  safari: {
    label: 'Safari',
    color: 'hsl(var(--chart-2))',
  },
  firefox: {
    label: 'Firefox',
    color: 'hsl(var(--chart-3))',
  },
  edge: {
    label: 'Edge',
    color: 'hsl(var(--chart-4))',
  },
  other: {
    label: 'Other',
    color: 'hsl(var(--chart-5))',
  },
} satisfies ChartConfig

export function PieChartComponent({ expensesList, categoriesColor }: PieChartProps) {
  const [chartData, setChartData] = useState<ChartData[]>([])
  const [tooltipCategory, setTooltipCategory] = useState('')
  const date = new Date().toLocaleDateString()

  const topCategory = chartData.reduce(
    (max, current) => (current.price > max.price ? current : max),
    { category: '', price: 0 }
  ).category

  const groupedCategory = expensesList.filter(cat => cat.category === tooltipCategory.toLowerCase())

  const { name: categoryHighestExpense, price: categoryHighestAmount } = groupedCategory.reduce(
    (max, curr) => (curr.price > max.price ? curr : max),
    { name: '', price: 0 }
  )

  useEffect(() => {
    const accumulatedPrice = expensesList.reduce((acc, { price, category }) => {
      acc[category] = acc[category]
        ? { ...acc[category], price: acc[category].price + price }
        : { price, fill: categoriesColor[category] }

      return acc
    }, {} as Record<string, { price: number; fill: string }>)

    const newChartData = Object.entries(accumulatedPrice).map(([category, { price, fill }]) => ({
      category: capitalizeFirstLetter(category),
      price,
      fill,
    }))

    setChartData(newChartData)
  }, [expensesList, categoriesColor])

  return (
    <Card className='min-w-[20rem]'>
      <CardHeader className='items-center pb-0'>
        <CardTitle>Expenses Chart</CardTitle>
        <CardDescription>{date}</CardDescription>
      </CardHeader>

      <CardContent className='flex-1 pb-0'>
        <ChartContainer config={chartConfig} className='mx-auto aspect-square max-h-[250px]'>
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  onTooltipCategory={setTooltipCategory}
                  hideIndicator={true}
                  hideLabel
                />
              }
            />
            <Pie
              data={chartData}
              dataKey='price'
              nameKey='category'
              innerRadius={65}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor='middle'
                        dominantBaseline='middle'
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className='fill-foreground text-lg font-bold dark:fill-white'
                        >
                          {topCategory}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className='fill-muted-foreground dark:fill-white'
                        >
                          Top category
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>

      {tooltipCategory && (
        <CardFooter className='flex-col gap-2 text-sm'>
          <h5 className='flex items-center gap-1 font-medium leading-none'>
            <TrendingUp className='mr-1 h-4 w-4' />
            Highest expense in
            <strong style={{ color: categoriesColor[tooltipCategory.toLowerCase()] }}>
              {tooltipCategory}
            </strong>
          </h5>

          <h6 className='leading-none text-muted-foreground'>
            <strong>{categoryHighestExpense}</strong> | <em>{categoryHighestAmount}€</em>
          </h6>
        </CardFooter>
      )}
    </Card>
  )
}
