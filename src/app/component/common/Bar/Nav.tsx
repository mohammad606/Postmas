import Link from "next/link";

const Nav = () => {


    return (
        <div className="navbar bg-[#262626]">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">PostStars</a>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    <li><Link href={''}>PostStars</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default Nav