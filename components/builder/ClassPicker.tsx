const baseClasses = require ('@/data/classes.json')
import Select from 'react-select'
import { useEffect, useState, useContext } from "react"
import { ClassContext } from '@/context/ClassContext'

export default function ClassPicker() {
  const [classes, setClasses] = useState<any>(null)
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

  return (
    <div>
      <Select 
        options={classes}
        onChange={(e: any) => updateClassOnChange(e.value)}
      />
    </div>
  )
}