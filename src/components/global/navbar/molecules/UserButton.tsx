import { BiLogIn } from "react-icons/bi"
import { useRecoilState } from "recoil"
import { controllerAPI } from "../../../../api/controller.api"
import { User } from "../../../../store/User"

const UserButton = () => {
    const [user, setUser] = useRecoilState(User)
    const getSignOut = () => {
        controllerAPI.signOut()
        setUser(null)
    }
    if (!user) {
        return <div onClick={() => controllerAPI.signIn()} className="w-8 h-8 flex items-center justify-center rounded-full shrink-0 bg-neutral-50">
            <BiLogIn className="text-neutral-400" size={18} />
        </div>
    } else {
        return (
            <img onClick={getSignOut} className="w-8 h-8 rounded-full shrink-0 bg-neutral-900" src={user.avatar} />
        )
    }
}

export default UserButton