import { KibSuperSelect } from '@chewy/kib-fields-new-react';
import { useCallback, useState } from 'react';
import '@chewy/kib-fields-new-styles/dist/kib-fields-new.css';
export default function SelectBoxes({index, onChange, options, state}){
    const [selection, ...rest] = state 
    const selectedOption = options.find((option)=>option.value===selection?.value) //prevents stale data
    //const selectedOption = selection;
    const onSelect = useCallback(value => onChange([value[0]]))
    return(
        <>
            <KibSuperSelect 
                key={selectedOption?.value} //overrides internal super select state so that we don't get missing menu key error
                onChange={onSelect}
                label={"Reason " + index}
                options={options}
                placeholder={selection || "Choose a reason"}
                value = {selectedOption?[selectedOption]:[]}
            />
            {selectedOption && selectedOption.children.length !== 0 ? <SelectBoxes
                onChange={(subState)=>{onChange([selection, ...subState])}}
                options={selectedOption.children}
                state = {rest}
                index={index + 1}
            /> : null
            }
        </>
    )
}