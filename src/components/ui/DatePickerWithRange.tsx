'use client'

import * as React from 'react'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { DateRange } from 'react-day-picker'
import { useEffect, useState } from 'react'

type DatePickerWithRangeProps = {
  date?: DateRange
  onDate?: React.Dispatch<React.SetStateAction<DateRange | undefined>>
  className?: React.HTMLAttributes<HTMLDivElement>
}

export function DatePickerWithRange({ date, onDate, className }: DatePickerWithRangeProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false)
  const isDateRangeDefined = date?.to !== undefined

  useEffect(() => {
    if (isDateRangeDefined) setIsDatePickerOpen(false)
  }, [isDateRangeDefined, date])

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover open={isDatePickerOpen}>
        <PopoverTrigger asChild>
          <Button
            id='date'
            variant={'outline'}
            className={cn('w-full text-left font-normal', !date && 'text-muted-foreground')}
            onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='center'>
          <Calendar
            initialFocus
            mode='range'
            defaultMonth={date?.from}
            selected={date}
            onSelect={onDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
