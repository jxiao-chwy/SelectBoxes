import { KibSuperSelect } from '@chewy/kib-fields-new-react';
import { useState } from 'react';
import '@chewy/kib-fields-new-styles/dist/kib-fields-new.css';
import SelectBoxes from './SelectBoxes';
import styles from '../styles/SelectBoxGrid.module.css'
function parseState(state, acc){
  if(!state?.selection && !state?.rest){
    return acc
  }
  acc.push(state.selection.label) 
  return parseState(state.rest, acc)
}
function dataToOptions(data) {
  return Object.keys(data).map(key => {
    // Create a new object with label, value, and children properties
    const newOption = {
      label: key,
      value: key,
      children: []
    };

    // Check if the current key has children
    if (data[key].children) {
      // Recursively transform children and assign to newNode.children
      newOption.children = dataToOptions(data[key].children);
    }

    return newOption;
  });
}
export default function About () {
  const [state, setState] = useState(
    {
      selection: undefined,
      rest: undefined
    }
  )
  const [parsedState, setParsedState] = useState("")
  const data = {
    "UNAUTHORIZED_PURCHASE": {},
    "AUTOSHIP_SCHEDULING_MISTAKE": {
        "children": {
            "TOO_MUCH_PRODUCT": {},
            "UNAWARE_RECURRING_ORDER": {},
            "WRONG_NFD_OR_FREQUENCY": {}
        }
    },
    "FULFILLMENT": {
        "children": {
            "FLOOR_DENIAL": {},
            "ITEM_MISSING_FROM_SHIPMENT": {},
            "SHIPPED_WRONG_ITEM": {
                "children": {
                    "FULFILLMENT_WRONG_COLOR": {},
                    "FULFILLMENT_WRONG_FORMULA": {},
                    "FULFILLMENT_WRONG_PRODUCT": {},
                    "FULFILLMENT_WRONG_QUANTITY": {},
                    "FULFILLMENT_WRONG_SIZE": {}
                }
            }
        }
    },
    "PRODUCT_DEFECTS": {
        "children": {
            "INFESTED": {},
            "PAST_EXPIRATION": {},
            "RECALL": {},
            "DEFECTIVE": {
                "children": {
                    "COLOR_TEXTURE_OR_ODOR_DISCREPANCIES": {},
                    "DOES_NOT_FUNCTION_AS_INTENDED": {},
                    "FOREIGN_MATERIAL": {},
                    "INJURY_OR_ILLNESS": {},
                    "MISSING_PARTS": {},
                    "MOLD": {}
                }
            }
        }
    },
    "SHIPPING_ISSUES": {
        "children": {
            "LATE_ARRIVAL": {},
            "LOST_BY_SHIPPER": {},
            "SHIPPED_TO_WRONG_ADDRESS": {},
            "TRACKING_STATES_DELIVERED": {},
            "UNDELIVERABLE": {
                "children": {
                    "FAILED_DELIVERY_ATTEMPTS": {},
                    "INSUFFICIENT_ADDRESS": {},
                    "REFUSED": {},
                    "UNKNOWN": {}
                }
            }
        }
    },
    "DAMAGED": {
        "children": {
            "BOX_AND_PRODUCT": {
                "children": {
                    "CARRIER_REPORTED_DAMAGE": {},
                    "DENTED_BOX_OR_PRODUCT": {},
                    "BROKEN_OR_SMASHED_BOX_OR_PRODUCT": {},
                    "MELTED_OR_THAWED_BOX_OR_PRODUCT": {},
                    "NON_SPECIFIC_DAMAGE": {},
                    "RIPPED_OR_TORN_BOX_OR_PRODUCT": {},
                    "SPILLED_OR_LEAKING_BOX_OR_PRODUCT": {},
                    "TAPE_ISSUE": {},
                    "WEATHER_BOX_OR_PRODUCT": {},
                    "MELTED_OR_THAWED_PRODUCT": {}
                }
            },
            "PRODUCT_ONLY": {
                "children": {
                    "DENTED_PRODUCT": {},
                    "BROKEN_OR_SMASHED_PRODUCT": {},
                    "RIPPED_OR_TORN_PRODUCT": {},
                    "SPILLED_OR_LEAKING_PRODUCT": {},
                    "WEATHER_PRODUCT": {}
                }
            }
        }
    },
    "DOES_NOT_WANT": {
        "children": {
            "CUSTOMER_OR_PET_PREFERENCE": {
                "children": {
                    "FOUND_BETTER_PRICE": {},
                    "MADE_PET_SICK": {},
                    "PET_DESTROYED_ITEM": {},
                    "PET_DIET_CHANGED": {},
                    "PET_PASSED": {},
                    "PET_OR_CUSTOMER_DOESNT_LIKE": {},
                    "UNSATISFIED_WITH_QUALITY": {}
                }
            },
            "ITEM_NOT_AS_DESCRIBED": {
                "children": {
                    "WRONG_DESCRIPTION": {},
                    "WRONG_DIMENSIONS": {},
                    "WRONG_IMAGE": {}
                }
            },
            "ORDERED_WRONG_ITEM": {
                "children": {
                    "ORDERED_WRONG_COLOR": {},
                    "ORDERED_WRONG_FORMULA": {},
                    "ORDERED_WRONG_PRODUCT": {},
                    "ORDERED_WRONG_QUANTITY": {},
                    "ORDERED_WRONG_SIZE": {}
                }
            }
        }
    },
    "VETERINARIAN_APPOINTMENT_NOT_COMPLETED": {
        "children": {
            "TECHNICAL_ISSUE": {
                "children": {
                    "VIDEO_USED_CHAT": {},
                    "VIDEO_USED_AUDIO": {},
                    "TECHNICAL_OTHER": {}
                }
            },
            "NOT_COVERED": {
                "children": {
                    "SPECIES": {},
                    "RX_WANTED": {},
                    "DIAGNOSIS_WANTED": {},
                    "CS_TRANSFER": {}
                }
            },
            "COMPASSION": {
                "children": {
                    "EMERGENCY_ROOM": {},
                    "COMPASSION_OTHER": {}
                }
            }
        }
    },
    "OTHER": {}
}
  /*
  const options = [
    {
      label: "first reason",
      value: "first reason",
      children: [
        {
          label: "first subreason",
          value: "first subreason",
          children: []
        }
      ]
    },
    {
      label: "second reason",
      value: "second reason",
      children: []
    }
  ]*/
  const options = dataToOptions(data)
  const handleSelectChange = (state) => {
    setState(state)
    setParsedState(parseState(state, []).join(', '))
  }
  return (
    <>
    <div className={styles.gridContainer}>
          <SelectBoxes
            index = {1}
            onChange = {handleSelectChange}
            options = {options}
            state = {state}
          />
    </div>
    <p>
          Selected State: <strong>{JSON.stringify({state})}</strong>
          </p>
          <p>
          Selected Reason: <strong>{parsedState}</strong>
          </p>
    </>

  )
};


