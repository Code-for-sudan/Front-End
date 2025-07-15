import react, { useState } from "react"
import { useSearchParams  } from "react-router-dom"
import { AccountChoices, AuthChoices } from "../../../components"

const Auth = () => {
    const [param] = useSearchParams ();
    const step = parseInt(param.get('step'));
    const [current, setCurrent] = useState(step || 1)

    // go to next page function
    const handleNext = () => {
        setCurrent(2)
    }

    // back to previous function
    const onClickBack = () => {
        setCurrent(1)
    }
    return (
      <div>
        { current === 1 ?
        (
            <AuthChoices 
                handleNext={handleNext}
            />
        ) 
        :
        (
            <AccountChoices 
                onClickBack={onClickBack}
            />
        )}
      </div>
    )
}

export default Auth