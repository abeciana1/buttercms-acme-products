import { GoAlertFill } from "react-icons/go";

const Warning = ({
    warningText
}) => {
    return (
        <div className="flex items-center justify-center py-3 text-2xl">
            <div className="text-altRed pr-1">
                <GoAlertFill size={30} />
            </div>
            <div>
                <span className="font-bold">Warning: </span>
                {warningText}
            </div>
        </div>
    )
}

export default Warning