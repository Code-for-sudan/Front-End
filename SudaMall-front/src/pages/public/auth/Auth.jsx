import  { useState } from "react"
import { AccountChoices, AuthChoices } from "../../../components"

const Auth = () => {
    const [current, setCurrent] = useState(0)

    // go to next page function
    const handleNext = () => {
        setCurrent(1)
    }

    // back to previous function
    const onClickBack = () => {
        setCurrent(0)
    }
    return (
      <div>
        { current === 0 ?
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