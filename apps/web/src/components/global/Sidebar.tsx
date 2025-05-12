import Dashboard from '../../../public/icons/ri_dashboard-fill.svg?react'
import Profile from '../../../public/icons/profile.svg?react'
import Setting from '../../../public/icons/setting-2.svg?react'
import Leader from '../../../public/icons/medal-star.svg?react'
import Quiz from '../../../public/icons/note.svg?react'
import Help from '../../../public/icons/help-center.svg?react'
import Roadmap from '../../../public/icons/teacher.svg?react'
import { Link } from 'react-router-dom'

const sidebarTop = [
    { icon: Dashboard, txt: 'dashboard', path: '' },
    { icon: Roadmap, txt: 'road map', path: 'roadmap' },
    { icon: Leader, txt: 'Leader board', path: 'leader' },
    { icon: Quiz, txt: 'quiz', path: 'quiz' },
    { icon: Profile, txt: 'Profile', path: 'profile' },
]
const sidebarBottom = [
    { icon: Setting, txt: 'Setting',path:'setting' },
    { icon: Help, txt: 'help center',path:'help' },
]

type proptype = {
    setActiveLink: React.Dispatch<React.SetStateAction<string>>,
    activeLink: string,
    mobile:boolean
}

function Sidebar({ activeLink, setActiveLink,mobile=false }: proptype) {
    return (
        <div className={`${!mobile?'hidden':'flex mt-14 '} sm:flex bg-white text-xl text-zinc-400 font-semibold h-[550px] rounded-ee-[3rem] rounded-se-[3rem] p-8 flex-col justify-between`}>
            <div className="space-y-2">
                {
                    sidebarTop.map(e => {
                        const Icon = e.icon
                        return (
                            <Link to={`/${e.path}`} key={e.txt} className={` ${mobile&&'rounded-2xl'} flex gap-3 p-3 rounded-e-2xl ${activeLink === e.txt ? 'text-IEEEorange bg-lightOrange' : 'text-zinc-400 cursor-pointer'}`} onClick={() => setActiveLink(e.txt)}>
                                <Icon className='shrink-0' />
                                <p className={`${!mobile&&'hidden'} capitalize lg:block`}>{e.txt}</p>
                            </Link>
                        )
                    })
                }
            </div>
            <div className="space-y-2">
                <hr className="border-2" />
                {
                    sidebarBottom.map(e => {
                        const Icon = e.icon
                        return (
                            <Link to={`/${e.path}`} className={`${mobile&&'rounded-2xl'} flex gap-3 p-3 ${activeLink === e.txt ? 'text-IEEEorange rounded-e-2xl bg-lightOrange' : 'text-zinc-400 cursor-pointer'}`} onClick={() => setActiveLink(e.txt)} key={e.txt}>
                                <Icon className='shrink-0'/>
                                <p className={`${!mobile&&'hidden'} capitalize lg:block`}>{e.txt}</p>
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Sidebar