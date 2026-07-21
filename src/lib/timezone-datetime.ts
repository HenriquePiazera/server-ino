const DEFAULT_TIMEZONE = 'America/Sao_Paulo'

type ZonedParts = {
  year: number
  month: number
  day: number
  hour: number
  minute: number
  dayOfWeek: number
}

function getFormatter(timeZone: string) {
  return new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    weekday: 'short',
  })
}

function readPart(
  parts: Intl.DateTimeFormatPart[],
  type: Intl.DateTimeFormatPartTypes
): number {
  const value = parts.find((part) => part.type === type)?.value ?? '0'
  return Number(value)
}

function weekdayToIndex(value: string): number {
  const map: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  }
  return map[value] ?? 0
}

export function resolveTimeZone(timeZone?: string | null): string {
  const trimmed = timeZone?.trim()
  return trimmed || DEFAULT_TIMEZONE
}

export function getZonedParts(date: Date, timeZone: string): ZonedParts {
  const parts = getFormatter(timeZone).formatToParts(date)
  return {
    year: readPart(parts, 'year'),
    month: readPart(parts, 'month'),
    day: readPart(parts, 'day'),
    hour: readPart(parts, 'hour') % 24,
    minute: readPart(parts, 'minute'),
    dayOfWeek: weekdayToIndex(
      parts.find((part) => part.type === 'weekday')?.value ?? 'Sun'
    ),
  }
}

export function formatDateKeyInTimeZone(date: Date, timeZone: string): string {
  const parts = getZonedParts(date, timeZone)
  const pad = (value: number) => String(value).padStart(2, '0')
  return `${parts.year}-${pad(parts.month)}-${pad(parts.day)}`
}

export function parseDateKeyInTimeZone(dateKey: string, timeZone: string): Date {
  return buildZonedDateTime(dateKey, '12:00', timeZone)
}

export function getDayOfWeekInTimeZone(dateKey: string, timeZone: string): number {
  return getZonedParts(parseDateKeyInTimeZone(dateKey, timeZone), timeZone)
    .dayOfWeek
}

export function buildZonedDateTime(
  dateKey: string,
  time: string,
  timeZone: string
): Date {
  const [year, month, day] = dateKey.split('-').map(Number)
  const [hour, minute] = time.split(':').map(Number)

  let guess = Date.UTC(year, month - 1, day, hour, minute, 0)

  for (let attempt = 0; attempt < 6; attempt++) {
    const parts = getZonedParts(new Date(guess), timeZone)
    const diffMinutes =
      (year - parts.year) * 525600 +
      (month - parts.month) * 43200 +
      (day - parts.day) * 1440 +
      (hour - parts.hour) * 60 +
      (minute - parts.minute)

    if (diffMinutes === 0) {
      return new Date(guess)
    }

    guess -= diffMinutes * 60 * 1000
  }

  return new Date(guess)
}

export function isPastDateTimeInTimeZone(date: Date, timeZone: string): boolean {
  void timeZone
  return date.getTime() <= Date.now()
}

export function getTodayDateKeyInTimeZone(timeZone: string): string {
  return formatDateKeyInTimeZone(new Date(), timeZone)
}

export function addDaysToDateKey(dateKey: string, days: number, timeZone: string): string {
  const anchor = buildZonedDateTime(dateKey, '12:00', timeZone)
  anchor.setTime(anchor.getTime() + days * 24 * 60 * 60 * 1000)
  return formatDateKeyInTimeZone(anchor, timeZone)
}
