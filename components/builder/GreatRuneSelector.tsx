import Select from 'react-select'
import { useContext } from "react"
import { CharacterContext } from '@/context/characterContext'
import { act } from 'react-dom/test-utils';

export default function GreatRuneSelector() {
  const { greatRune, setGreatRune, setActivateGreatRune, activateGreatRune } = useContext(CharacterContext);

  const greatRunes = [
    { value: 'Godrick\'s Great Rune', label: 'Godrick\'s Great Rune' },
    { value: 'Morgott\'s Great Rune', label: 'Morgott\'s Great Rune' },
    { value: 'Radahn\'s Great Rune', label: 'Radahn\'s Great Rune' },
    { value: 'Rykard\'s Great Rune', label: 'Rykard\'s Great Rune' },
    { value: 'Mohg\'s Great Rune', label: 'Mohg\'s Great Rune' },
    { value: 'Malenia\'s Great Rune', label: 'Malenia\'s Great Rune' },
  ];

  const handleChange = (selectedOption: { value: string; label: string } | null) => {
    setGreatRune(selectedOption ? selectedOption.value as GreatRune : null);
  }

  const toggleActiveGreatRune = () => {
    setActivateGreatRune(!activateGreatRune);
  }

  return (
    <div className="flex gap-4 justify-center align-middle">
      <Select 
        id='rune-picker'
        options={greatRunes} 
        placeholder="Great Rune"
        defaultValue={greatRunes.find(option => option.value === greatRune) ?? null}
        onChange={handleChange}
        className="flex-1"
      />
      <div className="flex items-center gap-4">
        <input 
          type="checkbox" 
          checked={activateGreatRune} 
          onChange={toggleActiveGreatRune} 
          disabled={!greatRune}
        />
        <label>Activate</label>
      </div>
    </div>
  );
}
