/* eslint-disable default-case */
import { useEffect, useState } from "react"

export const useValidation = (value, validations) => {

    const [isEmpty, setIsEmpty] = useState(true)
    useEffect(() => {
        for (const validation in validations) {
            
            switch (validation) {
                case 'isEmpty':
                    value ? setIsEmpty(false) : setIsEmpty(true)
                    break
                    
            }
        }
    }, [value])

    return {
        isEmpty
    }
}