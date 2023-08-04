'use client'

import { User } from "@prisma/client"
import UserBox from "../UserBox"

import './styles.scss'

interface UserListProps {
    items: User[]
}

const UserList: React.FC<UserListProps> = ({ 
    items, 
}) => {
    return ( 
        <aside className="userlist">
            <div className="px-5">
                <div className="flex-col">
                    <div className="userlist--title">
                        People
                    </div>
                </div>
                {items.map((item) => (
                    <UserBox
                        key={item.id}
                        data={item}
                    />
                ))}
            </div>
        </aside>
    )
}
 
export default UserList