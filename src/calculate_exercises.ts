type ResultExercise = {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

const exerciseCalculator = (
  hoursPerDay: number[],
  target: number
): ResultExercise => {
  //todo validate target
  if (target === 0) {
    throw new Error(`your target is invalid. Please setup it`)
  }
  let periodLength = hoursPerDay.length
  if (periodLength == 0) {
    throw new Error(`your daily exercise hours is invalid. Please setup it`)
  }
  let trainingDays = hoursPerDay.filter((h) => h != 0).length
  let avergeHour = avergeHourPerDay(hoursPerDay)
  let rating = getRating(avergeHour, target)
  let ratingDescription = getRatingDescription(rating)
  let success = avergeHour >= target
  return {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: avergeHour,
  }
}

const avergeHourPerDay = (hoursPerDay: number[]): number => {
  let length = hoursPerDay.length
  let sum = hoursPerDay.reduce((prev, curr) => {
    return prev + curr
  }, 0)
  return sum / length
}

const getRating = (average: number, target: number): number => {
  let percent = average / target
  if (percent < 0.5) {
    return 1
  } else if (percent >= 0.5 && percent < 1) {
    return 2
  } else {
    return 3
  }
}
const ratingDescription = [
  'too bad',
  'normal, try more',
  'excellent, keep going',
]
const getRatingDescription = (rating: number): string => {
  return ratingDescription[rating - 1]
}

try {
  let result = exerciseCalculator([3, 3, 2, 4.5, 3, 3, 1], 2)
  console.log(result)
} catch (e: unknown) {
  let errMsg = 'something happened '
  if (e instanceof Error) {
    errMsg += 'error: ' + e.message
  }
  console.log(errMsg)
}
