const baseClasses = require ('@/data/classes.json')
import Select from 'react-select'
import { useEffect, useState, useContext } from "react"
import { ClassContext } from '@/context/classContext'

export default function ClassPicker() {
  const [classes, setClasses] = useState<{label: string, value: object }[] | null>(null)
  const { updateClassOnChange } = useContext(ClassContext)

    useEffect(() => {
      let options = []
      // Loop through the class names (keys) in baseClasses.classes
      for (const className in baseClasses.classes) {
        if (Object.hasOwnProperty.call(baseClasses.classes, className)) {
          const classStats = baseClasses.classes[className];
          // Add the class name and stats to the options array
          options.push({value: classStats, label: className})
        }
      }
      setClasses(options)
    }, []);
  if (!classes) return (<div></div>
  )
  return (
    <div>
      <Select 
        id='class-picker'
        options={classes ?? []}
        defaultValue={classes ? classes[0] : null}
        onChange={(selectedOption: any) => updateClassOnChange(selectedOption.value)}
      />
    </div>
  )
}