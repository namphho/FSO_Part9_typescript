interface BmiValues {
  height: number
  weight: number
}

const parseArguments = (args: Array<String>): BmiValues => {
  if (args.length < 4) throw new Error('not enough argugments')
  if (args.length > 4) throw new Error('too many arguments')

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    }
  } else {
    throw new Error('Provided values were not numbers!')
  }
}

const calculateBmi = (height: number, weight: number): String => {
  let heightInMeter = height / 100
  let bmi = weight / (heightInMeter * heightInMeter)
  if (bmi < 16.0) {
    return 'Underweight (Severe thinness)'
  } else if (bmi >= 16.0 && bmi <= 16.9) {
    return 'Underweight (Moderate thinness)'
  } else if (bmi >= 17.0 && bmi <= 18.4) {
    return 'Underweight (Mild thinness)'
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    return 'Normal range'
  } else if (bmi >= 25.0 && bmi <= 29.9) {
    return 'Overweight (Pre-obese)'
  } else if (bmi >= 30.0 && bmi <= 34.9) {
    return 'Obese (Class I)'
  } else if (bmi >= 35.0 && bmi <= 39.9) {
    return 'Obese (Class II)'
  } else {
    return 'Obese (Class III)'
  }
}

try {
  const { height, weight } = parseArguments(process.argv)
  const result = calculateBmi(height, weight)
  console.log(result)
} catch (e: unknown) {
  let errorMessage = 'something error happened'
  if (e instanceof Error) {
    errorMessage += 'error' + e.message
  }
  console.log(errorMessage)
}
