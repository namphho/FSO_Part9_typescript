type ResultExercise = {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

interface ExerciseValues {
  hoursPerDay: number[]
  target: number
}

const parseExerciseArguments = (args: Array<String>): ExerciseValues => {
  if (args.length < 4) throw new Error('not enough argugments')

  //collect targets
  let target = parseNumber(args[2])

  //collect hour perday
  let lengthOfTrainingDays = args.length - 3
  let trainingDays = new Array(lengthOfTrainingDays)
  for (let i = 3; i < args.length; i++) {
    let value = parseNumber(args[i])
    trainingDays[i - 3] = value
  }
  console.log(trainingDays)
  return {
    hoursPerDay: trainingDays,
    target: target,
  }
}

const parseNumber = (value: String): number => {
  if (!isNaN(Number(value))) {
    return Number(value)
  } else {
    throw new Error('Provided values were not numbers!')
  }
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
  let { hoursPerDay, target } = parseExerciseArguments(process.argv)
  let result = exerciseCalculator(hoursPerDay, target)
  console.log(result)
} catch (e: unknown) {
  let errMsg = 'something happened '
  if (e instanceof Error) {
    errMsg += 'error: ' + e.message
  }
  console.log(errMsg)
}
