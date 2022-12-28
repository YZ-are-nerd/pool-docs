import { BiLogIn } from "react-icons/bi"
import { useRecoilValue } from "recoil"
import { controllerAPI } from "../../../../api/controller.api"
import { User } from "../../../../store/User"

const UserButton = () => {
    const user = useRecoilValue(User)
    if (!user) {
        return <div onClick={() => controllerAPI.signIn()} className="w-8 h-8 flex items-center justify-center rounded-full shrink-0 bg-neutral-900">
            <BiLogIn className="text-neutral-400" size={18} />
        </div>
    } else {
        return (
            <img className="w-8 h-8 rounded-full shrink-0 bg-neutral-900" src={user.avatar} />
        )
    }
}

export default UserButton