import { KibSuperSelect } from '@chewy/kib-fields-new-react';
import { useCallback, useState } from 'react';
import '@chewy/kib-fields-new-styles/dist/kib-fields-new.css';
export default function SelectBoxes({index, onChange, options, state}){
    const selection = options.find((option)=>option.value===state.selection?.value)
    const onSelect = useCallback(value => onChange({selection: value[0], rest: undefined}))
    return(
        <>
            <KibSuperSelect 
                key={selection?.value} //overrides internal super select state so that we don't get missing menu key error
                onChange={onSelect}
                label={"Reason " + index}
                options={options}
                placeholder={state.selection || "Choose a reason"}
                value = {selection?[selection]:[]}
            />
            {selection && selection.children.length !== 0 ? <SelectBoxes
                onChange={(subState)=>{onChange({selection:state.selection, rest:subState})}}
                options={selection.children}
                state = {state.rest??{}}
                index={index + 1}
            /> : null
            }
        </>
    )
}