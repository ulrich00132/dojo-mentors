import { termsAndConditions } from "@/app/libs/termsAndConditions";

const GeneralConditions = () => {
  return (
    <div>
        <h2>Termes et conditins</h2>
        <p className="whitespace-pre-wrap">{termsAndConditions}</p>
    </div>
  )
}

export default GeneralConditions