import { prisma } from '@/lib/prisma'
import { checkAppointmentConflict } from '@/services/appointment-conflict.service'
import {
  buildLocalDateTime,
  formatLocalDateKey,
  isPastDateTime,
  parseLocalDateKey,
} from '@/lib/datetime'

export type TimeSlot = {
  start: string
  end: string
}

function parseTimeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number)
  return hours * 60 + minutes
}

function minutesToTime(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
}

export async function getAvailableSlots(
  userId: string,
  dateKey: string,
  durationMinutes: number
): Promise<TimeSlot[]> {
  const date = parseLocalDateKey(dateKey)
  const dayOfWeek = date.getDay()

  const blocks = await prisma.availability.findMany({
    where: {
      user_id: userId,
      day_of_week: dayOfWeek,
      is_active: true,
    },
    orderBy: { start_time: 'asc' },
  })

  if (blocks.length === 0) {
    return []
  }

  const slots: TimeSlot[] = []

  for (const block of blocks) {
    const blockStart = parseTimeToMinutes(block.start_time)
    const blockEnd = parseTimeToMinutes(block.end_time)

    for (
      let minute = blockStart;
      minute + durationMinutes <= blockEnd;
      minute += durationMinutes
    ) {
      const startTime = minutesToTime(minute)
      const endTime = minutesToTime(minute + durationMinutes)

      const startDate = buildLocalDateTime(dateKey, startTime)
      const endDate = buildLocalDateTime(dateKey, endTime)

      if (isPastDateTime(startDate)) {
        continue
      }

      const conflict = await checkAppointmentConflict(
        userId,
        startDate,
        endDate,
        0
      )

      if (!conflict.hasConflict) {
        slots.push({
          start: startDate.toISOString(),
          end: endDate.toISOString(),
        })
      }
    }
  }

  return slots
}

export async function getAvailableDates(
  userId: string,
  durationMinutes: number,
  daysAhead = 30
): Promise<string[]> {
  const dates: string[] = []
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  for (let i = 0; i < daysAhead; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    const dateKey = formatLocalDateKey(date)

    const slots = await getAvailableSlots(userId, dateKey, durationMinutes)
    if (slots.length > 0) {
      dates.push(dateKey)
    }
  }

  return dates
}
